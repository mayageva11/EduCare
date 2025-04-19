// app/api/students/downloadFunctionalReport/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import * as puppeteer from 'puppeteer';

export async function GET(req: NextRequest) {
  console.log('downloadFunctionalReport API route called');

  try {
    // Connect to the database
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connection successful');

    // Extract formId from URL
    const url = new URL(req.url);
    const formId = url.searchParams.get('formId');
    console.log('Requested formId:', formId);

    if (!formId) {
      console.error('No formId provided in request');
      return NextResponse.json(
        { error: 'Form ID is required' },
        { status: 400 }
      );
    }

    // Convert string ID to MongoDB ObjectId
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(formId);
      console.log('MongoDB ObjectId:', objectId.toString());
    } catch (error) {
      console.error('Invalid MongoDB ObjectId format:', error);
      return NextResponse.json(
        { error: 'Invalid form ID format' },
        { status: 400 }
      );
    }

    // Get the forms collection
    const db = mongoose.connection;
    const formsCollection = db.collection('forms');

    // Find the form by ID
    console.log('Searching for form...');
    const form = await formsCollection.findOne({ _id: objectId });

    if (!form) {
      console.error(`Form with ID ${formId} not found`);
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    console.log('Form found:', {
      id: form._id.toString(),
      formType: form.formType,
      hasContent: !!form.content
    });

    // Get the student's name
    const studentsCollection = db.collection('students');
    let studentName = 'Student';

    try {
      if (form.studentId) {
        const studentId = new mongoose.Types.ObjectId(form.studentId);
        const student = await studentsCollection.findOne({ _id: studentId });
        if (student) {
          studentName = `${student.firstName} ${student.lastName}`;
          console.log('Student name:', studentName);
        }
      }
    } catch (error) {
      console.error('Error getting student info:', error);
      // Continue with default name
    }

    // Safely extract content
    const academicEvaluation =
      form.content?.academicEvaluation || 'לא הוזן מידע';
    const emotionalEvaluation =
      form.content?.behavioralEvaluation?.emotionalEvaluation || 'לא הוזן מידע';
    const socialEvaluation =
      form.content?.behavioralEvaluation?.socialEvaluation || 'לא הוזן מידע';

    // Generate HTML content for the PDF
    console.log('Generating HTML for PDF...');
    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <title>דו״ח תפקוד - ${studentName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            direction: rtl;
          }
          .report-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            margin-bottom: 5px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 18px;
          }
          .content {
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="report-container">
          <div class="header">
            <h1>דו״ח תפקוד</h1>
            <p>שם התלמיד/ה: ${studentName}</p>
            <p>תאריך: ${new Date().toLocaleDateString('he-IL')}</p>
          </div>
          
          <div class="section">
            <div class="section-title">הערכה לימודית</div>
            <div class="content">
              ${academicEvaluation}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">הערכה רגשית</div>
            <div class="content">
              ${emotionalEvaluation}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">הערכה חברתית</div>
            <div class="content">
              ${socialEvaluation}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Launch puppeteer to generate PDF
    console.log('Launching puppeteer...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();
    console.log('PDF generated successfully, size:', pdfBuffer.length);

    // Prepare filename
    const fileName = `דוח_תפקוד_${studentName.replace(/\s+/g, '_')}.pdf`;

    // Create response with PDF
    const response = new NextResponse(pdfBuffer);

    // Set appropriate headers
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(fileName)}"`
    );
    response.headers.set('Cache-Control', 'no-store');

    console.log('Sending response...');
    return response;
  } catch (error) {
    console.error('Error in downloadFunctionalReport API:', error);
    return NextResponse.json(
      { error: `Failed to generate PDF: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

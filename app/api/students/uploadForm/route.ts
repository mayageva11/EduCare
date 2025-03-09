import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Form from '@/models/Form';

// Helper function to parse form data using formidable
async function parseForm(req: NextRequest) {
  const formData = await req.formData();

  // Process the form data
  const studentId = formData.get('studentId') as string;
  const formName = formData.get('formName') as string;
  const formType = formData.get('formType') as string;
  const file = formData.get('file') as File;

  if (!studentId || !formName || !formType || !file) {
    throw new Error('Missing required fields');
  }

  return { studentId, formName, formType, file };
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Process the form data
    const formData = await req.formData();
    const studentId = formData.get('studentId') as string;
    const formName = formData.get('formName') as string;
    const formType = formData.get('formType') as string;
    const file = formData.get('file') as File;

    if (!studentId || !formName || !formType || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${Date.now()}_${formName}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    // Write file to disk
    fs.writeFileSync(filePath, buffer);

    // Get the relative URL path for the file
    const fileUrl = `/uploads/${fileName}`;

    // Create a new form entry in the database
    const newForm = await Form.create({
      formType,
      name: formName,
      studentId,
      fileUrl,
      fileName: file.name,
      fileType: file.type,
      editable: false
    });

    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error('Error uploading form:', error);
    return NextResponse.json(
      { error: 'Failed to upload form' },
      { status: 500 }
    );
  }
}

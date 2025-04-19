// app/api/students/addFunctionalityForm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Form, { FormStatus } from '@/models/Form';
import Student from '@/models/Students';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse request body
    const body = await req.json();
    const {
      formId,
      studentId,
      name,
      academicEvaluation,
      behavioralEvaluation
    } = body;

    if (!studentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const content = {
      academicEvaluation,
      behavioralEvaluation
    };

    let form;

    // If formId is provided, update existing form
    if (formId) {
      // Find and update the existing form
      form = await Form.findById(formId);

      if (!form) {
        return NextResponse.json({ error: 'Form not found' }, { status: 404 });
      }

      // Update the form
      form.content = content;
      form.status = FormStatus.COMPLETED;
      await form.save();
    } else {
      // Create a new form document if no formId provided
      form = new Form({
        formType: 'functional_report',
        name: name || 'Functional Report',
        status: FormStatus.COMPLETED,
        studentId: new mongoose.Types.ObjectId(studentId),
        content,
        editable: true
      });

      // Save the form
      await form.save();

      // Add the form to the student's forms array
      await Student.findByIdAndUpdate(studentId, {
        $push: { forms: form._id }
      });
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error('Error adding functionality form:', error);
    return NextResponse.json(
      { error: 'Failed to add functionality form' },
      { status: 500 }
    );
  }
}

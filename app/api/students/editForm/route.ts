// app/api/students/editForm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Form from '@/models/Form';

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse request body
    const body = await req.json();
    const { formId, content, status } = body;

    if (!formId) {
      return NextResponse.json(
        { error: 'Form ID is required' },
        { status: 400 }
      );
    }

    // Find the form
    const form = await Form.findById(formId);
    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // Update the form
    const updates: any = {};

    if (content !== undefined) {
      updates.content = content;
    }

    if (status) {
      updates.status = status;
    }

    // Add updatedAt timestamp
    updates.updatedAt = new Date();

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { $set: updates },
      { new: true }
    );

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json(
      { error: 'Failed to update form' },
      { status: 500 }
    );
  }
}

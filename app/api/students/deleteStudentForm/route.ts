import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Form from '@/models/Form';

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    // Get query parameters
    const url = new URL(req.url);
    const studentId = url.searchParams.get('studentId');
    const formId = url.searchParams.get('formId');

    if (!studentId || !formId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the form first to check if it has a file
    const form = await Form.findOne({ _id: formId, studentId });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // If the form has a file URL, delete the file
    if (form.fileUrl) {
      const filePath = path.join(process.cwd(), 'public', form.fileUrl);

      // Check if file exists and delete it
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete the form from the database
    await Form.deleteOne({ _id: formId, studentId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      { error: 'Failed to delete form' },
      { status: 500 }
    );
  }
}

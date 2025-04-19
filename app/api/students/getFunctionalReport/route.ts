// app/api/students/getFormById/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import { Form } from '@/types/form.types';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get formId from query parameters
    const url = new URL(req.url);
    const formId = url.searchParams.get('formId');

    if (!formId) {
      return NextResponse.json(
        { error: 'Form ID is required' },
        { status: 400 }
      );
    }

    // Convert string ID to MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(formId);

    // Get the forms collection
    const db = mongoose.connection;
    const formsCollection = db.collection('forms');

    // Find the form by ID
    const form = await formsCollection.findOne<Form>({ _id: objectId });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // Return the form
    return NextResponse.json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form' },
      { status: 500 }
    );
  }
}

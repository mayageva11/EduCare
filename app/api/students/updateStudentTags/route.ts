import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Student, { StudentTag } from '@/models/Students';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { studentId, tags } = data;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { error: 'Invalid or missing student ID' },
        { status: 400 }
      );
    }

    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Tags must be an array' },
        { status: 400 }
      );
    }

    // Validate that all tags are valid enum values
    const validTags = Object.values(StudentTag);
    const areAllTagsValid = tags.every(tag => validTags.includes(tag));

    if (!areAllTagsValid) {
      return NextResponse.json(
        { error: 'One or more tags are invalid' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Update the student using the Mongoose model
    const result = await Student.findByIdAndUpdate(
      studentId,
      { $set: { tags } },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, student: result });
  } catch (error) {
    console.error('Error updating student tags:', error);
    return NextResponse.json(
      { error: 'Failed to update student tags' },
      { status: 500 }
    );
  }
}

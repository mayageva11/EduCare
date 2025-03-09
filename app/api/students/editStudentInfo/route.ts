import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StudentModel from '@/models/Students';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { studentId, firstName, lastName, grade, parents } = body;

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Find and update the student
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      {
        $set: {
          firstName,
          lastName,
          grade,
          parents
        }
      },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student info:', error);
    return NextResponse.json(
      { error: 'Failed to update student information' },
      { status: 500 }
    );
  }
}

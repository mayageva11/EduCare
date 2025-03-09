import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

export async function PUT(request: NextRequest) {
  try {
    const { studentId, notes } = await request.json();

    if (!studentId || notes === undefined) {
      return NextResponse.json(
        { error: 'Student ID and notes are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Update notes
    student.counselorNotes = notes;
    await student.save();

    return NextResponse.json({
      success: true,
      notes: student.counselorNotes
    });
  } catch (error) {
    console.error('Error updating notes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

export async function POST(request: NextRequest) {
  try {
    const { studentId, isOnMedication, details } = await request.json();

    if (!studentId || typeof isOnMedication !== 'boolean') {
      return NextResponse.json(
        { error: 'Student ID and medication status are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Add medication info
    student.isOnMedication = isOnMedication;
    student.medicationDetails = details || '';
    await student.save();

    return NextResponse.json({
      success: true,
      isOnMedication: student.isOnMedication,
      details: student.medicationDetails
    });
  } catch (error) {
    console.error('Error adding medication info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

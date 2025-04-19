import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

export async function PUT(request: NextRequest) {
  try {
    const { studentId, isOnMedication, details } = await request.json();

    if (!studentId || typeof isOnMedication !== 'boolean') {
      return NextResponse.json(
        { error: 'Student ID and medication status are required' },
        { status: 400 }
      );
    }

    await connectDB();
    // Use findByIdAndUpdate for more reliability
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        isOnMedication: isOnMedication,
        medicationDetails: details || ''
      },
      { new: true }
    );

    if (!updatedStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      isOnMedication: updatedStudent.isOnMedication,
      details: updatedStudent.medicationDetails
    });
  } catch (error) {
    console.error('Error updating medication info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

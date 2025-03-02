import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

// GET function to retrieve all students
export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Find all students and sort by last name
    const students = await Student.find({})
      .sort({ lastName: 1, firstName: 1 })
      .lean();

    // Return the students as JSON
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

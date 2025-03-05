import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

// POST function to add a new student
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.grade || !body.tags) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new student document
    const newStudent = new Student({
      firstName: body.firstName,
      lastName: body.lastName,
      grade: body.grade,
      tags: body.tags || [],
      parents: [
        {
          name: body.parent1Name,
          phone: body.parent1Phone
        },
        {
          name: body.parent2Name,
          phone: body.parent2Phone
        }
      ],
      files: body.files || []
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Return the saved student as JSON
    return NextResponse.json(savedStudent, { status: 201 });
  } catch (error) {
    console.error('Error adding student:', error);

    // Check for duplicate key error (MongoDB error code 11000)
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { error: 'Student already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add student' },
      { status: 500 }
    );
  }
}

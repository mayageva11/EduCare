import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

export async function POST(request: NextRequest) {
  try {
    const { studentId, note } = await request.json();

    if (!studentId || !note) {
      return NextResponse.json(
        { error: 'Student ID and note text are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Get existing notes or initialize as empty string
    const existingNotes = student.counselorNotes || '';

    // Add timestamp to the note
    const timestamp = new Date().toLocaleString('he-IL', {
      timeZone: 'Asia/Jerusalem'
    });
    const formattedNote = `[${timestamp}] ${note}\n\n`;

    // Append the new note
    student.counselorNotes = existingNotes + formattedNote;
    await student.save();

    return NextResponse.json({
      success: true,
      note: formattedNote,
      allNotes: student.counselorNotes
    });
  } catch (error) {
    console.error('Error adding note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

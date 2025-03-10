// app/api/students/updateStudentGroup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Get request data
    const body = await req.json();
    const { studentId, group } = body;

    if (!studentId) {
      return NextResponse.json({ error: 'מזהה תלמיד חסר' }, { status: 400 });
    }

    // Validate group value
    const validGroups = [
      'none',
      'special',
      'differential',
      'integration',
      'gifted'
    ];
    if (!group || !validGroups.includes(group)) {
      return NextResponse.json({ error: 'ערך קבוצה לא חוקי' }, { status: 400 });
    }

    // Update the student group
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { group },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return NextResponse.json({ error: 'תלמיד לא נמצא' }, { status: 404 });
    }

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student group:', error);
    return NextResponse.json(
      { error: 'שגיאה בעדכון קבוצת התלמיד' },
      { status: 500 }
    );
  }
}

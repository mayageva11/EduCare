import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Students';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // איתור כל התלמידים במערכת
    const students = await Student.find({});

    // אתחול מונים לסטטיסטיקה
    const stats = {
      green: 0,
      yellow: 0,
      orange: 0,
      red: 0,
      blue: 0,
      purple: 0
    };

    // ספירת התלמידים לפי תגיות
    students.forEach(student => {
      if (student.tags && Array.isArray(student.tags)) {
        student.tags.forEach((tag: string) => {
          if (tag in stats) {
            stats[tag as keyof typeof stats] += 1;
          }
        });
      }
    });

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching student statistics:', error);
    return NextResponse.json(
      {
        green: 0,
        yellow: 0,
        orange: 0,
        red: 0,
        blue: 0,
        purple: 0
      },
      { status: 500 }
    );
  }
}

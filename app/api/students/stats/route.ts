import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student, { StudentTag } from '../../../../models/Students';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // כאן יש מקום לבדיקת אותנטיקציה של המשתמש וקבלת ה-ID שלו
    // לצורך הדגמה נניח שיש לנו גישה למשתמש עם ID דמה
    const userId = 'dummy-user-id';

    // איתור כל התלמידים של המשתמש הנוכחי
    const students = await Student.find({ userId });

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
      student.tags.forEach((tag: string) => {
        if (stats.hasOwnProperty(tag)) {
          // @ts-ignore
          stats[tag] += 1;
        }
      });
    });

    return NextResponse.json(
      {
        stats: stats,
        totalStudents: students.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching student statistics:', error);
    return NextResponse.json(
      {
        error: 'שגיאה בטעינת סטטיסטיקות תלמידים',
        stats: {
          green: 0,
          yellow: 0,
          orange: 0,
          red: 0,
          blue: 0,
          purple: 0
        }
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reminder from '../../../models/Reminders';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // כאן יש מקום לבדיקת אותנטיקציה של המשתמש וקבלת ה-ID שלו
    // לצורך הדגמה נניח שיש לנו גישה למשתמש עם ID דמה
    const userId = 'dummy-user-id';

    // קבלת כל התזכורות העתידיות, ממוינות לפי תאריך
    const currentDate = new Date();
    const reminders = await Reminder.find({
      userId,
      date: { $gte: currentDate }
    })
      .sort({ date: 1 })
      .limit(10);

    // עיבוד הנתונים לפורמט מתאים
    const formattedReminders = reminders.map(reminder => {
      const reminderDate = new Date(reminder.date);

      // פורמט תאריך בסגנון ישראלי
      const dateString = reminderDate.toLocaleDateString('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // פורמט שעה
      const timeString = reminderDate.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
      });

      return {
        id: reminder._id.toString(),
        title: reminder.title,
        date: dateString,
        time: timeString,
        studentName: reminder.studentName
      };
    });

    return NextResponse.json(
      {
        reminders: formattedReminders
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json(
      {
        error: 'שגיאה בטעינת התזכורות'
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'לא מאומת. אנא התחבר מחדש' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'אסימון לא תקף' }, { status: 401 });
    }

    const body = await request.json();
    const { school } = body;

    if (!school) {
      return NextResponse.json({ error: 'נא להזין שם בית ספר חדש' }, { status: 400 });
    }

    // Update only the school field
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { school },
      { new: true, runValidators: true, select: '-password' }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'משתמש לא נמצא' }, { status: 404 });
    }

    return NextResponse.json({ message: 'שם בית הספר עודכן בהצלחה', user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating school:', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה בעדכון שם בית הספר' },
      { status: 500 }
    );
  }
}

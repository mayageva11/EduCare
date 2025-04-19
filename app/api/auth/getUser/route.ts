import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Extract the auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // If no token, return unauthorized
    if (!token) {
      return NextResponse.json(
        { error: 'לא מאומת. אנא התחבר מחדש' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'אסימון לא תקף' },
        { status: 401 }
      );
    }
    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'משתמש לא נמצא' }, { status: 404 });
    }

    // Return user data
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה בשליפת נתוני המשתמש' },
      { status: 500 }
    );
  }
}

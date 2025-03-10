import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    console.log("Connected to DB");

    const { email, password } = await request.json();

    // Find user by email
    const user_data = await User.findOne({ email });
    if (!user_data) {
      return NextResponse.json(
        { error: 'Invalid credentials - email' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user_data.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials - password' },
        { status: 401 }
      );
    }

    // Create token payload
    const tokenPayload = {
      userId: user_data._id.toString(),
      name: user_data.firstName, // Ensure this matches the stored field
      email: user_data.email,
      role: user_data.role || 'user',
    };

    // Generate JWT token
    const token = generateToken(tokenPayload);

    // Set HTTP-only cookie with token
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      sameSite: 'strict',
    });

    const user = user_data._id;

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        token,
        user,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

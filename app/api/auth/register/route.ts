import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Get form data
    const formData = await request.formData();

    // Extract text fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Extract certificate file
    const certificateFile = formData.get('certificate') as File | null;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !certificateFile
    ) {
      return NextResponse.json(
        { error: 'כל השדות הינם חובה' },
        { status: 400 }
      );
    }

    // Validate password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'הסיסמאות אינן תואמות' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'המייל כבר רשום במערכת' },
        { status: 400 }
      );
    }

    // Handle certificate file
    let certificateUrl = '';
    if (certificateFile) {
      // Convert file to buffer
      const bytes = await certificateFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      try {
        await writeFile(path.join(uploadDir, 'test.txt'), 'test');
      } catch (error) {
        // Directory doesn't exist, create it
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
      }

      // Generate unique filename
      const uniqueFilename = `${Date.now()}-${certificateFile.name.replace(
        /\s+/g,
        '-'
      )}`;
      const filePath = path.join(uploadDir, uniqueFilename);

      // Save file
      await writeFile(filePath, buffer);
      certificateUrl = `/uploads/${uniqueFilename}`;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user model with the new fields
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      certificateUrl,
      isVerified: false // User needs to be verified by admin
    });

    // Save user to database
    await newUser.save();
  
    // Create token payload
    const tokenPayload = {
      userId: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || 'user'
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
    
    const userID = newUser._id;
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'ההרשמה בוצעה בהצלחה! החשבון שלך יאושר לאחר בדיקת המסמכים',
        token,
        userID,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'שגיאה בהרשמה' },
      { status: 500 }
    );
  }
}

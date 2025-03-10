// lib/jwt.ts
import { SignJWT, jwtVerify } from 'jose';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;

// Token expiration time (7 days in seconds)
const JWT_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days in seconds

export async function generateToken(payload: any): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  // Create a Uint8Array from the JWT_SECRET for jose
  const secretKey = new TextEncoder().encode(JWT_SECRET);
  
  // Sign the JWT
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN)
    .sign(secretKey);
  
  return token;
}

export async function verifyToken(token: string): Promise<any> {
  try {
    // Create a Uint8Array from the JWT_SECRET for jose
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    
    // Verify the JWT
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}
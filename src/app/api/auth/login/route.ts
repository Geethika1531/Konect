import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password, method } = body;

    // Validate inputs
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/phone and password are required' },
        { status: 400 }
      );
    }

    // Find user by email or phone
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user has email (required for password login)
    if (!user.email) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // For demo purposes, we'll accept any password for existing users
    // In production, you'd verify the hashed password
    
    // Return user data (excluding sensitive fields)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        themePreference: user.themePreference,
        verified: user.verified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

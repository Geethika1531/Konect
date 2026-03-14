import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// POST - Register new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password, method, name } = body;

    // Validate inputs
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/phone and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: method === 'email' ? identifier : undefined },
          { phone: method === 'phone' ? identifier : undefined },
        ].filter(Boolean),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email/phone already exists' },
        { status: 400 }
      );
    }

    // Get theme preference from localStorage (passed from frontend)
    const themePreference = body.themePreference || 'neutral';

    // Create new user
    const user = await db.user.create({
      data: {
        email: method === 'email' ? identifier : null,
        phone: method === 'phone' ? identifier : null,
        dateOfBirth: new Date('2000-01-01'), // Default, will be updated in onboarding
        intent: 'friends', // Default, will be updated in onboarding
        themePreference,
        verified: false,
      },
    });

    // Return user data
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}

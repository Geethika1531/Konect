import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

// POST - Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    // In production, you would:
    // 1. Generate a reset token
    // 2. Store it with an expiration
    // 3. Send an email with the reset link
    
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      // In production, store this in the database
      // await db.passwordReset.create({
      //   data: {
      //     userId: user.id,
      //     token: resetToken,
      //     expiresAt: resetTokenExpiry,
      //   },
      // });

      // In production, send email with reset link
      // await sendPasswordResetEmail(email, resetToken);
      
      console.log(`[DEV] Password reset token for ${email}: ${resetToken}`);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email, you will receive a password reset link.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    // Still return success to prevent enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email, you will receive a password reset link.',
    });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

// POST - Update user theme preference
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme_preference } = body;

    // Validate theme value
    if (!['neutral', 'lgbtq'].includes(theme_preference)) {
      return NextResponse.json(
        { error: 'Invalid theme preference. Must be "neutral" or "lgbtq"' },
        { status: 400 }
      );
    }

    // Check if user is authenticated
    const session = await getServerSession();
    
    if (session?.user?.email) {
      // Update in database for authenticated users
      await db.user.updateMany({
        where: { email: session.user.email },
        data: { themePreference: theme_preference },
      });
    }

    return NextResponse.json({ 
      success: true, 
      theme_preference,
      message: 'Theme preference saved' 
    });
  } catch (error) {
    console.error('Error saving theme preference:', error);
    return NextResponse.json(
      { error: 'Failed to save theme preference' },
      { status: 500 }
    );
  }
}

// GET - Retrieve user theme preference
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        theme_preference: null,
        message: 'No authenticated user' 
      });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { themePreference: true },
    });

    return NextResponse.json({ 
      theme_preference: user?.themePreference || 'neutral' 
    });
  } catch (error) {
    console.error('Error fetching theme preference:', error);
    return NextResponse.json(
      { error: 'Failed to fetch theme preference' },
      { status: 500 }
    );
  }
}

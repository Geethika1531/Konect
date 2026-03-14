import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/users - Get all users (for discovery)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get('mood');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const users = await db.user.findMany({
      where: mood ? { currentMood: mood } : undefined,
      take: limit,
      include: {
        genders: true,
        orientations: true,
        pronouns: true,
        interests: true,
        profile: {
          include: { photos: true }
        }
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      phone, 
      email, 
      dateOfBirth, 
      intent, 
      bio,
      genders = [],
      orientations = [],
      pronouns = [],
      interests = []
    } = body;

    // Create user with related data
    const user = await db.user.create({
      data: {
        phone,
        email,
        dateOfBirth: new Date(dateOfBirth),
        intent,
        bio,
        genders: {
          create: genders.map((g: string) => ({ gender: g }))
        },
        orientations: {
          create: orientations.map((o: string) => ({ orientation: o }))
        },
        pronouns: {
          create: pronouns.map((p: string) => ({ pronoun: p }))
        },
        interests: {
          create: interests.map((i: string) => ({ interest: i }))
        },
        profile: {
          create: {}
        },
        subscription: {
          create: { tier: 'free' }
        }
      },
      include: {
        genders: true,
        orientations: true,
        pronouns: true,
        interests: true,
        profile: true,
        subscription: true
      }
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

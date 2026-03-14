import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/meetups - Get all meetups for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const meetups = await db.meetup.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId }
        ],
        ...(status && { status })
      },
      include: {
        user1: {
          include: {
            profile: { include: { photos: true } }
          }
        },
        user2: {
          include: {
            profile: { include: { photos: true } }
          }
        }
      },
      orderBy: { scheduledAt: 'desc' }
    });

    return NextResponse.json({ meetups });
  } catch (error) {
    console.error('Error fetching meetups:', error);
    return NextResponse.json({ error: 'Failed to fetch meetups' }, { status: 500 });
  }
}

// POST /api/meetups - Create a new meetup
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user1Id,
      user2Id,
      location,
      locationLat,
      locationLng,
      scheduledAt
    } = body;

    const meetup = await db.meetup.create({
      data: {
        user1Id,
        user2Id,
        location,
        locationLat,
        locationLng,
        scheduledAt: new Date(scheduledAt),
        status: 'scheduled'
      },
      include: {
        user1: true,
        user2: true
      }
    });

    return NextResponse.json({ meetup }, { status: 201 });
  } catch (error) {
    console.error('Error creating meetup:', error);
    return NextResponse.json({ error: 'Failed to create meetup' }, { status: 500 });
  }
}

// PATCH /api/meetups - Verify a meetup
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { meetupId, status, verifiedAt } = body;

    const meetup = await db.meetup.update({
      where: { id: meetupId },
      data: {
        status,
        verifiedAt: verifiedAt ? new Date(verifiedAt) : undefined
      }
    });

    // If meetup is completed, increment meetup count for both users
    if (status === 'completed') {
      await db.user.update({
        where: { id: meetup.user1Id },
        data: { meetupCount: { increment: 1 } }
      });
      await db.user.update({
        where: { id: meetup.user2Id },
        data: { meetupCount: { increment: 1 } }
      });
    }

    return NextResponse.json({ meetup });
  } catch (error) {
    console.error('Error updating meetup:', error);
    return NextResponse.json({ error: 'Failed to update meetup' }, { status: 500 });
  }
}

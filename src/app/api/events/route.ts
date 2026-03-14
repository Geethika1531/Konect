import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/events - Get all micro-events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    const activityType = searchParams.get('activityType');
    const limit = parseInt(searchParams.get('limit') || '20');

    const events = await db.microEvent.findMany({
      where: {
        status,
        datetime: { gte: new Date() },
        ...(activityType && { activityType })
      },
      take: limit,
      include: {
        creator: {
          include: {
            profile: { include: { photos: true } }
          }
        },
        attendees: {
          include: {
            user: {
              include: {
                profile: { include: { photos: true } }
              }
            }
          }
        }
      },
      orderBy: { datetime: 'asc' }
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST /api/events - Create a new micro-event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      creatorId,
      title,
      activityType,
      description,
      location,
      locationLat,
      locationLng,
      datetime,
      maxParticipants = 6
    } = body;

    const event = await db.microEvent.create({
      data: {
        creatorId,
        title,
        activityType,
        description,
        location,
        locationLat,
        locationLng,
        datetime: new Date(datetime),
        maxParticipants,
        attendees: {
          create: {
            userId: creatorId,
            status: 'approved'
          }
        }
      },
      include: {
        creator: true,
        attendees: true
      }
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

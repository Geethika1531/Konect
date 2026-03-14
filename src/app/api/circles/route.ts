import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/circles - Get all circles for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const circles = await db.circle.findMany({
      where: {
        members: {
          some: { userId }
        }
      },
      include: {
        members: {
          include: {
            user: {
              include: {
                profile: { include: { photos: true } }
              }
            }
          }
        },
        createdBy: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ circles });
  } catch (error) {
    console.error('Error fetching circles:', error);
    return NextResponse.json({ error: 'Failed to fetch circles' }, { status: 500 });
  }
}

// POST /api/circles - Create a new circle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, createdById, coverImage, memberIds = [] } = body;

    const circle = await db.circle.create({
      data: {
        name,
        coverImage,
        createdById,
        members: {
          create: [
            { userId: createdById, role: 'admin' },
            ...memberIds.map((id: string) => ({ userId: id, role: 'member' as const }))
          ]
        }
      },
      include: {
        members: {
          include: { user: true }
        }
      }
    });

    return NextResponse.json({ circle }, { status: 201 });
  } catch (error) {
    console.error('Error creating circle:', error);
    return NextResponse.json({ error: 'Failed to create circle' }, { status: 500 });
  }
}

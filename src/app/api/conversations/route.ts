import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/conversations - Get all conversations for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const conversations = await db.conversation.findMany({
      where: {
        participants: {
          some: { userId }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              include: {
                profile: { include: { photos: true } }
              }
            }
          }
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

// POST /api/conversations - Create a new conversation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participantIds } = body;

    if (!participantIds || participantIds.length < 2) {
      return NextResponse.json({ error: 'At least 2 participants required' }, { status: 400 });
    }

    // Check if conversation already exists between these participants
    const existingConversation = await db.conversation.findFirst({
      where: {
        AND: participantIds.map((id: string) => ({
          participants: { some: { userId: id } }
        }))
      }
    });

    if (existingConversation) {
      return NextResponse.json({ conversation: existingConversation });
    }

    const conversation = await db.conversation.create({
      data: {
        participants: {
          create: participantIds.map((id: string) => ({ userId: id }))
        }
      },
      include: {
        participants: {
          include: { user: true }
        }
      }
    });

    return NextResponse.json({ conversation }, { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}

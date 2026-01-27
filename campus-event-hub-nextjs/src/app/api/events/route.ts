import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Parse date and deadline
    const eventDate = new Date(body.eventDate);
    const deadline = body.regDeadline ? new Date(body.regDeadline) : null;

    const event = await prisma.event.create({
      data: {
        title: body.eventTitle,
        date: eventDate,
        time: body.eventTime,
        duration: body.duration,
        category: body.category,
        clubId: parseInt(body.clubId),
        venue: body.venue,
        capacity: body.capacity ? parseInt(body.capacity) : null,
        deadline: deadline,
        description: body.eventDescription,
        image: body.eventPoster,
        organizer: body.organizerName,
        orgEmail: body.organizerEmail,
        requirements: body.requirements,
        highlights: body.highlights,
      },
    });

    return NextResponse.json(
      { message: 'Event created successfully', event },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        club: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

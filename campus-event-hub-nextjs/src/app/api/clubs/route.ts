import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const club = await prisma.club.create({
      data: {
        name: body.clubName,
        category: body.category,
        description: body.aboutClub,
        logo: body.clubLogo,
        email: body.officialEmail,
        phone: body.contactPhone,
        advisor: body.advisorName,
        instagram: body.instagram,
        linkedin: body.linkedin,
        website: body.website,
      },
    });

    return NextResponse.json(
      { message: 'Club created successfully', club },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating club:', error);
    return NextResponse.json(
      { error: 'Failed to create club' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        events: true,
      },
      orderBy: {
        xp: 'desc',
      },
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
}

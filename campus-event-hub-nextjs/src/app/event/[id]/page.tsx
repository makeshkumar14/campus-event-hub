import { Metadata } from 'next';
import EventDetails from '@/components/EventDetails';
import { events } from '@/data/eventsData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find(e => e.id === parseInt(id));
  
  if (!event) {
    return {
      title: 'Event Not Found - CampusVibe',
    };
  }

  return {
    title: `${event.title} - CampusVibe`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    id: event.id.toString(),
  }));
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;
  return <EventDetails eventId={parseInt(id)} />;
}

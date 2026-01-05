import { Metadata } from 'next';
import ClubRankings from '@/components/ClubRankings';

export const metadata: Metadata = {
  title: 'Club Rankings - CampusVibe',
  description: 'Complete rankings of all campus clubs based on their activities and engagement. View the full leaderboard of top performing clubs.',
};

export default function ClubRankingsPage() {
  return <ClubRankings />;
}

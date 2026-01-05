'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { clubs } from '@/data/eventsData';

const ClubRankings = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extended clubs data for full rankings - merge with existing and add more
  const extendedClubs = [
    ...clubs,
    {
      id: 4,
      name: "Harmonic Vibes Society",
      avatar: "🎵",
      events: 35,
      members: "890",
      xp: "5,780",
      rank: 4
    },
    {
      id: 5,
      name: "Champions League Alliance",
      avatar: "⚽",
      events: 28,
      members: "1.5K",
      xp: "4,950",
      rank: 5
    },
    {
      id: 6,
      name: "Rhythm Revolution Crew",
      avatar: "💃",
      events: 24,
      members: "560",
      xp: "4,120",
      rank: 6
    },
    {
      id: 7,
      name: "Tech Innovators Hub",
      avatar: "🚀",
      events: 22,
      members: "480",
      xp: "3,640",
      rank: 7
    },
    {
      id: 8,
      name: "Literary Society",
      avatar: "📚",
      events: 18,
      members: "320",
      xp: "2,890",
      rank: 8
    },
    {
      id: 9,
      name: "Photography Club",
      avatar: "📷",
      events: 15,
      members: "280",
      xp: "2,340",
      rank: 9
    },
    {
      id: 10,
      name: "Debate Masters",
      avatar: "🎤",
      events: 12,
      members: "240",
      xp: "1,980",
      rank: 10
    }
  ];

  // Sort clubs by rank
  const sortedClubs = [...extendedClubs].sort((a, b) => a.rank - b.rank);

  const getRankBadgeClass = (rank: number): string => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
  };

  const getRankIcon = (rank: number): string | number => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <main className="club-rankings-page">
      <div className="rankings-container">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span> Back to Home
        </Link>
        
        <div className="rankings-header">
          <span className="section-tag">Full Leaderboard</span>
          <h1>Club <span className="gradient-text">Rankings</span></h1>
          <p className="rankings-desc">
            Complete rankings of all campus clubs based on their activities and engagement
          </p>
        </div>

        <div className="rankings-table-container">
          <div className="rankings-table">
            <div className="table-header">
              <div className="header-rank">Rank</div>
              <div className="header-club">Club</div>
              <div className="header-events">Events</div>
              <div className="header-participants">Participants</div>
              <div className="header-xp">XP Points</div>
            </div>
            
            {sortedClubs.map((club, index) => (
              <div 
                className={`table-row ${index < 3 ? `top-${index + 1}` : ''}`} 
                key={club.id}
              >
                <div className="cell-rank">
                  <span className={`rank-badge ${getRankBadgeClass(club.rank)}`}>
                    {getRankIcon(club.rank)}
                  </span>
                </div>
                <div className="cell-club">
                  <span className="club-avatar">{club.avatar}</span>
                  <span className="club-name">{club.name}</span>
                </div>
                <div className="cell-events">{club.events}</div>
                <div className="cell-participants">{club.members}</div>
                <div className="cell-xp">
                  <span className="xp-value">{club.xp}</span>
                  <span className="xp-label">XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rankings-footer">
          <p>Rankings are updated weekly based on event participation and member engagement</p>
        </div>
      </div>
    </main>
  );
};

export default ClubRankings;

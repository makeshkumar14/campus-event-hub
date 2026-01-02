import { Link } from 'react-router-dom';
import { clubs } from '../../data/eventsData';

const ClubsSection = () => {
  // Sort clubs by rank for display order
  const sortedClubs = [...clubs].sort((a, b) => a.rank - b.rank);

  return (
    <section className="clubs-section" id="clubs">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Leaderboard</span>
          <h2>Top Performing <span className="gradient-text">Clubs</span></h2>
          <p className="section-desc">
            The most active and engaging clubs on campus right now
          </p>
        </div>
        <div className="clubs-leaderboard">
          {/* Rank 1 */}
          <div className="club-rank rank-1 reveal">
            <div className="rank-badge gold">👑</div>
            <div className="club-card featured">
              <div className="crown-glow"></div>
              <div className="club-avatar">{sortedClubs[0]?.avatar}</div>
              <h4>{sortedClubs[0]?.name}</h4>
              <div className="club-score">
                <span className="score-value">{sortedClubs[0]?.xp}</span>
                <span className="score-label">XP Points</span>
              </div>
            </div>
          </div>

          {/* Rank 2 */}
          <div className="club-rank rank-2 reveal">
            <div className="rank-badge silver">2</div>
            <div className="club-card">
              <div className="club-avatar">{sortedClubs[1]?.avatar}</div>
              <h4>{sortedClubs[1]?.name}</h4>
              <div className="club-score">
                <span className="score-value">{sortedClubs[1]?.xp}</span>
                <span className="score-label">XP Points</span>
              </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="club-rank rank-3 reveal">
            <div className="rank-badge bronze">3</div>
            <div className="club-card">
              <div className="club-avatar">{sortedClubs[2]?.avatar}</div>
              <h4>{sortedClubs[2]?.name}</h4>
              <div className="club-score">
                <span className="score-value">{sortedClubs[2]?.xp}</span>
                <span className="score-label">XP Points</span>
              </div>
            </div>
          </div>
        </div>
        <div className="clubs-cta reveal">
          <div className="cta-content-row">
            <span>Want to see your club on top?</span>
            <Link to="/club-rankings" className="btn btn-outline">View Full Rankings</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;


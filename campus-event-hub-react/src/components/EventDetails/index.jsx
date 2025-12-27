import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { events } from '../../data/eventsData';

const categoryEmojis = {
  tech: '🖥️',
  music: '🎵',
  sports: '⚽',
  art: '🎨',
  drama: '🎭',
  dance: '💃'
};

const categoryColors = {
  tech: '#8B5CF6',
  music: '#EC4899',
  sports: '#06B6D4',
  art: '#F97316',
  drama: '#EF4444',
  dance: '#10B981'
};

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="event-not-found">
        <div className="container">
          <h1>Event Not Found</h1>
          <p>The event you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const spotsLeft = event.maxAttendees - event.attendees;
  const spotsPercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="event-details-page">
      {/* Back Navigation */}
      <Link to="/#all-events" className="back-nav">
        <span className="back-arrow">←</span>
        <span>Back to Events</span>
      </Link>

      {/* Hero Section */}
      <section className="event-hero">
        <div className="event-hero-bg">
          <img src={event.image} alt={event.title} />
          <div className="event-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="event-hero-content">
            <div className="event-hero-left">
              <div className="event-poster-large">
                <img src={event.image} alt={event.title} />
                <div className="poster-glow" style={{ background: categoryColors[event.category] }}></div>
              </div>
            </div>
            <div className="event-hero-right">
              <span className={`event-category-badge ${event.category}`}>
                {categoryEmojis[event.category]} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              <h1 className="event-title">{event.title}</h1>
              <p className="event-club-name">🏛️ Organized by <strong>{event.club}</strong></p>
              
              <div className="event-quick-info">
                <div className="quick-info-item">
                  <span className="info-icon">📅</span>
                  <div>
                    <span className="info-label">Date</span>
                    <span className="info-value">{event.date}, 2025</span>
                  </div>
                </div>
                <div className="quick-info-item">
                  <span className="info-icon">⏰</span>
                  <div>
                    <span className="info-label">Time</span>
                    <span className="info-value">{event.time}</span>
                  </div>
                </div>
                <div className="quick-info-item">
                  <span className="info-icon">⏱️</span>
                  <div>
                    <span className="info-label">Duration</span>
                    <span className="info-value">{event.duration}</span>
                  </div>
                </div>
                <div className="quick-info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <span className="info-label">Venue</span>
                    <span className="info-value">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="event-content">
        <div className="container">
          <div className="event-content-grid">
            {/* Left Column - Details */}
            <div className="event-details-left">
              {/* About Section */}
              <div className="event-section">
                <h2>📝 About This Event</h2>
                <p className="event-description">{event.description}</p>
              </div>

              {/* Highlights Section */}
              <div className="event-section">
                <h2>✨ Event Highlights</h2>
                <div className="highlights-grid">
                  {event.highlights.map((highlight, index) => (
                    <div className="highlight-item" key={index}>
                      <span className="highlight-icon">🎯</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements Section */}
              <div className="event-section">
                <h2>📋 What You Need</h2>
                <ul className="requirements-list">
                  {event.requirements.map((req, index) => (
                    <li key={index}>
                      <span className="check-icon">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Registration Card */}
            <div className="event-details-right">
              <div className="registration-card">
                <h3>🎟️ Register Now</h3>
                
                {/* Capacity Bar */}
                <div className="capacity-section">
                  <div className="capacity-header">
                    <span>Registration</span>
                    <span>{event.attendees}/{event.maxAttendees} spots filled</span>
                  </div>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill" 
                      style={{ 
                        width: `${spotsPercentage}%`,
                        background: spotsPercentage > 80 ? '#EF4444' : categoryColors[event.category]
                      }}
                    ></div>
                  </div>
                  <p className="spots-left">
                    {spotsLeft > 0 ? `🔥 Only ${spotsLeft} spots left!` : '❌ Registrations Full'}
                  </p>
                </div>

                {/* Deadline */}
                <div className="deadline-section">
                  <span className="deadline-icon">⏳</span>
                  <div>
                    <span className="deadline-label">Registration Deadline</span>
                    <span className="deadline-value">{event.registrationDeadline}</span>
                  </div>
                </div>

                {/* Register Button */}
                <button className="btn-register-full" disabled={spotsLeft <= 0}>
                  {spotsLeft > 0 ? 'Register for Event' : 'Registrations Closed'}
                </button>

                {/* Organizer Info */}
                <div className="organizer-section">
                  <h4>📞 Contact Organizer</h4>
                  <p className="organizer-name">👤 {event.organizer}</p>
                  <p className="organizer-email">✉️ {event.email}</p>
                </div>

                {/* Share Section */}
                <div className="share-section">
                  <h4>📤 Share Event</h4>
                  <div className="share-buttons">
                    <button className="share-btn whatsapp">WhatsApp</button>
                    <button className="share-btn copy">Copy Link</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="related-events">
        <div className="container">
          <h2>🎪 More Events You Might Like</h2>
          <div className="related-events-grid">
            {events
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map(relatedEvent => (
                <Link to={`/event/${relatedEvent.id}`} className="related-event-card" key={relatedEvent.id}>
                  <div className="related-event-image">
                    <img src={relatedEvent.image} alt={relatedEvent.title} />
                  </div>
                  <div className="related-event-info">
                    <span className={`related-category ${relatedEvent.category}`}>
                      {categoryEmojis[relatedEvent.category]}
                    </span>
                    <h4>{relatedEvent.title}</h4>
                    <p>{relatedEvent.date}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;

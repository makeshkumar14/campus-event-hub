import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { events } from '../../data/eventsData';

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
      {/* Hero Section - Focused on Title and Category */}
      <section className="event-hero-refined">
        <div className="container">
          <div className="hero-content-wrapper">
            <Link to="/#all-events" className="back-link">
              <span className="arrow">←</span> Back to All Events
            </Link>
            <div className="hero-main-info">
              <span className={`category-tag ${event.category}`}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              <h1 className="main-title">{event.title}</h1>
              <div className="organizer-info">
                <span className="org-label">Organized by</span>
                <span className="club-highlight">{event.club}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="main-event-wrapper">
        <div className="container">
          <div className="event-grid-layout">

            {/* Left Column: Details & Assets (70%) */}
            <div className="details-column-left">
              {/* Event Image */}
              <div className="main-event-image">
                <img src={event.image} alt={event.title} />
              </div>

              {/* Info Detail Blocks */}
              <div className="info-pills-container">
                <div className="pill-item">
                  <div className="p-content">
                    <span className="p-label">Date</span>
                    <span className="p-value">{event.date || 'TBD'}, 2025</span>
                  </div>
                </div>
                <div className="pill-item">
                  <div className="p-content">
                    <span className="p-label">Time</span>
                    <span className="p-value">{event.time || 'Schedule TBA'}</span>
                  </div>
                </div>
                <div className="pill-item">
                  <div className="p-content">
                    <span className="p-label">Venue</span>
                    <span className="p-value">{event.venue || 'To Be Announced'}</span>
                  </div>
                </div>
                <div className="pill-item">
                  <div className="p-content">
                    <span className="p-label">Duration</span>
                    <span className="p-value">{event.duration || 'Flexible'}</span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="content-block">
                <h2 className="section-heading">About the Event</h2>
                <p className="description-text">{event.description}</p>
              </div>

              {/* Highlights Section */}
              <div className="content-block">
                <h2 className="section-heading">Key Highlights</h2>
                <div className="highlights-pills">
                  {event.highlights.map((highlight, index) => (
                    <div className="highlight-pill" key={index}>
                      <span className="dot"></span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements Section */}
              <div className="content-block">
                <h2 className="section-heading">Requirements</h2>
                <div className="requirements-grid">
                  {event.requirements.map((req, index) => (
                    <div className="req-item" key={index}>
                      <span className="check">✓</span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Registration Card (30%) */}
            <div className="sticky-column-right">
              <div className="refined-registration-card">
                <h3 className="card-title">Registration</h3>

                <div className="registration-info-block">
                  <div className="info-item">
                    <span className="info-label">Entry Fee</span>
                    <span className="info-value">Free Entry</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Registration Status</span>
                    <span className="info-value">Open</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Registration Deadline</span>
                    <span className="info-value">{event.registrationDeadline || 'Dec 24, 2025'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Event Date</span>
                    <span className="info-value">{event.date || 'TBD'}, 2025</span>
                  </div>
                </div>

                <div className="spots-left-badge">
                  {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Registrations Closed'}
                </div>

                <button className="cta-register-button" disabled={spotsLeft <= 0}>
                  {spotsLeft > 0 ? 'Register Now' : 'Sold Out'}
                </button>

                <div className="organizer-contact">
                  <h4 className="contact-title">Organizer Information</h4>
                  <div className="contact-details">
                    <p className="org-name">{event.organizer}</p>
                    <p className="org-email">{event.email}</p>
                  </div>
                </div>

                <div className="social-share">
                  <button className="share-link">Share on WhatsApp</button>
                  <button className="share-link">Copy Event Link</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="related-events">
        <div className="container">
          <h2>More Events You Might Like</h2>
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

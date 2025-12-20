import { events } from '../../data/eventsData';

const categoryEmojis = {
  tech: '🖥️',
  music: '🎵',
  sports: '⚽',
  art: '🎨',
  drama: '🎭',
  dance: '💃'
};

const AllEventsGrid = () => {
  return (
    <section className="all-events-section" id="all-events">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">📅 Browse All</span>
          <h2>All <span className="gradient-text">Events</span></h2>
          <p className="section-desc">
            Explore every event and find your perfect match
          </p>
        </div>
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-poster-card reveal" key={event.id} data-tilt>
              <div className="poster-image">
                <img src={event.image} alt={event.title} />
                <div className={`poster-badge ${event.category}`}>
                  {categoryEmojis[event.category]} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              </div>
              <div className="poster-content">
                <h3>{event.title}</h3>
                <p className="poster-club">🏛️ {event.club}</p>
                <p className="poster-date">📅 {event.date}, 2025</p>
                <p className="poster-location">📍 {event.venue}</p>
                <div className="poster-meta">
                  <span className="attendees-count">🎟️ {event.attendees}+ Registered</span>
                  <a href="#" className="btn-register">Register</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllEventsGrid;

import { events } from '../../data/eventsData';

const EventsSlider = () => {
  // Duplicate events for seamless infinite scroll
  const duplicatedEvents = [...events, ...events];

  return (
    <section className="events-slider-section" id="events">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">🔥 Trending Now</span>
          <h2>Upcoming <span className="gradient-text">Events</span></h2>
          <p className="section-desc">
            Don't miss out on the hottest events happening on campus
          </p>
        </div>
      </div>
      <div className="slider-container">
        <div className="slider-track">
          {duplicatedEvents.map((event, index) => (
            <div className="poster-card" key={`${event.id}-${index}`}>
              <div className="poster-glow"></div>
              <img src={event.image} alt={event.title} />
              <div className="poster-overlay">
                <span className={`poster-tag ${event.category}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <h4>{event.title}</h4>
                <p>{event.date} • {event.venue.split(',')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSlider;

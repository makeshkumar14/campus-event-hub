'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const eventCategories = [
  { value: 'tech', label: 'Technology', emoji: '🖥️' },
  { value: 'music', label: 'Music', emoji: '🎵' },
  { value: 'sports', label: 'Sports', emoji: '⚽' },
  { value: 'art', label: 'Art', emoji: '🎨' },
  { value: 'drama', label: 'Drama', emoji: '🎭' },
  { value: 'dance', label: 'Dance', emoji: '💃' },
];

interface Club {
  id: number;
  name: string;
  category: string | null;
}

interface FormData {
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  venue: string;
  maxAttendees: string;
  registrationDeadline: string;
  clubId: string;
  organizerName: string;
  organizerEmail: string;
  description: string;
  requirements: string;
  highlights: string;
}

export default function EnrollEventPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loadingClubs, setLoadingClubs] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '',
    venue: '',
    maxAttendees: '',
    registrationDeadline: '',
    clubId: '',
    organizerName: '',
    organizerEmail: '',
    description: '',
    requirements: '',
    highlights: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  // Fetch clubs on component mount
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('/api/clubs');
        if (response.ok) {
          const data = await response.json();
          setClubs(data);
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoadingClubs(false);
      }
    };
    fetchClubs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTitle: formData.title,
          category: formData.category,
          eventDate: formData.date,
          eventTime: formData.startTime,
          duration: formData.duration || `${formData.startTime} - ${formData.endTime}`,
          venue: formData.venue,
          capacity: formData.maxAttendees,
          regDeadline: formData.registrationDeadline,
          eventDescription: formData.description,
          eventPoster: posterPreview,
          organizerName: formData.organizerName,
          organizerEmail: formData.organizerEmail,
          requirements: formData.requirements,
          highlights: formData.highlights,
          clubId: formData.clubId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          title: '',
          category: '',
          date: '',
          startTime: '',
          endTime: '',
          duration: '',
          venue: '',
          maxAttendees: '',
          registrationDeadline: '',
          clubId: '',
          organizerName: '',
          organizerEmail: '',
          description: '',
          requirements: '',
          highlights: '',
        });
        setPosterPreview(null);
      }, 4000);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackgroundAnimation />
      <div className="enrollment-page">
        <nav className="enrollment-nav">
          <Link href="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </nav>

        <div className="enrollment-container">
          <div className="enrollment-header">
            <span className="enrollment-badge">
              <span className="badge-icon">🎉</span>
              Event Creation
            </span>
            <h1>Create New <span className="gradient-text">Event</span></h1>
            <p>List your event and reach thousands of students across campus</p>
          </div>

          {isSuccess ? (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h2>Event Submitted!</h2>
              <p>Your event has been submitted for review. It will be live within 24 hours after approval.</p>
              <Link href="/" className="btn btn-primary">
                Return to Home
              </Link>
            </div>
          ) : (
            <form className="enrollment-form" onSubmit={handleSubmit}>
              {/* Event Details Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">🎯</span>
                  Event Details
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Event Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Hackfest 2025"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select a category</option>
                      {eventCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.emoji} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Event Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event, what attendees can expect, and why they should attend..."
                    required
                    className="form-textarea"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label>Event Poster</label>
                  <div className="upload-zone poster-upload">
                    {posterPreview ? (
                      <div className="poster-preview">
                        <img src={posterPreview} alt="Poster preview" />
                        <button 
                          type="button" 
                          className="remove-logo"
                          onClick={() => setPosterPreview(null)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePosterChange}
                          className="upload-input"
                        />
                        <div className="upload-content">
                          <span className="upload-icon">🖼️</span>
                          <span>Click to upload event poster</span>
                          <span className="upload-hint">Recommended: 16:9 ratio, PNG or JPG</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Date & Time Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📅</span>
                  Schedule
                </h3>
                
                <div className="form-row three-col">
                  <div className="form-group">
                    <label htmlFor="date">Event Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startTime">Start Time *</label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">End Time *</label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 3 Hours, 2 Days"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registrationDeadline">Registration Deadline *</label>
                    <input
                      type="date"
                      id="registrationDeadline"
                      name="registrationDeadline"
                      value={formData.registrationDeadline}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Venue & Capacity Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📍</span>
                  Venue & Capacity
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="venue">Venue *</label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="e.g., Main Auditorium, Block A"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxAttendees">Max Attendees *</label>
                    <input
                      type="number"
                      id="maxAttendees"
                      name="maxAttendees"
                      value={formData.maxAttendees}
                      onChange={handleChange}
                      placeholder="e.g., 200"
                      required
                      min="1"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Organizer Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">👤</span>
                  Organizer Information
                </h3>
                
                <div className="form-row three-col">
                  <div className="form-group">
                    <label htmlFor="clubId">Club/Organization *</label>
                    <select
                      id="clubId"
                      name="clubId"
                      value={formData.clubId}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select a club</option>
                      {loadingClubs ? (
                        <option disabled>Loading clubs...</option>
                      ) : clubs.length === 0 ? (
                        <option disabled>No clubs available - register one first</option>
                      ) : (
                        clubs.map(club => (
                          <option key={club.id} value={club.id}>
                            {club.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="organizerName">Organizer Name *</label>
                    <input
                      type="text"
                      id="organizerName"
                      name="organizerName"
                      value={formData.organizerName}
                      onChange={handleChange}
                      placeholder="e.g., Rahul Sharma"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organizerEmail">Contact Email *</label>
                    <input
                      type="email"
                      id="organizerEmail"
                      name="organizerEmail"
                      value={formData.organizerEmail}
                      onChange={handleChange}
                      placeholder="organizer@campus.edu"
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">✨</span>
                  Additional Information <span className="optional-tag">(Optional)</span>
                </h3>
                
                <div className="form-group">
                  <label htmlFor="requirements">Requirements for Attendees</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List any requirements, one per line:&#10;• Valid student ID&#10;• Laptop with charger&#10;• Pre-registration required"
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="highlights">Event Highlights</label>
                  <textarea
                    id="highlights"
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleChange}
                    placeholder="List event highlights, one per line:&#10;• Prize pool: ₹50,000&#10;• Industry mentors&#10;• Free food & swag"
                    className="form-textarea"
                    rows={3}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Creating Event...
                  </>
                ) : (
                  <>
                    Create Event
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

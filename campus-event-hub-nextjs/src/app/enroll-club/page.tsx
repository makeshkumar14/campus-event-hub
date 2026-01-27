'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const clubCategories = [
  { value: 'tech', label: 'Technology & Coding', emoji: '💻' },
  { value: 'music', label: 'Music & Band', emoji: '🎵' },
  { value: 'sports', label: 'Sports & Fitness', emoji: '⚽' },
  { value: 'art', label: 'Art & Design', emoji: '🎨' },
  { value: 'drama', label: 'Drama & Theater', emoji: '🎭' },
  { value: 'dance', label: 'Dance & Choreography', emoji: '💃' },
  { value: 'literature', label: 'Literature & Writing', emoji: '📚' },
  { value: 'photography', label: 'Photography & Film', emoji: '📷' },
  { value: 'social', label: 'Social Service', emoji: '🤝' },
  { value: 'other', label: 'Other', emoji: '✨' },
];

interface FormData {
  clubName: string;
  description: string;
  email: string;
  category: string;
  advisorName: string;
  contactPhone: string;
  instagram: string;
  linkedin: string;
  website: string;
}

export default function EnrollClubPage() {
  const [formData, setFormData] = useState<FormData>({
    clubName: '',
    description: '',
    email: '',
    category: '',
    advisorName: '',
    contactPhone: '',
    instagram: '',
    linkedin: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clubName: formData.clubName,
          category: formData.category,
          aboutClub: formData.description,
          clubLogo: logoPreview,
          officialEmail: formData.email,
          contactPhone: formData.contactPhone,
          advisorName: formData.advisorName,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
          website: formData.website,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create club');
      }

      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          clubName: '',
          description: '',
          email: '',
          category: '',
          advisorName: '',
          contactPhone: '',
          instagram: '',
          linkedin: '',
          website: '',
        });
        setLogoPreview(null);
      }, 4000);
    } catch (error) {
      console.error('Error creating club:', error);
      alert('Failed to register club. Please try again.');
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
              <span className="badge-icon">🚀</span>
              Club Registration
            </span>
            <h1>Register Your <span className="gradient-text">Club</span></h1>
            <p>Join the CampusVibe community and showcase your club to thousands of students</p>
          </div>

          {isSuccess ? (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h2>Registration Submitted!</h2>
              <p>Your club registration has been received. We&apos;ll review and approve it within 24-48 hours.</p>
              <Link href="/" className="btn btn-primary">
                Return to Home
              </Link>
            </div>
          ) : (
            <form className="enrollment-form" onSubmit={handleSubmit}>
              {/* Basic Info Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📋</span>
                  Basic Information
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="clubName">Club Name *</label>
                    <input
                      type="text"
                      id="clubName"
                      name="clubName"
                      value={formData.clubName}
                      onChange={handleChange}
                      placeholder="e.g., CodeCraft Labs"
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
                      {clubCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.emoji} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">About Your Club *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your club's mission, activities, and what makes it special..."
                    required
                    className="form-textarea"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label>Club Logo</label>
                  <div className="upload-zone">
                    {logoPreview ? (
                      <div className="logo-preview">
                        <img src={logoPreview} alt="Logo preview" />
                        <button 
                          type="button" 
                          className="remove-logo"
                          onClick={() => setLogoPreview(null)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="upload-input"
                        />
                        <div className="upload-content">
                          <span className="upload-icon">📤</span>
                          <span>Click to upload logo</span>
                          <span className="upload-hint">PNG, JPG up to 5MB</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📞</span>
                  Contact Details
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Official Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourclub@campus.edu"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Contact Phone</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="advisorName">Faculty Advisor Name</label>
                  <input
                    type="text"
                    id="advisorName"
                    name="advisorName"
                    value={formData.advisorName}
                    onChange={handleChange}
                    placeholder="Dr. John Doe"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Social Links Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">🌐</span>
                  Social Links <span className="optional-tag">(Optional)</span>
                </h3>
                
                <div className="form-row three-col">
                  <div className="form-group">
                    <label htmlFor="instagram" className="label-with-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                        <defs>
                          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFDC80"/>
                            <stop offset="25%" stopColor="#F77737"/>
                            <stop offset="50%" stopColor="#E1306C"/>
                            <stop offset="75%" stopColor="#C13584"/>
                            <stop offset="100%" stopColor="#833AB4"/>
                          </linearGradient>
                        </defs>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </label>
                    <div className="input-with-icon">
                      <span className="input-icon">@</span>
                      <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="yourclub"
                        className="form-input with-icon"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="linkedin" className="label-with-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/..."
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website" className="label-with-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="url(#globe-gradient)" strokeWidth="2"/>
                        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="url(#globe-gradient)" strokeWidth="2"/>
                        <line x1="2" y1="12" x2="22" y2="12" stroke="url(#globe-gradient)" strokeWidth="2"/>
                        <defs>
                          <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6"/>
                            <stop offset="100%" stopColor="#06B6D4"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourclub.com"
                      className="form-input"
                    />
                  </div>
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
                    Registering...
                  </>
                ) : (
                  <>
                    Register Club
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

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
                    <label htmlFor="instagram">Instagram</label>
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
                    <label htmlFor="linkedin">LinkedIn</label>
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
                    <label htmlFor="website">Website</label>
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

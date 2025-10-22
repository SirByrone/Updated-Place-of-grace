import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from '../components/GoogleMap';
import './ContactPage.css';

// Inline utility functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

const handleEmailClick = (email, subject, body) => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink, '_self');
};

const openPhone = (phoneNumber) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const telLink = `tel:${cleanNumber}`;
  window.open(telLink, '_self');
};

const openSocialMedia = (platform, identifier) => {
  const urls = {
    facebook: `https://facebook.com/${identifier}`,
    instagram: `https://instagram.com/${identifier}`,
    tiktok: `https://tiktok.com/@${identifier}`,
    youtube: `https://youtube.com/@${identifier}`
  };
  
  const url = urls[platform];
  if (url) {
    window.open(url, '_blank');
  }
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open email client with pre-filled information
      const emailSubject = encodeURIComponent(formData.subject);
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n\n` +
        `Message:\n${formData.message}`
      );
      
      // Use the external app integration utility
      handleEmailClick(
        'pogchome2019@gmail.com',
        emailSubject,
        emailBody
      );
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      // Form submission error occurred
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectEmailClick = () => {
    handleEmailClick(
      'pogchome2019@gmail.com',
      'Inquiry from Website',
      'Hello, I would like to learn more about your organization and how I can help.'
    );
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-background">
          <div className="contact-hero-overlay"></div>
          <div className="contact-particles"></div>
          <div className="contact-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
          <div className="contact-lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
            <div className="line line-4"></div>
          </div>
        </div>
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Reach out to us for any questions, support, or to learn how you can make a difference in children's lives.</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card email-card">
              <div className="contact-icon">📧</div>
              <h3>Email Us</h3>
              <p>Send us an email for any inquiries, questions, or to learn how you can help make a difference in children's lives.</p>
              
              <div className="email-options">
                <div className="email-option primary-email">
                  <div className="email-header">
                    <span className="email-label">Main Contact Email</span>
                    <span className="email-badge">Primary</span>
                  </div>
                  <div className="email-address">
                    <strong>pogchome2019@gmail.com</strong>
                  </div>
                  <p className="email-purpose">For all general inquiries, donations, volunteer opportunities, and main communications</p>
                  <button 
                    className="contact-action-btn primary"
                    onClick={() => handleEmailClick(
                      'pogchome2019@gmail.com',
                      'Inquiry from Website',
                      'Hello, I would like to learn more about your organization and how I can help.'
                    )}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>Speak directly with our team for immediate assistance.</p>
              <div className="contact-phone">
                <strong>0722 860 321</strong>
              </div>
              <button 
                className="contact-action-btn secondary"
                onClick={() => openPhone('+254722860321')}
              >
                Call Now
              </button>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📮</div>
              <h3>P.O. Box Address</h3>
              <p>Send us mail at our official postal address.</p>
              <div className="contact-address">
                <strong>P.O. BOX 30859-00100</strong><br />
                <strong>NAIROBI, KENYA</strong>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Come see our facilities and meet our wonderful children.</p>
              <div className="contact-address">
                <strong>Place of Grace Children's Home</strong><br />
                Donholm Phase Five Policeline Road<br />
                Nairobi, Kenya
              </div>
              
              {/* Interactive Map */}
              <div className="map-container">
                <GoogleMap 
                  address="Donholm Phase Five Policeline Road, Nairobi, Kenya"
                  zoom={16}
                  height="250px"
                  width="100%"
                />
              </div>
              
              {/* Map Actions */}
              <div className="map-actions">
                <button 
                  className="map-action-btn primary"
                  onClick={() => {
                    const address = "Donholm Phase Five Policeline Road, Nairobi, Kenya";
                    const encodedAddress = encodeURIComponent(address);
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
                    window.open(directionsUrl, '_blank');
                  }}
                >
                  🚗 Get Directions
                </button>
                <button 
                  className="map-action-btn secondary"
                  onClick={() => {
                    const address = "Donholm Phase Five Policeline Road, Nairobi, Kenya";
                    const encodedAddress = encodeURIComponent(address);
                    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                    window.open(searchUrl, '_blank');
                  }}
                >
                  🔍 View on Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you promptly.</p>
            
            {submitSuccess && (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <div>
                  <h3>Message Sent Successfully!</h3>
                  <p>We've opened your email client. Please send the message to complete your inquiry.</p>
                </div>
              </div>
            )}
            
            {errors.submit && (
              <div className="error-message">
                <div className="error-icon">❌</div>
                <p>{errors.submit}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter your phone number (optional)"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? 'error' : ''}
                    placeholder="What is this about?"
                    required
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="social-media-section">
        <div className="container">
          <h2>Connect With Us</h2>
          <p>Stay connected and follow our journey of transforming children's lives.</p>
          
          <div className="social-links">
            <button 
              className="social-link facebook"
              onClick={() => openSocialMedia('facebook', 'PlaceofGrace.CommunityCentre')}
              title="Follow us on Facebook"
            >
              <span className="social-icon">📘</span>
              <span className="social-name">Facebook</span>
              <span className="social-handle">@PlaceofGrace.CommunityCentre</span>
            </button>
            
            <button 
              className="social-link instagram"
              onClick={() => openSocialMedia('instagram', 'placeofgrace_childrenshome')}
              title="Follow us on Instagram"
            >
              <span className="social-icon">📷</span>
              <span className="social-name">Instagram</span>
              <span className="social-handle">@placeofgrace_childrenshome</span>
            </button>
            
            
            <button 
              className="social-link youtube"
              onClick={() => openSocialMedia('youtube', 'PlaceofGraceChildrensHome')}
              title="Subscribe to our YouTube channel"
            >
              <span className="social-icon">📺</span>
              <span className="social-name">YouTube</span>
              <span className="social-handle">PlaceofGraceChildrensHome</span>
            </button>
          </div>
          
          <div className="social-note">
            <p>💡 <strong>Tip:</strong> Click any platform above to open the app or website directly!</p>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="additional-info">
        <div className="container">
          <h2>More Ways to Get Involved</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Volunteer Opportunities</h3>
              <p>Interested in volunteering? Visit our <Link to="/get-involved">How to Help</Link> page for detailed instructions.</p>
            </div>
            <div className="info-card">
              <h3>Partnerships</h3>
              <p>We welcome partnerships with organizations and businesses. Contact us to discuss collaboration opportunities.</p>
            </div>
            <div className="info-card">
              <h3>Programs & Services</h3>
              <p>Learn more about our comprehensive programs and services. Visit our <Link to="/programs">Programs</Link> page to learn more.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 
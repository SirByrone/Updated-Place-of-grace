import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GetInvolvedPage.css';

const GetInvolvedPage = () => {
  const [donationAmount, setDonationAmount] = useState(50);
  const [donationType, setDonationType] = useState('one-time');

  const handleAmountChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Replace alert with proper user feedback
    const message = `Thank you for your ${donationType} donation of USD ${donationAmount}. (This would integrate with a payment gateway)`;
    // Remove console.log for production security
    // In production, this would show a proper success message component
  };

  const volunteerOpportunities = [
    {
      title: "Tutors and Mentors",
      description: "Help children with their studies and provide mentorship support",
      icon: "📚",
      commitment: "2-4 hours per week"
    },
    {
      title: "Medical Professionals",
      description: "Provide healthcare services and medical check-ups",
      icon: "🏥",
      commitment: "Flexible schedule"
    },
    {
      title: "Activity Coordinators",
      description: "Organize recreational activities and educational programs",
      icon: "🎨",
      commitment: "Weekends or afternoons"
    },
    {
      title: "Handymen for Maintenance",
      description: "Help with repairs and maintenance of our facilities",
      icon: "🔧",
      commitment: "As needed"
    }
  ];

  const donationOptions = [
    {
      title: "One-time Donation",
      description: "Make a single contribution to support our children",
      amount: "Any amount",
      icon: "💝"
    },
    {
      title: "Monthly Sponsorship",
      description: "Provide ongoing support with monthly contributions",
      amount: "From $25/month",
      icon: "🔄"
    },
    {
      title: "In-kind Donations",
      description: "Donate food, clothes, school supplies, and other essentials",
      amount: "Any items",
      icon: "📦"
    }
  ];

  return (
    <div className="get-involved-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="getinvolved-hero-background">
          <div className="getinvolved-hero-overlay"></div>
          <div className="getinvolved-particles"></div>
          <div className="getinvolved-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
          <div className="getinvolved-hearts">
            <div className="heart heart-1">💝</div>
            <div className="heart heart-2">🤝</div>
            <div className="heart heart-3">🌟</div>
            <div className="heart heart-4">💙</div>
          </div>
        </div>
        <div className="container">
          <h1>How You Can Help</h1>
          <p className="hero-subtitle">
            There are many ways you can support our mission to provide love, care, and hope for vulnerable children.
          </p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="donate-section">
        <div className="container">
          <div className="section-header">
            <h2>Donate</h2>
            <p className="section-intro">
              Your contributions help provide food, shelter, education, and healthcare for our children.
            </p>
          </div>
          
          <div className="donation-options-grid">
            {donationOptions.map((option, index) => (
              <div key={index} className="donation-option-card">
                <div className="option-icon">{option.icon}</div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <div className="amount">{option.amount}</div>
              </div>
            ))}
          </div>

          <div className="donation-form-container">
            <h3>Make a Donation</h3>
            <form onSubmit={handleDonationSubmit} className="donation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="donation-type">Donation Type</label>
                  <select
                    id="donation-type"
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value)}
                  >
                    <option value="one-time">One-time Donation</option>
                    <option value="monthly">Monthly Sponsorship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="donation-amount">Amount (USD)</label>
                  <input
                    type="number"
                    id="donation-amount"
                    min="1"
                    value={donationAmount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <button type="submit" className="donate-button">
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="volunteer-section">
        <div className="container">
          <div className="section-header">
            <h2>Volunteer</h2>
            <p className="section-intro">
              Join us in making a difference! We welcome volunteers from all backgrounds.
            </p>
          </div>
          
          <div className="volunteer-opportunities-grid">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="volunteer-opportunity-card">
                <div className="opportunity-icon">{opportunity.icon}</div>
                <h3>{opportunity.title}</h3>
                <p>{opportunity.description}</p>
                <div className="commitment">
                  <strong>Time Commitment:</strong> {opportunity.commitment}
                </div>
                <button className="volunteer-button">Learn More</button>
              </div>
            ))}
          </div>

          <div className="volunteer-cta">
            <h3>Ready to Make a Difference?</h3>
            <p>Contact us to learn more about volunteer opportunities and how you can get involved.</p>
            <Link to="/contact" className="cta-button">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Corporate Partnerships Section */}
      <section className="corporate-partnerships-section">
        <div className="container">
          <div className="section-header">
            <h2>Corporate Partnerships</h2>
            <p className="section-intro">
              We invite companies and organizations to partner with us in supporting children's education, 
              health, and overall well-being.
            </p>
          </div>
          
          <div className="partnership-benefits">
            <div className="benefit-card">
              <h3>🤝 Partnership Benefits</h3>
              <ul>
                <li>Visibility and brand recognition</li>
                <li>Impact reporting and transparency</li>
                <li>Joint events and community engagement</li>
                <li>Employee volunteer opportunities</li>
                <li>Tax benefits and CSR fulfillment</li>
              </ul>
            </div>
            
            <div className="partnership-areas">
              <h3>📋 Partnership Areas</h3>
              <ul>
                <li>Education sponsorship programs</li>
                <li>Healthcare and nutrition support</li>
                <li>Infrastructure and facility improvements</li>
                <li>Skills development and training</li>
                <li>Emergency response and crisis support</li>
              </ul>
            </div>
          </div>

          <div className="partnership-cta">
            <h3>Partner With Us</h3>
            <p>Let's work together to create lasting positive impact in children's lives.</p>
            <Link to="/contact" className="cta-button primary">Contact for Partnership</Link>
          </div>
        </div>
      </section>

      {/* Contact & Donations Info Section */}
      <section className="contact-donations-info">
        <div className="container">
          <div className="section-header">
            <h2>Direct Donation & Contact Information</h2>
            <p>For direct bank transfers or MPESA donations, please use the details below. We are grateful for your support!</p>
          </div>
          
          <div className="contact-info-grid">
            <div className="contact-item">
              <h4>Phone:</h4>
              <p><a href="tel:+254722860321">+254 722 860 321</a></p>
            </div>
            <div className="contact-item">
              <h4>Email:</h4>
              <p><a href="mailto:placeofgraceoutreach@gmail.com">placeofgraceoutreach@gmail.com</a></p>
            </div>
            <div className="contact-item">
              <h4>Address:</h4>
              <p>DONHOLM PHASE FIVE POLICELINE ROAD</p>
            </div>
            <div className="contact-item">
              <h4>P.O. Box:</h4>
              <p>30859 – 00100 NAIROBI</p>
            </div>
          </div>

          <div className="donation-methods-grid">
            <div className="donation-method-card">
              <h4>Bank Transfer</h4>
              <p><strong>Account Name:</strong> Place Of Grace Community Center</p>
              <p><strong>Bank:</strong> Consolidated Bank - Umoja Branch</p>
              <p><strong>Account No:</strong> 10131 30100 0531</p>
            </div>
            <div className="donation-method-card">
              <h4>MPESA Paybill</h4>
              <p><strong>MPESA No:</strong> 0722 860 321</p>
              <p><strong>Paybill No:</strong> 508885</p>
              <p><strong>Account No:</strong> 1434#name</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Engagement Section */}
      <section className="social-engagement-section">
        <div className="container">
          <div className="section-header">
            <h2>Stay Connected & Share Our Mission</h2>
            <p>Follow us on social media to stay updated with our latest activities, impact stories, and ways you can help.</p>
          </div>
          <div className="social-links">
            <a href="https://facebook.com/PlaceofGrace.CommunityCentre" target="_blank" rel="noopener noreferrer" className="social-link facebook">
              <span className="social-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a href="https://instagram.com/placeofgracecommunitycentre" target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <span className="social-icon">📷</span>
              <span>Instagram</span>
            </a>
            <a href="https://tiktok.com/@placeofgracectr" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
              <span className="social-icon">🎵</span>
              <span>TikTok</span>
            </a>
          </div>
          <p className="social-engagement-note">
            Share our mission with your network and help us reach more people who want to make a difference!
          </p>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;
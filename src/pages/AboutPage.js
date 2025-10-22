import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PhotoModal from '../components/PhotoModal';
import FadeInText from '../components/FadeInText';
import './AboutPage.css';

// Inline utility functions
const handleEmailClick = (email, subject, body) => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink, '_self');
};

const openPhone = (phoneNumber) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const telLink = `tel:${cleanNumber}`;
  window.open(telLink, '_self');
};

const AboutPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    story: false,
    team: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamScrollRef = useRef(null);

  // Team members data
  const teamMembers = [
    {
      name: "Penina Kioko",
      role: "Founder (Late)",
      bio: "Founder and visionary leader who established Place of Grace in 2009, providing strategic direction and ensuring our mission continues to transform lives.",
      image: "/assets/photos/team/maria-kioko.jpg",
     
      email: "placeofgraceoutreach@gmail.com",
      initials: "MK"
    },
    {
      name: "Ruth Munanie",
      role: "Executive Director",
      bio: "Leading our organization with strategic vision and operational excellence, ensuring we provide the highest quality care and support for vulnerable children.",
      image: "/assets/photos/team/ruth-munanie.jpg",
      phone: "+254 722 860 321",
      email: "placeofgraceoutreach@gmail.com",
      initials: "RM"
    },
    {
      name: "Johnston Kioko",
      role: "Board Chair",
      bio: "Providing strategic direction and governance oversight to ensure our mission continues to transform lives and build brighter futures.",
      image: "/assets/photos/team/johnston-kioko.jpg",
      phone: "+254 722 556 382",
      email: "placeofgraceoutreach@gmail.com",
      initials: "JK"
    },
    {
      name: "Kevin Mutai",
      role: "Social Worker",
      bio: "Providing specialized social work services, case management, and support to ensure every child receives comprehensive care and rehabilitation.",
      image: "/assets/photos/team/kevin-mutai.jpg",
      phone: "+254 741 051 971",
      email: "placeofgraceoutreach@gmail.com",
      initials: "KM"
    },
    {
      name: "Julius Ndukuthyo",
      role: "Media and Publicity",
      bio: "Managing our communications, public relations, and media outreach to raise awareness and build support for our mission and children.",
      image: "/assets/photos/team/julius-ndukuthyo.jpg",
      phone: "+254 727 514 057",
      email: "placeofgraceoutreach@gmail.com",
      initials: "JN"
    }
  ];

  // Core values
  const coreValues = [
    {
      icon: "❤️",
      title: "Compassion",
      description: "We approach every child with unconditional love and understanding, recognizing their inherent worth and potential."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building strong relationships with families, volunteers, and partners to create a supportive network for our children."
    },
    {
      icon: "🎯",
      title: "Excellence",
      description: "Striving for the highest standards in all our programs, facilities, and care practices."
    },
    {
      icon: "🔒",
      title: "Safety",
      description: "Creating secure environments where children feel protected and can thrive without fear."
    },
    {
      icon: "🌟",
      title: "Empowerment",
      description: "Equipping children with skills, education, and confidence to build bright futures."
    },
    {
      icon: "🌱",
      title: "Growth",
      description: "Fostering continuous learning and development for both our children and our organization."
    }
  ];

  // Partnerships
  const partnerships = [
    {
      name: "Local Schools",
      description: "Partnering with educational institutions to provide quality education for our children.",
      icon: "🏫",
      details: "We collaborate with local schools to ensure our children receive quality education and have access to proper learning environments."
    },
    {
      name: "Healthcare Providers",
      description: "Collaborating with medical professionals to ensure comprehensive healthcare services.",
      icon: "🏥",
      details: "Our healthcare partnerships provide regular check-ups, emergency care, and specialized medical attention for children with health needs."
    },
    {
      name: "Community Organizations",
      description: "Working with local groups to create a supportive network for our children and families.",
      icon: "🤝",
      details: "We work closely with community organizations to create awareness, mobilize resources, and build strong support networks."
    },
    {
      name: "Government Agencies",
      description: "Partnering with child protection and social services agencies to ensure proper care standards.",
      icon: "🏛️",
      details: "Our partnerships with government agencies ensure we meet all regulatory requirements and maintain the highest standards of child care."
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const openPhotoModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  };

  const handleTeamScroll = () => {
    // Handle team section scroll if needed
  };

  return (
    <div className="about-page page-content">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-background">
          <div className="about-hero-overlay"></div>
          <div className="about-particles"></div>
          <div className="about-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="about-waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
          </div>
        </div>
        <div className="about-hero-content">
          <FadeInText direction="up" delay={0} duration={1200} className="hero-title">
            <h1>About Place of Grace</h1>
          </FadeInText>
          <FadeInText direction="up" delay={200} duration={1000} className="hero-subtitle">
            <p>
              Transforming lives through love, care, and education since 2009. 
              We are dedicated to providing hope and opportunity for vulnerable children.
            </p>
          </FadeInText>
        </div>
      </section>

      <div className="about-content">
        {/* Story Section */}
        <section className="about-section">
          <div className="container">
            <FadeInText direction="up" delay={0} duration={800} className="section-title">
              <h2>Our Story</h2>
            </FadeInText>
            <FadeInText direction="up" delay={200} duration={800} className="paragraph">
              <p>
                Place of Grace Children's Home was founded in 2009 with a simple yet powerful mission: 
                to provide love, care, and hope for orphaned and vulnerable children. What started as a 
                small initiative has grown into a comprehensive care facility that has touched hundreds of lives.
              </p>
            </FadeInText>
            <FadeInText direction="up" delay={400} duration={800} className="paragraph">
              <p>
                Our journey began when our founder, the late Penina Kioko, witnessed the plight of children 
                living on the streets and in unsafe conditions. Moved by compassion, he established 
                a safe haven where these children could find love, education, and a chance for a better future.
              </p>
            </FadeInText>
            
            <div className="story-image">
              <img 
                src="/assets/facilities/founding-story.jpg" 
                alt="Place of Grace founding story" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="story-image-placeholder">
                <span>🏠</span>
                <p>Our Story</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision Section - Always Visible */}
        <section className="mission-vision-section">
          <div className="container">
            <h2>Our Mission & Vision</h2>
            <div className="mission-vision-grid">
              <div className="mission-card">
                <h3>Our Mission</h3>
                <p>To rescue, rehabilitate, and empower orphaned and vulnerable children, ensuring they grow up in a safe and nurturing environment where they can thrive and reach their full potential.</p>
              </div>
              <div className="vision-card">
                <h3>Our Vision</h3>
                <p>A world where every child thrives, free from abuse, neglect, and poverty, with access to quality education, healthcare, and the love they need to become confident, capable adults.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Always Visible */}
        <section className="values-section">
          <div className="container">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              {coreValues.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <div className="section-header">
              <h2>Meet Our Team</h2>
              <p className="section-description">
                Dedicated individuals working together to provide love, care, and support to vulnerable children.
              </p>
              <button 
                className={`expand-button ${expandedSections.team ? 'expanded' : ''}`}
                onClick={() => toggleSection('team')}
              >
                {expandedSections.team ? 'Show Less' : 'View More'}
                <span className="expand-icon">▼</span>
              </button>
            </div>
            
            <div className={`team-container ${expandedSections.team ? 'expanded' : ''}`}>
              <div className="team-scroll-wrapper" ref={teamScrollRef} onScroll={handleTeamScroll}>
                <div className="team-grid">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                      <div className="member-image">
                        <img
                          src={member.image}
                          alt={`${member.name} - ${member.role}`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.classList.add('visible');
                          }}
                        />
                        <div className="member-placeholder">
                          <div className="member-initials">{member.initials}</div>
                        </div>
                      </div>
                      <div className="member-info">
                        <h3>{member.name}</h3>
                        <div className="member-role">{member.role}</div>
                        <div className="member-contact">
                          <a href={`tel:${member.phone}`} className="contact-link phone-link">
                            📞 {member.phone}
                          </a>
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section className="partnerships-section">
          <div className="container">
            <h2>Our Partnerships</h2>
            <p>
              We believe in the power of collaboration. Through strategic partnerships, 
              we enhance our ability to provide comprehensive care and support for our children.
            </p>
            <div className="partnerships-grid">
              {partnerships.map((partner, index) => (
                <div key={index} className="partnership-card">
                  <div className="partnership-header">
                    <div className="partnership-icon">{partner.icon}</div>
                    <h3>{partner.name}</h3>
                  </div>
                  <div className="partnership-content">
                    <p>{partner.description}</p>
                    <p className="partnership-details">{partner.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="impact-section">
          <div className="container">
            <div className="impact-header">
              <h2>Our Impact</h2>
              <p>
                Since our founding in 2009, we have made a significant difference in the lives of vulnerable children. 
                Our programs have helped children overcome challenges and build brighter futures.
              </p>
            </div>
            <div className="impact-stats-grid">
              <div className="impact-stat-card">
                <div className="stat-icon">👶</div>
                <h3>265+</h3>
                <p>Children Supported</p>
                <div className="stat-description">Lives transformed through love and care</div>
              </div>
              <div className="impact-stat-card">
                <div className="stat-icon">⏰</div>
                <h3>15+</h3>
                <p>Years of Service</p>
                <div className="stat-description">Dedicated commitment since 2009</div>
              </div>
              <div className="impact-stat-card">
                <div className="stat-icon">📚</div>
                <h3>24</h3>
                <p>Children in Education</p>
                <div className="stat-description">Currently enrolled in schools (2024)</div>
              </div>
              <div className="impact-stat-card">
                <div className="stat-icon">💯</div>
                <h3>100%</h3>
                <p>Commitment to Care</p>
                <div className="stat-description">Unwavering dedication to every child</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="about-cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Join Us in Making a Difference</h2>
              <p>
                Every child deserves love, care, and opportunity. Your support helps us continue our mission 
                of transforming lives and building brighter futures for vulnerable children.
              </p>
              <div className="cta-buttons">
                <Link to="/get-involved" className="cta-button primary">
                  Get Involved
                </Link>
                <Link to="/contact" className="cta-button secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Photo Modal */}
      <PhotoModal 
        isOpen={isModalOpen}
        onClose={closePhotoModal}
        member={selectedMember}
      />
    </div>
  );
};

export default AboutPage; 
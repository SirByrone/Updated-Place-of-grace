import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProgramsPage.css';

const ProgramsPage = () => {
  const [countedStats, setCountedStats] = useState({
    children: 0,
    education: 0,
    programs: 0,
    volunteers: 0
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const programs = [
    {
      title: "Child Rescue, Rehabilitation & Reintegration",
      description: "We work closely with local authorities and child protection agencies to rescue children from unsafe situations, rehabilitate them, and where possible, reunite them with loving families.",
      features: [
        "Emergency rescue operations",
        "Safe shelter provision",
        "Family tracing and reunification",
        "Legal support and advocacy"
      ],
      image: "/assets/photos/facilities/child-rescue.jpg"
    },
    {
      title: "Education Support",
      description: "We have supported over 265 orphans and vulnerable children, with some integrated back into their families while others are supported to live independently. All children receive support until they complete their desired level of education and become fully self-sustainable.",
      features: [
        "School uniforms, shoes, and school bags provided",
        "Comprehensive school feeding program",
        "Payment of school fees for all beneficiaries",
        "Daily transport for children attending distant schools",
        "Books and learning materials support",
        "24 children currently accessing education in 2024"
      ],
      image: "/assets/photos/facilities/education-support.jpg"
    },
    {
      title: "Nutrition & Healthcare",
      description: "Our comprehensive feeding program provides essential nutrition and healthcare services to vulnerable children, ensuring their physical well-being and development.",
      features: [
        "Daily nutritious meals for all children",
        "Support for integrated adult children (18+ years)",
        "Comprehensive nutrition and healthcare services",
        "Regular health check-ups and medical care",
        "Emergency medical care and immunization programs",
        "Specialized dietary needs accommodation"
      ],
      image: "/assets/photos/facilities/nutrition-healthcare.jpg"
    },
    {
      title: "Psychosocial Support & Counseling",
      description: "Many of our children have experienced trauma. We offer professional counseling and mentorship to help them heal emotionally and mentally.",
      features: [
        "Individual and group counseling",
        "Trauma-informed care",
        "Art and play therapy",
        "Life skills development"
      ],
      image: "/assets/photos/facilities/psychosocial-support.jpg"
    },
    {
      title: "Skills Development & Vocational Training",
      description: "For older children, we provide life skills training, vocational courses, and job placement support to help them transition into adulthood.",
      features: [
        "Life skills workshops",
        "Vocational training programs",
        "Job placement assistance",
        "Entrepreneurship training"
      ],
      image: "/assets/photos/facilities/skills-development.jpg"
    }
  ];

  // Program photos for the gallery
  const programPhotos = [
    {
      src: "/assets/photos/facilities/child-rescue.jpg",
      title: "Child Rescue Operations",
      description: "Emergency rescue operations to save children from unsafe situations"
    },
    {
      src: "/assets/photos/facilities/education-support.jpg",
      title: "Education Support Program",
      description: "Comprehensive educational support including uniforms, books, and school fees"
    },
    {
      src: "/assets/photos/facilities/nutrition-healthcare.jpg",
      title: "Nutrition & Healthcare",
      description: "Daily nutritious meals and comprehensive healthcare services"
    },
    {
      src: "/assets/photos/facilities/psychosocial-support.jpg",
      title: "Psychosocial Support",
      description: "Professional counseling and trauma-informed care for children"
    },
    {
      src: "/assets/photos/facilities/skills-development.jpg",
      title: "Skills Development",
      description: "Vocational training and life skills workshops for older children"
    },
    {
      src: "/assets/photos/facilities/main-building-2024.jpg",
      title: "Main Facility",
      description: "Our main building providing safe shelter and care for vulnerable children"
    },
    {
      src: "/assets/photos/facilities/dormitory-interior-1-2024.jpg",
      title: "Children's Dormitory",
      description: "Comfortable and safe sleeping quarters for our children"
    },
    {
      src: "/assets/photos/facilities/neat-bed-2024.jpg",
      title: "Clean Living Spaces",
      description: "Maintaining high standards of cleanliness and organization"
    }
  ];

  const targetStats = {
    children: 265,
    education: 24,
    programs: 6,
    volunteers: 20
  };

  const animateCount = (target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      return Math.floor(current);
    }, 16);
    
    return timer;
  };

  const startCounting = () => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    
    const duration = 2000;
    const timers = {};
    
    Object.keys(targetStats).forEach(stat => {
      timers[stat] = animateCount(targetStats[stat], duration);
    });
    
    // Update state every 16ms for smooth animation
    const updateInterval = setInterval(() => {
      setCountedStats(prev => {
        const newStats = { ...prev };
        Object.keys(targetStats).forEach(stat => {
          const progress = Math.min((Date.now() - (Date.now() - duration)) / duration, 1);
          newStats[stat] = Math.floor(targetStats[stat] * progress);
        });
        return newStats;
      });
    }, 16);
    
    // Clean up after animation completes
    setTimeout(() => {
      clearInterval(updateInterval);
      setCountedStats(targetStats);
    }, duration);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            startCounting();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.observe(statsRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="programs-page page-content">
      <section className="hero-section">
        <div className="programs-hero-background">
          <div className="programs-hero-overlay"></div>
          <div className="programs-particles"></div>
          <div className="programs-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="programs-waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
          </div>
        </div>
        <div className="container">
          <h1>Our Programs & Services</h1>
          <p className="hero-subtitle">
            Comprehensive care and support for vulnerable children, from rescue to reintegration
          </p>
        </div>
      </section>

      <section className="programs-overview">
        <div className="container">
          <div className="overview-content">
            <h2>Holistic Care Approach</h2>
            <p>
              At Place of Grace Children's Home, we believe in providing comprehensive care that addresses 
              every aspect of a child's development. Our programs are designed to rescue children from 
              difficult situations, provide them with the care they need, and prepare them for a bright future.
            </p>
          </div>
        </div>
      </section>


      <section className="programs-list">
        <div className="container">
          {programs.map((program, index) => (
            <div key={index} className={`program-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="program-content">
                <div className="program-text">
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <ul className="program-features">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="program-image">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{ display: 'none' }}>
                    <span>📷</span>
                    <p>Photo coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="impact-stats" ref={statsRef}>
        <div className="container">
          <h2>Program Impact</h2>
          <div className="stats-grid">
            <div className="stat-item" onClick={startCounting}>
              <h3 className="counting-number">{countedStats.children}+</h3>
              <p>Orphans and vulnerable children supported</p>
            </div>
            <div className="stat-item" onClick={startCounting}>
              <h3 className="counting-number">{countedStats.education}</h3>
              <p>Children accessing education in 2024</p>
            </div>
            <div className="stat-item" onClick={startCounting}>
              <h3 className="counting-number">{countedStats.programs}</h3>
              <p>Comprehensive programs offered</p>
            </div>
            <div className="stat-item" onClick={startCounting}>
              <h3 className="counting-number">{countedStats.volunteers}+</h3>
              <p>Dedicated volunteers supporting programs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="get-involved-cta">
        <div className="container">
          <h2>Support Our Programs</h2>
          <p>
            Your support helps us provide these essential services to vulnerable children. 
            Whether through donations, volunteering, or partnerships, you can make a difference.
          </p>
          <div className="cta-buttons">
            <Link to="/get-involved" className="cta-button primary">Donate Now</Link>
            <Link to="/get-involved" className="cta-button secondary">Volunteer</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage; 
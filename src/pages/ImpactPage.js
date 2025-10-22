import React, { useState, useEffect, useRef } from 'react';
import './ImpactPage.css';

const ImpactPage = () => {
  const [countedImpactStats, setCountedImpactStats] = useState({
    children: 0,
    education: 0,
    feeding: 0,
    years: 0,
    volunteers: 0,
    service: 0
  });

  const [countedTransparencyStats, setCountedTransparencyStats] = useState({
    transparency: 0,
    audits: 0,
    reports: 0,
    policies: 0
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const impactStatsRef = useRef(null);
  const transparencyStatsRef = useRef(null);

  const impactTargetStats = {
    children: 265,
    education: 24,
    feeding: 408,
    years: 17,
    volunteers: 20,
    service: 15
  };

  const transparencyTargetStats = {
    transparency: 100,
    audits: 12,
    reports: 8,
    policies: 3
  };

  const animateCount = (target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
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

  const startImpactCounting = () => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    
    const duration = 2000;
    const timers = {};
    
    Object.keys(impactTargetStats).forEach(stat => {
      timers[stat] = animateCount(impactTargetStats[stat], duration);
    });
    
    const updateInterval = setInterval(() => {
      setCountedImpactStats(prev => {
        const newStats = { ...prev };
        Object.keys(impactTargetStats).forEach(stat => {
          const progress = Math.min((Date.now() - (Date.now() - duration)) / duration, 1);
          newStats[stat] = Math.floor(impactTargetStats[stat] * progress);
        });
        return newStats;
      });
    }, 16);
    
    setTimeout(() => {
      clearInterval(updateInterval);
      setCountedImpactStats(impactTargetStats);
    }, duration);
  };

  const startTransparencyCounting = () => {
    const duration = 2000;
    const timers = {};
    
    Object.keys(transparencyTargetStats).forEach(stat => {
      timers[stat] = animateCount(transparencyTargetStats[stat], duration);
    });
    
    const updateInterval = setInterval(() => {
      setCountedTransparencyStats(prev => {
        const newStats = { ...prev };
        Object.keys(transparencyTargetStats).forEach(stat => {
          const progress = Math.min((Date.now() - (Date.now() - duration)) / duration, 1);
          newStats[stat] = Math.floor(transparencyTargetStats[stat] * progress);
        });
        return newStats;
      });
    }, 16);
    
    setTimeout(() => {
      clearInterval(updateInterval);
      setCountedTransparencyStats(transparencyTargetStats);
    }, duration);
  };

  useEffect(() => {
    const impactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            startImpactCounting();
          }
        });
      },
      { threshold: 0.3 }
    );

    const transparencyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startTransparencyCounting();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (impactStatsRef.current) {
      impactObserver.observe(impactStatsRef.current);
    }
    if (transparencyStatsRef.current) {
      transparencyObserver.observe(transparencyStatsRef.current);
    }

    return () => {
      impactObserver.disconnect();
      transparencyObserver.disconnect();
    };
  }, [hasAnimated]);
  const impactStats = [
    { number: `${countedImpactStats.children}+`, label: "Orphans and vulnerable children supported" },
    { number: countedImpactStats.education, label: "Children accessing education in 2024" },
    { number: countedImpactStats.feeding, label: "Children benefited through feeding program" },
    { number: countedImpactStats.years, label: "Years of feeding program operation" },
    { number: `${countedImpactStats.volunteers}+`, label: "Volunteers making a difference" },
    { number: `${countedImpactStats.service}+`, label: "Years of service to vulnerable children" }
  ];

  const transparencyStats = [
    { number: `${countedTransparencyStats.transparency}%`, label: "Financial transparency" },
    { number: countedTransparencyStats.audits, label: "Independent audits conducted" },
    { number: countedTransparencyStats.reports, label: "Public financial reports" },
    { number: `${countedTransparencyStats.policies}+`, label: "Child protection policies" }
  ];

  const financialReports = [
    {
      year: "2024",
      title: "Annual Financial Report 2024",
      description: "Comprehensive financial statements and audit report for the fiscal year 2024.",
      fileSize: "2.3 MB",
      downloadUrl: "/assets/financial-report-2024.pdf"
    },
    {
      year: "2023",
      title: "Annual Financial Report 2023",
      description: "Financial statements and audit report for the fiscal year 2023.",
      fileSize: "1.8 MB",
      downloadUrl: "/assets/financial-report-2023.pdf"
    }
  ];

  const successStories = [
    {
      name: "Peter",
      age: "12",
      story: "Rescued from the streets, Peter now excels in school and dreams of becoming a doctor. His transformation is a testament to the power of love and care.",
      beforeImg: "/assets/peter-before.jpg",
      afterImg: "/assets/peter-after.jpg",
      quote: "I want to be a doctor to help other children like me."
    },
    {
      name: "Grace",
      age: "8",
      story: "Once abandoned, Grace is now thriving in a loving foster family, thanks to our reintegration program. She's doing well in school and has found her voice.",
      beforeImg: "/assets/grace-before.jpg",
      afterImg: "/assets/grace-after.jpg",
      quote: "I feel safe and loved here."
    },
    {
      name: "David",
      age: "15",
      story: "David came to us malnourished and withdrawn. Today, he's a confident teenager excelling in his studies and helping younger children with their homework.",
      beforeImg: "/assets/david-before.jpg",
      afterImg: "/assets/david-after.jpg",
      quote: "Education is my path to a better future."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Muthoni",
      role: "Parent of Reunited Child",
      content: "Place of Grace helped my family get back on our feet. They didn't just care for my child, they helped us heal as a family.",
      image: "/assets/testimonial-1.jpg"
    },
    {
      name: "Dr. James Kamau",
      role: "Local School Principal",
      content: "The children from Place of Grace are some of our most dedicated students. Their transformation is remarkable to witness.",
      image: "/assets/testimonial-2.jpg"
    },
    {
      name: "Mary Wanjiku",
      role: "Volunteer",
      content: "I've been volunteering here for 5 years. Seeing children grow, heal, and thrive is the most rewarding experience.",
      image: "/assets/testimonial-3.jpg"
    }
  ];

  return (
    <div className="impact-page">
      <section className="hero-section">
        <div className="impact-hero-background">
          <div className="impact-hero-overlay"></div>
          <div className="impact-particles"></div>
          <div className="impact-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="impact-waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
          </div>
        </div>
        <div className="container">
          <h1>Our Impact & Transparency</h1>
          <p className="hero-subtitle">
            Every child has a story of transformation. Here are some of the lives we've touched and changed, along with our commitment to transparency and accountability.
          </p>
        </div>
      </section>

      <section className="impact-stats-section" ref={impactStatsRef}>
        <div className="container">
          <h2>Our Impact in Numbers</h2>
          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="counting-number">{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="transparency-stats-section" ref={transparencyStatsRef}>
        <div className="container">
          <h2>Transparency & Accountability</h2>
          <p className="section-description">
            We maintain the highest standards of integrity through comprehensive transparency measures and regular accountability practices.
          </p>
          <div className="stats-grid">
            {transparencyStats.map((stat, index) => (
              <div key={index} className="stat-item transparency-stat">
                <h3 className="counting-number">{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="financial-reports-section">
        <div className="container">
          <h2>Financial Reports</h2>
          <p className="section-description">
            Download our annual reports to see how your donations are being used to support vulnerable children.
          </p>
          
          <div className="reports-grid">
            {financialReports.map((report, index) => (
              <div key={index} className="report-card">
                <div className="report-header">
                  <h3>{report.title}</h3>
                  <span className="report-year">{report.year}</span>
                </div>
                <p>{report.description}</p>
                <div className="report-footer">
                  <span className="file-size">{report.fileSize}</span>
                  <a href={report.downloadUrl} className="download-link" download>
                    📄 Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="success-stories-section">
        <div className="container">
          <h2>Transformation Stories</h2>
          <p className="section-description">
            These are just a few of the many children whose lives have been transformed through love, care, and support.
          </p>
          
          {successStories.map((story, index) => (
            <div key={index} className="story-card">
              <div className="story-header">
                <h3>Meet {story.name}, Age {story.age}</h3>
                <p className="story-quote">"{story.quote}"</p>
              </div>
              
              <div className="story-content">
                <div className="story-text">
                  <p>{story.story}</p>
                </div>
                
                <div className="before-after">
                  <div className="before-image">
                    <h4>Before</h4>
                    <img src={story.beforeImg} alt={`${story.name} before`} />
                  </div>
                  <div className="after-image">
                    <h4>After</h4>
                    <img src={story.afterImg} alt={`${story.name} after`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>What People Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="accountability-section">
        <div className="container">
          <h2>Accountability Measures</h2>
          <div className="measures-grid">
            <div className="measure-card">
              <h3>Regular Audits</h3>
              <p>We undergo annual independent audits to ensure financial integrity and transparency.</p>
            </div>
            <div className="measure-card">
              <h3>Board Oversight</h3>
              <p>Our board of directors provides regular oversight and governance to ensure accountability.</p>
            </div>
            <div className="measure-card">
              <h3>Donor Reporting</h3>
              <p>We provide regular reports to donors on how their contributions are being used.</p>
            </div>
            <div className="measure-card">
              <h3>Public Disclosure</h3>
              <p>We maintain transparency by publicly sharing our financial reports and policies.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ImpactPage;
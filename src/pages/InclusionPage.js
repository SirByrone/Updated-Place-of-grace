import React from 'react';
import { Link } from 'react-router-dom';
import FadeInText from '../components/FadeInText';
import './InclusionPage.css';

const InclusionPage = () => {
  const adaptiveSolutions = [
    {
      title: "Tricycles for Mobility Challenges",
      description: "Specially designed tricycles provide stability and support for children with mobility impairments, allowing them to travel to school independently.",
      image: "/assets/inclusion/tricycle-child.jpg",
      features: ["Three-wheel stability", "Custom seating", "Hand controls", "Safety harness"]
    },
    {
      title: "Sighted Guides for Visual Impairments",
      description: "Trained guides accompany children with visual impairments, ensuring safe navigation and building confidence in independent travel.",
      image: "/assets/inclusion/sighted-guide.jpg",
      features: ["Trained companions", "Safe navigation", "Confidence building", "Community integration"]
    },
    {
      title: "Custom Seating Systems",
      description: "Adaptive seating solutions designed for children with specific physical needs, ensuring comfort and proper positioning.",
      image: "/assets/inclusion/custom-seating.jpg",
      features: ["Ergonomic design", "Adjustable supports", "Pressure relief", "Safety straps"]
    },
    {
      title: "Family Training Programs",
      description: "Comprehensive training for families on how to support their children's mobility and independence.",
      image: "/assets/inclusion/family-training.jpg",
      features: ["Maintenance skills", "Safety protocols", "Independence support", "Community awareness"]
    }
  ];

  const successStories = [
    {
      name: "James, 12 years old",
      disability: "Cerebral Palsy",
      story: "James used to miss school frequently due to mobility challenges. With his adaptive tricycle, he now attends regularly and has become more confident in his abilities.",
      image: "/assets/inclusion/james-story.jpg",
      quote: "Now I can go to school like my friends!"
    },
    {
      name: "Amina, 10 years old",
      disability: "Visual Impairment",
      story: "Amina's sighted guide, Sarah, has helped her navigate the journey to school safely. Together, they've built a strong partnership that extends beyond transportation.",
      image: "/assets/inclusion/amina-story.jpg",
      quote: "Sarah helps me see the world in a new way."
    },
    {
      name: "Peter, 14 years old",
      disability: "Spina Bifida",
      story: "Peter's custom seating system allows him to travel comfortably and safely. His family received training on maintenance and safety protocols.",
      image: "/assets/inclusion/peter-story.jpg",
      quote: "I feel like I can do anything now!"
    }
  ];

  const inclusionPrinciples = [
    {
      title: "Universal Design",
      description: "All our solutions are designed with universal accessibility in mind, ensuring they work for children with diverse abilities.",
      icon: "♿"
    },
    {
      title: "Community Integration",
      description: "We work closely with communities to ensure acceptance and support for children with disabilities.",
      icon: "🤝"
    },
    {
      title: "Family Empowerment",
      description: "Families are trained and supported to become advocates for their children's independence and education.",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Continuous Support",
      description: "Our relationship with beneficiaries doesn't end with equipment provision - we provide ongoing support and maintenance.",
      icon: "🔄"
    }
  ];

  return (
    <div className="inclusion-page page-content">
      <div className="container">
        {/* Hero Section */}
        <section className="inclusion-hero">
          <div className="inclusion-hero-background">
            <div className="inclusion-hero-overlay"></div>
            <div className="inclusion-particles"></div>
            <div className="inclusion-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <div className="inclusion-symbols">
              <div className="symbol symbol-1">♿</div>
              <div className="symbol symbol-2">🤝</div>
              <div className="symbol symbol-3">🌟</div>
              <div className="symbol symbol-4">💙</div>
            </div>
          </div>
          <FadeInText direction="up" delay={0} duration={1200} className="hero-title">
            <h1>Inclusion Matters</h1>
          </FadeInText>
          <FadeInText direction="up" delay={200} duration={1000} className="hero-subtitle">
            <p>
              Every child deserves dignified access to education, regardless of their abilities. 
              We believe that disability should never be a barrier to learning and growth.
            </p>
          </FadeInText>
        </section>

        {/* Why Inclusion Matters */}
        <section className="why-inclusion">
          <h2>Why Inclusive Access Matters</h2>
          <div className="inclusion-reasons">
            <div className="reason-card">
              <h3>Equal Opportunities</h3>
              <p>
                Children with disabilities face unique challenges in accessing education. 
                Long walks to school can be particularly difficult, leading to absenteeism 
                and missed learning opportunities.
              </p>
            </div>
            <div className="reason-card">
              <h3>Dignity and Independence</h3>
              <p>
                Adaptive mobility solutions restore dignity and promote independence. 
                Children can arrive at school with confidence, ready to learn and participate fully.
              </p>
            </div>
            <div className="reason-card">
              <h3>Community Transformation</h3>
              <p>
                When we include children with disabilities, we transform entire communities. 
                Attitudes change, barriers break down, and everyone benefits from a more inclusive society.
              </p>
            </div>
          </div>
        </section>

        {/* Adaptive Solutions */}
        <section className="adaptive-solutions">
          <h2>Our Adaptive Solutions</h2>
          <p className="section-intro">
            We provide a range of adaptive mobility solutions designed to meet the specific 
            needs of children with different disabilities.
          </p>
          <div className="solutions-grid">
            {adaptiveSolutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-image">
                  <img src={solution.image} alt={solution.title} />
                </div>
                <div className="solution-content">
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <div className="solution-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="success-stories">
          <h2>Stories of Transformation</h2>
          <p className="section-intro">
            Meet some of the children whose lives have been transformed through our inclusive programs.
          </p>
          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-image">
                  <img src={story.image} alt={story.name} />
                </div>
                <div className="story-content">
                  <h3>{story.name}</h3>
                  <p className="disability-type">{story.disability}</p>
                  <p className="story-text">{story.story}</p>
                  <blockquote className="story-quote">
                    "{story.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusion Principles */}
        <section className="inclusion-principles">
          <h2>Our Inclusion Principles</h2>
          <div className="principles-grid">
            {inclusionPrinciples.map((principle, index) => (
              <div key={index} className="principle-card">
                <div className="principle-icon">{principle.icon}</div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Training */}
        <section className="community-training">
          <div className="training-content">
            <div className="training-text">
              <h2>Building Inclusive Communities</h2>
              <p>
                We don't just provide adaptive solutions - we work to transform communities 
                to be more inclusive and supportive of children with disabilities.
              </p>
              <div className="training-highlights">
                <div className="highlight-item">
                  <h4>Community Awareness</h4>
                  <p>Educational programs to change attitudes and break down barriers</p>
                </div>
                <div className="highlight-item">
                  <h4>School Integration</h4>
                  <p>Working with schools to create welcoming environments for all children</p>
                </div>
                <div className="highlight-item">
                  <h4>Peer Support</h4>
                  <p>Encouraging friendships and support networks among children</p>
                </div>
              </div>
            </div>
            <div className="training-image">
              <div className="training-placeholder">
                <span>🏫</span>
                <p>Community Training</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="inclusion-stats">
          <h2>Our Inclusive Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>25+</h3>
              <p>Children with Disabilities Served</p>
            </div>
            <div className="stat-card">
              <h3>8</h3>
              <p>Schools with Inclusive Programs</p>
            </div>
            <div className="stat-card">
              <h3>15</h3>
              <p>Adaptive Solutions Provided</p>
            </div>
            <div className="stat-card">
              <h3>100%</h3>
              <p>Attendance Improvement</p>
            </div>
          </div>
        </section>

        {/* How to Support */}
        <section className="support-inclusion">
          <h2>How You Can Support Inclusive Access</h2>
          <div className="support-options">
            <div className="support-option">
              <h3>Donate for Adaptive Equipment</h3>
              <p>
                Your donation can provide tricycles, custom seating, and other adaptive 
                solutions for children with disabilities.
              </p>
              <Link to="/get-involved" className="support-button">
                Donate Now
              </Link>
            </div>
            <div className="support-option">
              <h3>Volunteer Your Skills</h3>
              <p>
                Share your expertise in mechanics, therapy, or community development 
                to help us serve more children with disabilities.
              </p>
              <Link to="/contact" className="support-button">
                Get Involved
              </Link>
            </div>
            <div className="support-option">
              <h3>Spread Awareness</h3>
              <p>
                Help us raise awareness about the importance of inclusive education 
                and mobility access for children with disabilities.
              </p>
              <Link to="/contact" className="support-button">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="inclusion-cta">
          <h2>Join Us in Creating an Inclusive World</h2>
          <p>
            Every child, regardless of their abilities, deserves the opportunity to learn, 
            grow, and thrive. Your support makes inclusive education possible.
          </p>
          <div className="cta-buttons">
            <Link to="/get-involved" className="cta-button primary">
              Support Inclusive Access
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InclusionPage; 
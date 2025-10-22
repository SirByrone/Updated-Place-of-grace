import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQPage.css';

const FAQPage = () => {
  const [openCategory, setOpenCategory] = useState('general');

  const faqData = {
    general: [
      {
        question: "What is Place of Grace Children's Home?",
        answer: "Place of Grace Children's Home is a non-profit institution caring for Orphaned and Vulnerable Children (OVC). Founded in 2009 by the late Peninah Maria Kioko, we provide a safe haven for children who have been abandoned, neglected, or orphaned."
      },
      {
        question: "Where is Place of Grace Children's Home located?",
        answer: "We are located at Donholm Phase 8, Nairobi, Kenya. We moved from our original location in Soweto slum to provide better facilities for our children."
      },
      {
        question: "How many children do you currently care for?",
        answer: "We currently care for 25 children aged between 1 and 18 years from diverse backgrounds, providing physical, educational, and spiritual nurturing."
      },
      {
        question: "Is Place of Grace legally registered?",
        answer: "Yes, we are a registered children's home under Kenyan law, adhering to all required child protection standards and regulations."
      }
    ],
    admissions: [
      {
        question: "How do children get admitted to Place of Grace?",
        answer: "We accept children through referrals from government agencies, community leaders, and well-wishers. Each case is carefully assessed to ensure we can provide the appropriate care and support."
      },
      {
        question: "What criteria do you use for admissions?",
        answer: "We prioritize children who are orphaned, abandoned, or in situations where their safety and well-being are at risk. Each case is evaluated individually based on the child's specific needs and circumstances."
      },
      {
        question: "Do you accept children with special needs?",
        answer: "Yes, we are committed to inclusive care and accept children with various special needs. We work with healthcare professionals to ensure they receive appropriate care and support."
      },
      {
        question: "How long do children typically stay at Place of Grace?",
        answer: "The length of stay varies depending on each child's situation. Some children stay with us until they reach adulthood, while others are successfully reunited with their families when it's safe and appropriate."
      }
    ],
    volunteering: [
      {
        question: "Can I visit the home?",
        answer: "Yes! Visitors are welcome, but we request prior scheduling to ensure minimal disruption to the children's daily routine and to maintain their safety and privacy."
      },
      {
        question: "What volunteer opportunities are available?",
        answer: "We welcome volunteers in various capacities including tutoring, mentoring, medical support, activity coordination, and maintenance work. We also need volunteers for special events and fundraising activities."
      },
      {
        question: "Do I need any special qualifications to volunteer?",
        answer: "While some roles may require specific skills or qualifications, we welcome volunteers from all backgrounds. The most important qualification is a genuine desire to help children and a commitment to our values."
      },
      {
        question: "How can I apply to volunteer?",
        answer: "You can contact us through our website, phone, or email to express your interest in volunteering. We'll arrange a meeting to discuss opportunities and complete the necessary paperwork."
      }
    ],
    donations: [
      {
        question: "How can I be sure my donation is used properly?",
        answer: "We maintain full transparency and publish financial reports annually. We also welcome donors to visit and see our programs in action. All donations are used directly for the care and support of our children."
      },
      {
        question: "What types of donations do you accept?",
        answer: "We accept monetary donations, in-kind donations (food, clothes, school supplies, etc.), and volunteer time. We also welcome corporate partnerships and sponsorships."
      },
      {
        question: "Can I sponsor a specific child?",
        answer: "Yes, we offer child sponsorship programs. However, we maintain the privacy and dignity of our children, so sponsorship is typically anonymous to protect their well-being."
      },
      {
        question: "Are donations tax-deductible?",
        answer: "We are working on obtaining tax-exempt status. Please contact us for the most current information about tax benefits for donations."
      }
    ],
    programs: [
      {
        question: "What educational support do you provide?",
        answer: "We provide school sponsorships, learning materials, tuition support, extra tutoring, and mentorship. We also offer computer literacy programs and life skills training."
      },
      {
        question: "Do you provide healthcare for the children?",
        answer: "Yes, we provide regular health check-ups, immunizations, emergency medical care, and access to healthcare professionals. We also ensure children receive nutritious meals daily."
      },
      {
        question: "What happens when children reach adulthood?",
        answer: "We provide vocational training, life skills development, and job placement support to help older children transition successfully into adulthood and independent living."
      },
      {
        question: "Do you work with families for reunification?",
        answer: "Yes, when safe and appropriate, we work to reunite children with their families. This includes family tracing, counseling, and support to ensure successful reintegration."
      }
    ]
  };

  const categories = [
    { id: 'general', name: 'General Information' },
    { id: 'admissions', name: 'Admissions & Eligibility' },
    { id: 'volunteering', name: 'Volunteering' },
    { id: 'donations', name: 'Donations & Support' },
    { id: 'programs', name: 'Programs & Services' }
  ];

  return (
    <div className="faq-page">
      <section className="hero-section">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="hero-subtitle">
            Find answers to common questions about Place of Grace Children's Home
          </p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="faq-navigation">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${openCategory === category.id ? 'active' : ''}`}
                onClick={() => setOpenCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {faqData[openCategory].map((faq, index) => (
              <div key={index} className="faq-item">
                <details>
                  <summary>
                    <h3>{faq.question}</h3>
                    <span className="expand-icon">+</span>
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Still Have Questions?</h2>
          <p>
            If you couldn't find the answer you're looking for, please don't hesitate to contact us. 
            We're here to help and would love to hear from you.
          </p>
          <div className="contact-options">
            <div className="contact-option">
              <h3>Call Us</h3>
              <p><a href="tel:+254722860321" className="contact-link phone-link">+254 722 860 321</a></p>
            </div>
            <div className="contact-option">
              <h3>Email Us</h3>
              <p><a href="mailto:placeofgraceoutreach@gmail.com" className="contact-link email-link">placeofgraceoutreach@gmail.com</a></p>
            </div>
            <div className="contact-option">
              <h3>Visit Us</h3>
              <p>DONHOLM PHASE FIVE POLICELINE ROAD</p>
            </div>
          </div>
          <Link to="/contact" className="contact-btn">Send us a Message</Link>
        </div>
      </section>
    </div>
  );
};

export default FAQPage; 
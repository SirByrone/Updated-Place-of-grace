import React from 'react';
import { Link } from 'react-router-dom';
import './TransparencyPage.css';

const TransparencyPage = () => {
  const financialReports = [
    {
      year: "2024",
      title: "Annual Financial Report 2024",
      description: "Comprehensive financial statements and audit report for the fiscal year 2024.",
      fileSize: "2.3 MB",
      downloadUrl: null,
      status: "Coming Soon"
    },
    {
      year: "2023",
      title: "Annual Financial Report 2023",
      description: "Financial statements and audit report for the fiscal year 2023.",
      fileSize: "1.8 MB",
      downloadUrl: null,
      status: "Coming Soon"
    },
    {
      year: "2022",
      title: "Annual Financial Report 2022",
      description: "Financial statements and audit report for the fiscal year 2022.",
      fileSize: "2.1 MB",
      downloadUrl: null,
      status: "Coming Soon"
    }
  ];

  const policies = [
    {
      title: "Child Protection Policy",
      description: "Our comprehensive policy ensuring the safety, protection, and well-being of all children in our care.",
      lastUpdated: "January 2024",
      downloadUrl: null,
      status: "Coming Soon"
    },
    {
      title: "Safeguarding Policy",
      description: "Guidelines and procedures for protecting children from harm and abuse.",
      lastUpdated: "January 2024",
      downloadUrl: null,
      status: "Coming Soon"
    },
    {
      title: "Financial Management Policy",
      description: "Our policies and procedures for financial management and accountability.",
      lastUpdated: "March 2024",
      downloadUrl: null,
      status: "Coming Soon"
    }
  ];

  const governance = [
    {
      name: "Board of Directors",
      description: "Our governing body responsible for strategic oversight and ensuring organizational effectiveness.",
      members: [
        "Chairperson - [Name]",
        "Vice Chairperson - [Name]",
        "Treasurer - [Name]",
        "Secretary - [Name]",
        "Member - [Name]"
      ]
    },
    {
      name: "Management Team",
      description: "Our executive team responsible for day-to-day operations and program implementation.",
      members: [
        "Executive Director - [Name]",
        "Program Manager - [Name]",
        "Finance Manager - [Name]",
        "Childcare Coordinator - [Name]"
      ]
    }
  ];

  const accountabilityMeasures = [
    {
      title: "Regular Audits",
      description: "We undergo annual independent audits to ensure financial integrity and transparency."
    },
    {
      title: "Board Oversight",
      description: "Our board of directors provides regular oversight and governance to ensure accountability."
    },
    {
      title: "Donor Reporting",
      description: "We provide regular reports to donors on how their contributions are being used."
    },
    {
      title: "Public Disclosure",
      description: "We maintain transparency by publicly sharing our financial reports and policies."
    }
  ];

  return (
    <div className="transparency-page">
      <section className="hero-section">
        <div className="container">
          <h1>Transparency & Accountability</h1>
          <p className="hero-subtitle">
            We are committed to financial integrity, child protection, and full transparency in all our operations.
          </p>
        </div>
      </section>

      <section className="commitment-section">
        <div className="container">
          <div className="commitment-content">
            <h2>Our Commitment to Transparency</h2>
            <p>
              At Place of Grace Children's Home, we believe that transparency and accountability are fundamental 
              to building trust with our donors, partners, and the communities we serve. We are committed to 
              maintaining the highest standards of integrity in all our operations.
            </p>
          </div>
        </div>
      </section>

      <section className="financial-reports-section">
        <div className="container">
          <h2>Financial Reports</h2>
          <p className="section-description">
            We maintain full transparency in our financial operations. Download our annual reports to see how 
            your donations are being used to support vulnerable children.
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
                  {report.downloadUrl ? (
                    <a href={report.downloadUrl} className="download-link" download>
                      Download PDF
                    </a>
                  ) : (
                    <span className="status-badge">{report.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="policies-section">
        <div className="container">
          <h2>Policies & Procedures</h2>
          <p className="section-description">
            Our policies ensure the safety, protection, and well-being of all children in our care, 
            as well as the integrity of our operations.
          </p>
          
          <div className="policies-grid">
            {policies.map((policy, index) => (
              <div key={index} className="policy-card">
                <h3>{policy.title}</h3>
                <p>{policy.description}</p>
                <div className="policy-footer">
                  <span className="last-updated">Last updated: {policy.lastUpdated}</span>
                  {policy.downloadUrl ? (
                    <a href={policy.downloadUrl} className="download-link" download>
                      View Policy
                    </a>
                  ) : (
                    <span className="status-badge">{policy.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="governance-section">
        <div className="container">
          <h2>Governance</h2>
          <p className="section-description">
            Our organization is governed by a dedicated board of directors and managed by experienced professionals 
            committed to our mission.
          </p>
          
          <div className="governance-grid">
            {governance.map((group, index) => (
              <div key={index} className="governance-card">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <ul className="members-list">
                  {group.members.map((member, memberIndex) => (
                    <li key={memberIndex}>{member}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="accountability-section">
        <div className="container">
          <h2>Accountability Measures</h2>
          <div className="measures-grid">
            {accountabilityMeasures.map((measure, index) => (
              <div key={index} className="measure-card">
                <h3>{measure.title}</h3>
                <p>{measure.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Questions About Our Transparency?</h2>
          <p>
            If you have any questions about our financial management, policies, or governance, 
            please don't hesitate to contact us. We're committed to being open and transparent.
          </p>
          <div className="contact-buttons">
            <Link to="/contact" className="contact-btn primary">Contact Us</Link>
            <Link to="/faq" className="contact-btn secondary">View FAQ</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransparencyPage; 
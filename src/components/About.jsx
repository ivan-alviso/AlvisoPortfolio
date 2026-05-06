import React from "react";

export default function About() {
  return (
    <div className="about-container">
      <p className="card-text">
        I am Ivan Alviso, a developer focused on building intelligent systems,
        interactive web applications, and visual digital experiences.
      </p>
      
      <div className="about-details tech-pulse">
        <div className="detail-item">
          <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Maco, Davao de Oro</span>
        </div>
        <div className="detail-item">
          <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
          </svg>
          <span>UM Tagum College</span>
        </div>
        
        {/* Techy animated elements instead of scan line */}
        <div className="tech-grid"></div>
        <div className="tech-dot dot-1"></div>
        <div className="tech-dot dot-2"></div>
        <div className="tech-dot dot-3"></div>
        <div className="tech-corner corner-tl"></div>
        <div className="tech-corner corner-tr"></div>
        <div className="tech-corner corner-bl"></div>
        <div className="tech-corner corner-br"></div>
      </div>
      
      <p className="about-specialization">
        Specializing in: Full-stack development, machine learning, and UI/UX design.
      </p>
    </div>
  );
}
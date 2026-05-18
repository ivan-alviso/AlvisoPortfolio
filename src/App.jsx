import React, { useState, useRef } from "react";
import InteractiveBackground from "./components/InteractiveBackground";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import SignalGenerator from "./components/SignalGenerator";
import Footer from "./components/Footer";


export default function App() {
  const [contactState, setContactState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const activeScramble = useRef({});

  const [titles, setTitles] = useState({
    about: "ABOUT",
    skills: "SKILLS",
    projects: "PROJECTS",
    contact: "CONTACT"
  });

  const handleScramble = (key) => {
    if (activeScramble.current[key]) return;

    activeScramble.current[key] = true;

    const original = titles[key];

    scrambleText(original, (newText) => {
      setTitles((prev) => ({
        ...prev,
        [key]: newText
      }));
    }).finally(() => {
      activeScramble.current[key] = false;
    });
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactState((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contact from ${contactState.name}`);
    const body = encodeURIComponent(
      `Name: ${contactState.name}\nEmail: ${contactState.email}\n\n${contactState.message}`
    );
    window.location.href = `mailto:ivanalviso@outlook.com?subject=${subject}&body=${body}`;
    setSubmitStatus("Opening your email client...");
  };

  const [activeSkill, setActiveSkill] = useState({
    level: 0,
    name: null
  });

  const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const scrambleText = async (text, setText) => {
    let iterations = 0;

    const intervalTime = 20;
    const duration = 300; // total effect duration

    const steps = Math.floor(duration / intervalTime);

    for (let i = 0; i < steps; i++) {
      let scrambled = text
        .split("")
        .map((char, index) => {
          if (index < iterations) return text[index];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      setText(scrambled);

      iterations += text.length / steps;

      await sleep(intervalTime);
    }

    // HARD RESET (prevents stuck scrambled state)
    setText(text);
  };

  return (
    <>
      <InteractiveBackground />
      <div className="bento-container">
        {/* Hero Card */}
        <div className="bento-card hero-card">
          <div className="card-content">
            <h1 className="hero-title">IVAN//SYS</h1>
            <p className="card-text">
              SYSTEM ONLINE<br />
              Full-Stack Developer | AI Enthusiast | Creative Technologist
            </p>
          </div>
        </div>

        {/* About Card */}
        <div className="bento-card about-card">
          <div className="card-title-bar">
            <h2
              className="card-title"
              onMouseEnter={() => handleScramble("about")}
            >
              {titles.about}
            </h2>
          </div>
          <div className="card-content">
            <About />
          </div>
        </div>

        {/* Skills Card */}
        <div className="bento-card skills-card">
          <div className="card-title-bar">
            <h2
              className="card-title"
              onMouseEnter={() => handleScramble("skills")}
            >
              {titles.skills}
            </h2>
          </div>

          {/* ✅ HUD NOW OUTSIDE SCROLL AREA */}
          <div className="hud-wrapper">
            <span className="hud-label">
              Experience Level:
            </span>

            <div className="hud-bar-track">
              <div
                className="hud-bar-fill"
                style={{ width: `${activeSkill.level}%` }}
              />
            </div>
          </div>

          {/* scroll area ONLY for skills */}
          <div className="card-content skills-scroll-area">
            <Skills onHoverSkill={(level, name) =>
              setActiveSkill({ level, name })
            } />
          </div>
        </div>

        <div className="right-column">
          {/* Projects Card */}
          <div className="bento-card projects-card">
            <div className="card-title-bar">
              <h2
                className="card-title"
                onMouseEnter={() => handleScramble("projects")}
              >
                {titles.projects}
              </h2>
            </div>
            <div className="card-content">
              <Projects />
            </div>
          </div>

          {/* Contact Card */}
          <div className="bento-card contact-card">
            <div className="card-title-bar">
              <h2
                className="card-title"
                onMouseEnter={() => handleScramble("contact")}
              >
                {titles.contact}
              </h2>
            </div>
            <div className="card-content contact-grid">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-left">
                  <SignalGenerator />
                  <label className="field-row">
                    <span className="field-label">Name:</span>
                    <input
                      type="text"
                      name="name"
                      value={contactState.name}
                      onChange={handleContactChange}
                      placeholder="Your Name"
                      required
                    />
                  </label>
                  <label className="field-row">
                    <span className="field-label">Email:</span>
                    <input
                      type="email"
                      name="email"
                      value={contactState.email}
                      onChange={handleContactChange}
                      placeholder="Your Email"
                      required
                    />
                  </label>
                  <div className="about-links">
                    <a href="mailto:ivanalviso@outlook.com" aria-label="Email">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 17.5v-11zM4.8 6.7l7.2 5.05 7.2-5.05H4.8zm0 2.1V17.5h14.4V8.8l-7.2 5.05-7.2-5.05z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ivan-alviso-958975157/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4.98 3.5a2.25 2.25 0 11-.001 4.5A2.25 2.25 0 014.98 3.5zM3 8.75h3.96V21H3V8.75zm7.5 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.08V21h-3.96v-5.6c0-1.34-.03-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.97V21H10.5V8.75z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/ivan-alviso"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.114 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.36.2 2.37.1 2.62.64.69 1.03 1.58 1.03 2.67 0 3.85-2.34 4.7-4.56 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="contact-right">
                  <span className="message-label">Write a Message</span>
                  <textarea
                    name="message"
                    className="contact-textarea"
                    value={contactState.message}
                    onChange={handleContactChange}
                    placeholder="Write your message..."
                    required
                  />
                  <button type="submit">Send Message</button>
                  {submitStatus && <div className="contact-status">{submitStatus}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

import React from "react";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="logo">IVAN//SYS</h1>

      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="https://www.linkedin.com/in/ivan-cutler-958975157" target="_blank">
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
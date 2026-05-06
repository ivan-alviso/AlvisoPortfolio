import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-ui top-left">SYSTEM ONLINE</div>
      <div className="hero-ui top-right">JARVIS MODE</div>

      <div className="hero-content">
        <h1>IVAN ALVISO</h1>
        <p>Software Developer • Web Developer • Graphic Artist</p>
      </div>

      <div className="spline-container">
        <spline-viewer url="https://prod.spline.design/ItH1WtER8-db59lL/scene.splinecode"></spline-viewer>
      </div>

      <div className="hero-ui bottom-left">STATUS: ACTIVE</div>
      <div className="hero-ui bottom-right">v1.0.0</div>
    </section>
  );
}
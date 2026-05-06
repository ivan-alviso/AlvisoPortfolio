import React from "react";

export default function HUDPanel({ title, isExpanded, onToggle, children }) {
  return (
    <div className={`hud-panel ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="hud-frame">
        
        <div className="hud-corner tl" />
        <div className="hud-corner tr" />
        <div className="hud-corner bl" />
        <div className="hud-corner br" />

        <div className="panel-header" onClick={onToggle}>
          <span className="panel-title">{title}</span>
          <button className="toggle-btn">
            {isExpanded ? "−" : "+"}
          </button>
        </div>

        <div className={`panel-content ${isExpanded ? "open" : ""}`}>
          {children}
        </div>

      </div>
    </div>
  );
}
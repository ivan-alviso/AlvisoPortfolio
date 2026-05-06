import React, { useState, useEffect } from "react";

const words = [
  "SCANNING", "0xFA1B", "0x00FF", "SYS_NODE", "ROUTING...",
  "TCP/IP", "PROXY", "UPLINK", "PORT 8080", "192.168.1.1",
  "0x8A7C", "PING...", "LATENCY", "BANDWIDTH", "HANDSHAKE",
  "DECRYPTING", "ENCRYPT", "ACCESS", "DENIED", "OVERRIDE"
];

export default function SignalGenerator() {
  const [text, setText] = useState("INITIALIZING...");
  const [signalFound, setSignalFound] = useState(false);
  const [bars, setBars] = useState([20, 40, 60, 80, 50]);

  useEffect(() => {
    let interval;
    if (!signalFound) {
      interval = setInterval(() => {
        if (Math.random() > 0.95) {
          setSignalFound(true);
          setText("SIGNAL FOUND.");
          setBars([100, 100, 100, 100, 100]);
        } else {
          setText(words[Math.floor(Math.random() * words.length)]);
          setBars(bars.map(() => Math.random() * 100));
        }
      }, 70);
    } else {
      interval = setTimeout(() => {
        setSignalFound(false);
      }, 2500);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(interval);
    };
  }, [signalFound]);

  return (
    <div className={`signal-generator ${signalFound ? "found" : ""}`}>
      <div className="signal-display">
        <div className="signal-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6V4C14 2.9 13.1 2 12 2ZM6.34 6.34L4.93 4.93C3.12 6.74 2 9.24 2 12C2 14.76 3.12 17.26 4.93 19.07L6.34 17.66C4.89 16.22 4 14.22 4 12C4 9.78 4.89 7.78 6.34 6.34ZM17.66 6.34C19.11 7.78 20 9.78 20 12C20 14.22 19.11 16.22 17.66 17.66L19.07 19.07C20.88 17.26 22 14.76 22 12C22 9.24 20.88 6.74 19.07 4.93L17.66 6.34ZM9.17 9.17L7.76 7.76C6.67 8.85 6 10.35 6 12C6 13.65 6.67 15.15 7.76 16.24L9.17 14.83C8.44 14.1 8 13.1 8 12C8 10.9 8.44 9.9 9.17 9.17ZM14.83 9.17C15.56 9.9 16 10.9 16 12C16 13.1 15.56 14.1 14.83 14.83L16.24 16.24C17.33 15.15 18 13.65 18 12C18 10.35 17.33 8.85 16.24 7.76L14.83 9.17Z" />
          </svg>
        </div>
        <div className="signal-text">{text}</div>
      </div>
      <div className="signal-bars">
        {bars.map((h, i) => (
          <div key={i} className="bar" style={{ height: `${Math.max(10, h)}%` }}></div>
        ))}
      </div>
    </div>
  );
}

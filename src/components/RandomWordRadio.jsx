import React, { useEffect, useState } from "react";

const WORDS = [
  "CONNECTING", "SIGNAL...", "ENCRYPTING", "LOCATING", "SYNCHRONIZING", "SCANNING", "AUTHORIZING", "PINGING", "DECRYPTING", "CALIBRATING", "SEARCHING", "LINKING", "DECODING", "UPLINK", "DOWNLINK", "HANDSHAKE", "BROADCAST", "RECEIVING", "TRANSMITTING", "ANALYZING", "RETRYING"
];

export default function RandomWordRadio() {
  const [word, setWord] = useState(WORDS[0]);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
      setTimeout(() => setFlicker(false), 120);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`radio-word${flicker ? " flicker" : ""}`}>{word}</div>
  );
}

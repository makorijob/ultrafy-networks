"use client";

import { useMemo } from "react";

// Nodes placed around the globe's surface using simple polar math so they
// look distributed in 3D space as the globe rotates (translateZ gives depth).
const NODES = [
  { rot: 0, tilt: 20, color: "#12A454" },
  { rot: 45, tilt: -15, color: "#1D5FD6" },
  { rot: 90, tilt: 30, color: "#E23E3E" },
  { rot: 135, tilt: -25, color: "#1D5FD6" },
  { rot: 180, tilt: 10, color: "#12A454" },
  { rot: 225, tilt: -10, color: "#1D5FD6" },
  { rot: 270, tilt: 25, color: "#12A454" },
  { rot: 315, tilt: -30, color: "#E23E3E" },
];

export default function HeroBackground() {
  // Randomized once per mount so particles don't feel mechanical, but stay
  // stable across re-renders (no layout thrash on state changes elsewhere).
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: Math.round(Math.random() * 100),
        size: 2 + Math.round(Math.random() * 3),
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 10,
        color: i % 3 === 0 ? "#E23E3E" : i % 3 === 1 ? "#12A454" : "#1D5FD6",
      })),
    []
  );

  const fibers = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        top: 12 + i * 18,
        duration: 4.5 + i * 0.8,
        delay: i * 1.1,
        alt: i % 2 === 1,
      })),
    []
  );

  return (
    <div className="hero-scene">
      {/* Fiber-optic light pulses */}
      {fibers.map((f, i) => (
        <span
          key={i}
          className={`hero-fiber-line ${f.alt ? "alt" : ""}`}
          style={{ top: `${f.top}%`, animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}
        />
      ))}

      {/* Rotating wireframe globe */}
      <div className="hero-globe-wrap">
        <div className="hero-globe-glow" />
        <div className="hero-globe-core">
          <div className="hero-globe-ring" style={{ transform: "rotateX(90deg)" }} />
          <div className="hero-globe-ring r-green" style={{ transform: "rotateY(60deg)" }} />
          <div className="hero-globe-ring r-red" style={{ transform: "rotateY(120deg)" }} />
          <div className="hero-globe-ring" style={{ transform: "rotateY(0deg)" }} />

          {NODES.map((n, i) => (
            <span
              key={i}
              className="hero-node"
              style={{
                color: n.color,
                background: n.color,
                top: "50%",
                left: "50%",
                animationDelay: `${i * 0.3}s`,
                transform: `rotateY(${n.rot}deg) rotateX(${n.tilt}deg) translateZ(310px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating data particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="hero-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px 1px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

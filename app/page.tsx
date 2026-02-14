"use client";

import { useMemo, useState } from "react";

type Position = {
  x: number;
  y: number;
};

const DODGE_DISTANCE = 120;

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<Position>({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);

  const hearts = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const left = ((i * 67) % 100) + 1;
      const delay = (i % 7) * 0.8;
      const duration = 6 + (i % 5);
      return { left, delay, duration, size: 14 + (i % 4) * 7 };
    });
  }, []);

  const dodge = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = DODGE_DISTANCE + Math.random() * 50;
    const nextX = Math.cos(angle) * distance;
    const nextY = Math.sin(angle) * distance;

    setNoPosition({ x: nextX, y: nextY });
    setNoScale(0.9 + Math.random() * 0.25);
  };

  return (
    <main className="page">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart, idx) => (
          <span
            key={idx}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      <section className="card">
        {!accepted ? (
          <>
            <p className="eyebrow">for Oanh only</p>
            <h1>Will you be my Valentine, Oanh? 💌</h1>
            <p className="subtitle">
              I have something sweet planned... say yes and I will tell you.
            </p>

            <div className="actions" onMouseLeave={() => setNoPosition({ x: 0, y: 0 })}>
              <button className="yesBtn" type="button" onClick={() => setAccepted(true)}>
                Yes 💖
              </button>

              <button
                className="noBtn"
                type="button"
                onMouseEnter={dodge}
                onMouseMove={dodge}
                onTouchStart={dodge}
                onClick={dodge}
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
                }}
                aria-label="No (you probably cannot catch this button)"
              >
                No 🙈
              </button>
            </div>
          </>
        ) : (
          <div className="messageWrap">
            <h2>Yay, my love! 💕</h2>
            <p>
              We are going out for dinner tomorrow, <strong>February 14th</strong>, at
              <strong> Top of The V</strong> at <strong>5:30 PM</strong>.
            </p>
            <p>
              Be ready, beautiful. I cannot wait to spend a romantic evening with you.
            </p>
            <p className="signature">- Your Valentine 💘</p>
          </div>
        )}
      </section>
    </main>
  );
}


import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const particles = Array.from({ length: 75 }, (_, index) => ({
  angle: index * 137.5,
  distance: 130 + (index % 7) * 48,
  delay: (index % 12) * 0.025,
}));

export default function CelebrationShine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let wasInside = false;
    let timeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasInside) {
          wasInside = true;
          setCelebrating(true);

          clearTimeout(timeout);
          timeout = setTimeout(() => {
            setCelebrating(false);
          }, 2800);
        }

        if (!entry.isIntersecting) {
          wasInside = false;
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`celebration-shine ${celebrating ? "is-celebrating" : ""}`}
      aria-hidden="true"
    >
      <div className="celebration-center">
        {particles.map((particle, index) => (
          <i
            key={index}
            style={
              {
                "--angle": `${particle.angle}deg`,
                "--distance": `${particle.distance}px`,
                "--delay": `${particle.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef } from "react";

export function StarField({ density = 160 }: { density?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.4,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    [density],
  );

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(0, ${window.scrollY * -0.15}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: s.size > 1.5 ? "0 0 6px rgba(255,255,255,0.8)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
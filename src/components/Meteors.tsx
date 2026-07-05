export function Meteors({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[120px] rounded-full"
          style={{
            top: `${Math.random() * 60}%`,
            left: `${60 + Math.random() * 40}%`,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.9), transparent)",
            animation: `meteor ${4 + Math.random() * 6}s linear ${Math.random() * 10}s infinite`,
            transform: "rotate(215deg)",
          }}
        />
      ))}
    </div>
  );
}
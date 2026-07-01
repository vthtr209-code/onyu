const palettes: Record<string, [string, string]> = {
  "burnout-1": ["#c9a27a", "#3f342a"],
  "career-1": ["#a8b4a0", "#2f3b32"],
  "sleep-1": ["#8f9bb0", "#232a38"],
  "leadership-1": ["#c7a95c", "#3a2f1c"],
  "energy-1": ["#d59a6a", "#4a2c1c"],
  "workplace-1": ["#b7a08f", "#33291f"],
  "healing-1": ["#b7c4b2", "#26332a"],
};

export function CoverImage({
  id,
  className,
  label,
}: {
  id: string;
  className?: string;
  label?: string;
}) {
  const [from, to] = palettes[id] ?? ["#c9a27a", "#3f342a"];
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
      role="img"
      aria-label={label ?? "Article cover"}
    >
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
    </div>
  );
}

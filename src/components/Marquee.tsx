export function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  // The list is duplicated so the -50% translate loops seamlessly.
  const run = [...items, ...items];

  return (
    <div aria-hidden="true" className={`edge-fade overflow-hidden ${className}`}>
      <div
        className="flex w-max whitespace-nowrap will-change-transform"
        style={{ animation: reverse ? "var(--animate-marquee-rev)" : "var(--animate-marquee)" }}
      >
        {run.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="display px-6 text-5xl text-text/12 md:text-7xl">{item}</span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent/35" />
          </span>
        ))}
      </div>
    </div>
  );
}

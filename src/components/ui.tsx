export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-white text-black border border-white/80">
      {children}
    </span>
  );
}

export function formatDate(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
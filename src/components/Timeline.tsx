"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TimelineItem } from "@/data/timeline";

function formatDate(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, (m ?? 1) - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function sortNewestFirst(a: TimelineItem, b: TimelineItem) {
  const ax = a.startDate;
  const bx = b.startDate;
  if (ax !== bx) return ax < bx ? 1 : -1;
  const ae = a.endDate ?? "9999-12";
  const be = b.endDate ?? "9999-12";
  return ae < be ? 1 : -1;
}

function matchesSearch(it: TimelineItem, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;

  const hay = [
    it.title,
    it.org ?? "",
    it.summary,
    ...(it.highlights ?? []),
    ...(it.tech ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return hay.includes(s);
}

function hasAllSelectedTech(it: TimelineItem, selectedTechs: Set<string>) {
  if (selectedTechs.size === 0) return true;

  const keys = it.filterTech?.length ? it.filterTech : it.tech;

  for (const t of selectedTechs) {
    if (!keys.includes(t)) return false;
  }
  return true;
}

function getLink(it: TimelineItem, label: string) {
  return it.links?.find((l) => l.label.toLowerCase() === label.toLowerCase());
}

function TechChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-full border transition ${
        selected
          ? "bg-white text-black border-white"
          : "bg-transparent text-white/80 border-white/25 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  // For tech stack pills inside cards (always white bg -> black text)
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-white text-black border border-white/80">
      {children}
    </span>
  );
}

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-black text-sm hover:bg-white/90"
    >
      {children}
    </a>
  );
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const allTech = useMemo(() => {
    const s = new Set<string>();
    items.forEach((it) => {
      const keys = it.filterTech?.length ? it.filterTech : it.tech; // fallback
      keys.forEach((t) => s.add(t));
    });
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const [selectedType, setSelectedType] = useState< "job" | "project">(
    "job"
  );
  const [query, setQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());
  const [showAllTech, setShowAllTech] = useState(false);
  const MAX_VISIBLE_TECH = 12;
  const filtered = useMemo(() => {
    return items
      .filter((it) => it.type === selectedType)
      .filter((it) => matchesSearch(it, query))
      .filter((it) => hasAllSelectedTech(it, selectedTechs))
      .slice()
      .sort(sortNewestFirst);
  }, [items, selectedType, query, selectedTechs]);

  function toggleTech(t: string) {
    setSelectedTechs((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function clearTech() {
    setSelectedTechs(new Set());
  }

  return (
  <div className="w-full max-w-4xl mx-auto">
    {/* Top controls */}
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* Type filter */}
        <div className="flex gap-2">
          {(["job", "project"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-1.5 rounded-full border text-sm transition ${
                selectedType === t
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/80 border-white/40 hover:bg-white/10"
              }`}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, org, tech, summary..."
          className="w-full sm:w-[320px] px-3 py-2 rounded-md border border-white/25 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25"
        />
      </div>

      {/* Multi-tech filter chips (collapsed by default) */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-white/60 mr-1">Filter by tech:</span>

        {(() => {
          const orderedTech = [
            ...allTech.filter((t) => selectedTechs.has(t)),
            ...allTech.filter((t) => !selectedTechs.has(t)),
          ];

          const visibleTech = showAllTech
            ? orderedTech
            : orderedTech.slice(0, MAX_VISIBLE_TECH);

          return (
            <>
              {visibleTech.map((t) => (
                <TechChip
                  key={t}
                  label={t}
                  selected={selectedTechs.has(t)}
                  onClick={() => toggleTech(t)}
                />
              ))}

              {allTech.length > MAX_VISIBLE_TECH ? (
                <button
                  type="button"
                  onClick={() => setShowAllTech((v) => !v)}
                  className="text-sm underline text-white/70 hover:text-white"
                >
                  {showAllTech ? "Hide" : `View all (${allTech.length})`}
                </button>
              ) : null}

              {selectedTechs.size > 0 ? (
                <button
                  type="button"
                  onClick={clearTech}
                  className="ml-2 text-sm underline text-white/80 hover:text-white"
                >
                  Clear
                </button>
              ) : null}
            </>
          );
        })()}
      </div>
    </div>

    {/* Timeline */}

      {/* Timeline */}
      <ol className="relative border-l border-white/20 pl-12 space-y-8">
        {filtered.map((it) => {
          const demo = getLink(it, "Demo");
          const github = getLink(it, "GitHub");

          return (
            <li key={it.id} className="relative pl-2">
              <div className="absolute -left-[21px] top-2 h-4 w-4 rounded-full border border-white/30 bg-black" />

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xs uppercase tracking-wide text-white/60">
                    {it.type}
                  </span>

                  <Link
                    href={it.type === "job" ? `/job/${it.id}` : `/project/${it.id}`}
                    className="text-lg font-semibold underline decoration-white/20 hover:decoration-white/60"
                  >
                    {it.title}
                  </Link>

                  {it.org ? (
                    <span className="text-sm text-white/60">{it.org}</span>
                  ) : null}
                </div>

                <div className="text-sm text-white/55">
                  {formatDate(it.startDate)}{" "}
                  {it.endDate ? `– ${formatDate(it.endDate)}` : "– Present"}
                </div>

                <p className="text-sm leading-relaxed text-white/90">{it.summary}</p>

                <div className="flex flex-wrap gap-2">
                  {it.tech.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                {/* Only show buttons if the project has them (and only for projects) */}
                {it.type === "project" && (demo || github) ? (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {github ? <LinkButton href={github.href}>GitHub</LinkButton> : null}
                    {demo ? <LinkButton href={demo.href}>Demo</LinkButton> : null}
                  </div>
                ) : null}

                {/* Keep other links (like LinkedIn) for jobs as normal text links */}
                {it.type === "job" && it.links?.length ? (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {it.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm underline text-white hover:text-white/80"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {filtered.length === 0 ? (
        <div className="mt-8 text-sm text-white/60">
          No items match your filters.
        </div>
      ) : null}
    </div>
  );
}

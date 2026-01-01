import Link from "next/link";
import { notFound } from "next/navigation";
import { timeline } from "@/data/timeline";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${y}`;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-white text-black border border-white/80">
      {children}
    </span>
  );
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = timeline.find((x) => x.id === id && x.type === "project");
  if (!project) return notFound();

  const job =
    project.jobId ? timeline.find((x) => x.id === project.jobId && x.type === "job") : undefined;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-sm underline text-white/80 hover:text-white">
          ← Back
        </Link>

        {job ? (
          <Link href={`/job/${job.id}`} className="text-sm underline text-white/80 hover:text-white">
            View related job →
          </Link>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-white/60">Project</div>
        <h1 className="text-3xl font-semibold">{project.title}</h1>

        <div className="text-sm text-white/60">
          {project.org ? project.org : null}
          {project.location ? ` · ${project.location}` : ""}
        </div>

        <div className="text-sm text-white/55">
          {formatDate(project.startDate)}{" "}
          {project.endDate ? `– ${formatDate(project.endDate)}` : "– Present"}
        </div>
      </div>

      {project.links?.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <LinkButton key={l.href} href={l.href}>
              {l.label}
            </LinkButton>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>

      <p className="mt-6 text-base leading-relaxed text-white/90">{project.summary}</p>

      <div className="mt-10 space-y-8">
        {project.problem ? (
          <section>
            <h2 className="text-lg font-semibold">Problem</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{project.problem}</p>
          </section>
        ) : null}

        {project.solution ? (
          <section>
            <h2 className="text-lg font-semibold">Solution</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{project.solution}</p>
          </section>
        ) : null}

        {project.impact?.length ? (
          <section>
            <h2 className="text-lg font-semibold">Impact</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/80 space-y-1">
              {project.impact.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.highlights?.length ? (
          <section>
            <h2 className="text-lg font-semibold">Highlights</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/80 space-y-1">
              {project.highlights.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { timeline } from "@/data/timeline";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobPage({ params }: PageProps) {
  const { id } = await params;

  const job = timeline.find((x) => x.id === id && x.type === "job");
  if (!job) return notFound();

  const projects = timeline
    .filter((x) => x.type === "project" && x.jobId === job.id)
    .sort((a, b) => (a.startDate < b.startDate ? 1 : -1));

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm underline text-white/70 hover:text-white">
          ← Back
        </Link>
      </div>

      <h1 className="text-3xl font-semibold">{job.title}</h1>
      <div className="mt-2 text-white/60">
        {job.org ? <span>{job.org}</span> : null}
        {job.location ? <span className="mx-2">•</span> : null}
        {job.location ? <span>{job.location}</span> : null}
      </div>

      <p className="mt-6 text-white/90 leading-relaxed">{job.summary}</p>

      {job.highlights?.length ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Highlights</h2>
          <ul className="mt-2 list-disc pl-5 text-white/85 space-y-1">
            {job.highlights.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {projects.length ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Projects</h2>
          <div className="mt-3 space-y-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/project/${p.id}`}
                className="block rounded-lg border border-white/15 p-4 hover:bg-white/5"
              >
                <div className="font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-white/70">{p.summary}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

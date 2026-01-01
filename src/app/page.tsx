import Timeline from "@/components/Timeline";
import { timeline } from "@/data/timeline";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto mb-10">
        <p className="text-gray-600 mt-2">
          Backend-focused engineer building systems and ML infrastructure.
        </p>
      </div>

      <Timeline items={timeline} />
    </main>
  );
}


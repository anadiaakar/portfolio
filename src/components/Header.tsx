import Link from "next/link";

type HeaderProps = {
  name?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  resumePath?: string; // e.g. "/assets/resume.pdf"
};

export default function Header({
  name = "Anadi Aakar Dewan",
  githubUrl = "https://github.com/your-username",
  linkedinUrl = "https://www.linkedin.com/in/anadi-aakar-dewan-5087ba134/",
  email = "adewan9@asu.edu",
  resumePath = "/assets/resume.pdf",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href="/" className="text-lg font-semibold hover:text-white/80">
          {name}
        </Link>

        <nav className="flex flex-wrap gap-3 items-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-full border border-white/20 text-sm text-white/85 hover:bg-white/10"
          >
            GitHub
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-full border border-white/20 text-sm text-white/85 hover:bg-white/10"
          >
            LinkedIn
          </a>

          <a
            href={resumePath}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-full bg-white text-black text-sm hover:bg-white/90"
          >
            Resume
          </a>

          <a
            href={`mailto:${email}`}
            className="px-3 py-1.5 rounded-full border border-white/20 text-sm text-white/85 hover:bg-white/10"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
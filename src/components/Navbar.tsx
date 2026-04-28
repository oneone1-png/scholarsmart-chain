import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
            <GraduationCap size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">SmartScholar</h1>
            <p className="text-xs text-slate-400">
              Scholarship Transparency System
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/scholarships" className="hover:text-cyan-300">
            Beasiswa
          </Link>
          <Link href="/transparency" className="hover:text-cyan-300">
            Transparansi
          </Link>
          <Link href="/admin" className="hover:text-cyan-300">
            Admin
          </Link>
        </div>

        <Link
          href="/scholarships"
          className="rounded-2xl bg-cyan-400 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-300"
        >
          Mulai
        </Link>
      </div>
    </nav>
  );
}
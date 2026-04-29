"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function ScholarshipsPage() {
  const router = useRouter();

  const [scholarships, setScholarships] = useState<any[]>([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("scholarships")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
      } else {
        setScholarships(data || []);
      }

      setChecking(false);
    }

    init();
  }, [router]);

  if (checking) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Memeriksa login...
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">Daftar Beasiswa</h1>
          <p className="mt-3 text-slate-400">
            Pilih beasiswa yang sesuai dengan kebutuhan dan potensimu.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {scholarships.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <h2 className="text-xl font-bold group-hover:text-cyan-300">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>

                <p className="mt-5 text-sm text-cyan-300">
                  🎓 Kuota: {item.quota} penerima
                </p>

                <Link
                  href={`/apply/${item.id}`}
                  className="mt-6 inline-block rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  Daftar Beasiswa
                </Link>
              </div>
            ))}
          </div>

          {scholarships.length === 0 && (
            <p className="mt-10 text-center text-slate-500">
              Belum ada beasiswa tersedia.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
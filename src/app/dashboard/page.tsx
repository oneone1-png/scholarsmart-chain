"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("total_score", { ascending: false });

      if (!error) {
        setApplications(data || []);
      }
    }

    fetchData();
  }, []);

  const total = applications.length;
  const accepted = applications.filter((item) => item.status === "accepted").length;
  const rejected = applications.filter((item) => item.status === "rejected").length;
  const pending = applications.filter((item) => item.status === "pending").length;

  const topCandidates = applications.slice(0, 5);

  return (
    <>


      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Admin</h1>
              <p className="mt-2 text-slate-400">
                Ringkasan data pendaftar dan status seleksi beasiswa.
              </p>
            </div>

            <Link
              href="/admin/applications"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300"
            >
              Kelola Pendaftar
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <StatCard title="Total Pendaftar" value={total} />
            <StatCard title="Diterima" value={accepted} color="text-green-400" />
            <StatCard title="Ditolak" value={rejected} color="text-red-400" />
            <StatCard title="Pending" value={pending} color="text-yellow-400" />
          </div>

          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">🏆 Top Kandidat</h2>
            <p className="mt-2 text-sm text-slate-400">
              Kandidat dengan skor tertinggi sebagai rekomendasi prioritas.
            </p>

            <div className="mt-6 space-y-4">
              {topCandidates.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center"
                >
                  <div>
                    <p className="font-bold">
                      #{index + 1} {item.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      Skor:{" "}
                      <span className="text-cyan-300">{item.total_score}</span>{" "}
                      · Status:{" "}
                      <span
                        className={
                          item.status === "accepted"
                            ? "text-green-400"
                            : item.status === "rejected"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>

                  <div className="text-2xl">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                  </div>
                </div>
              ))}

              {topCandidates.length === 0 && (
                <p className="text-slate-400">Belum ada data pendaftar.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function StatCard({
  title,
  value,
  color = "text-white",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}
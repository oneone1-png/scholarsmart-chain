"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function TransparencyPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    async function fetchApplications() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setApplications(data || []);
      }
    }

    fetchApplications();
  }, []);

  const total = applications.length;
  const accepted = applications.filter((item) => item.status === "accepted").length;
  const rejected = applications.filter((item) => item.status === "rejected").length;
  const pending = applications.filter((item) => item.status === "pending").length;

  const ranked = [...applications]. sort(
    (a,b) => b.total_score - a.total_score
  );

  const chartData = [
    { name: "Diterima", value: accepted },
    { name: "Ditolak", value: rejected },
    { name: "Pending", value: pending },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">Dashboard Transparansi</h1>
          <p className="mt-3 text-slate-400">
            Ringkasan proses seleksi dan jejak transaksi blockchain.
          </p>
          <p className="mt-3 text-sm text-slate-400">
             Sistem secara otomatis merekomendasikan kandidat dengan skor tertinggi sebagai prioritas penerima beasiswa.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <StatCard title="Total Pendaftar" value={total} />
            <StatCard title="Diterima" value={accepted} color="text-green-400" />
            <StatCard title="Ditolak" value={rejected} color="text-red-400" />
            <StatCard title="Pending" value={pending} color="text-yellow-400" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold">Grafik Status Seleksi</h2>

              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold">Insight Transparansi</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <p>✅ Total pendaftar: {total}</p>
                <p>🟢 Pendaftar diterima: {accepted}</p>
                <p>🔴 Pendaftar ditolak: {rejected}</p>
                <p>🟡 Masih pending: {pending}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
  <h2 className="text-xl font-bold">🏆 Top Kandidat</h2>

  <div className="mt-6 space-y-4">
    {ranked.slice(0, 5).map((item, index) => (
      <div
        key={item.id}
        className="flex items-center justify-between rounded-2xl bg-white/5 p-4"
      >
        <div>
          <p className="font-bold">
            #{index + 1} {item.name}
          </p>
          <p className="text-sm text-slate-400">
            Skor: {item.total_score}
          </p>
    
        </div>

        <span className="text-cyan-300 font-semibold">
          {(index + 1) === 1 && "🥇"}
          {(index + 1) === 2 && "🥈"}
          {(index + 1) === 3 && "🥉"}
        </span>
      </div>
    ))}
  </div>
</div>

          <div className="mt-10 space-y-4">
            {applications.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Skor Total: <span className="text-cyan-300">{item.total_score}</span>
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Status: <span>{item.status}</span>
                </p>

                {item.tx_hash && (
                  <p className="mt-2 break-all text-sm text-cyan-400">
                    TX: {item.tx_hash}
                  </p>
                )}
              </div>
            ))}
          </div>
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
      <p className="text-slate-400">{title}</p>
      <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}
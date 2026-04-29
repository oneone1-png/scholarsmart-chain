"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sendTransaction } from "@/lib/phantom";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchApplications() {
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: "accepted" | "rejected") {
    try {
      let txHash = null;

      if (status === "accepted") {
        txHash = await sendTransaction();
      }

      const { error } = await supabase
        .from("applications")
        .update({
          status,
          tx_hash: txHash,
        })
        .eq("id", id);

      if (error) {
        alert(error.message);
        return;
      }

      if (txHash) {
        alert(`Transaksi berhasil:\n${txHash}`);
      }

      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui status.");
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">Kelola Pendaftar</h1>
          <p className="mt-2 text-slate-400">
            Kelola status pendaftaran beasiswa dan catat keputusan ke blockchain.
          </p>

          {loading && <p className="mt-8 text-slate-400">Memuat data...</p>}

          {!loading && applications.length === 0 && (
            <p className="mt-8 text-slate-400">
              Belum ada data pendaftaran.
            </p>
          )}

          <div className="mt-8 space-y-4">
            {applications.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <p className="text-lg font-bold">{item.name}</p>

                    <p className="mt-2 text-sm text-slate-400">
                      Skor Total:{" "}
                      <span className="text-cyan-300">
                        {item.total_score}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Status:{" "}
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

                    {item.tx_hash && (
                      <div className="mt-3">
                        <p className="break-all text-sm text-cyan-400">
                          TX: {item.tx_hash}
                        </p>

                        {!item.tx_hash.startsWith("SIMULATED") && (
                          <a
                            href={`https://explorer.solana.com/tx/${item.tx_hash}?cluster=devnet`}
                            target="_blank"
                            className="text-sm text-cyan-400 underline"
                          >
                            Lihat di Blockchain
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 md:items-start">
                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, "accepted")}
                      className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-400"
                    >
                      Terima
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, "rejected")}
                      className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
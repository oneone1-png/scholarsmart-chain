"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sendToBlockchain } from "@/lib/blockchain";
import { connectPhantom, sendTransaction } from "@/lib/phantom";

export default function AdminPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchApplications() {
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ADMIN ERROR:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  }

async function updateStatus(id: string, status: string) {
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  // connect wallet
  await connectPhantom();

  // kirim transaksi ke Solana
  const signature = await sendTransaction(id, status);

  if(signature){
    //simpan ke database
    await supabase
    .from("applications")
    .update({tx_hash: signature})
    .eq("id", id);

    alert(`Transaksi berhasil: \n${signature}`);

  

  }
  fetchApplications();

  }
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

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
            <p>
              <b>Nama:</b> {item.name}
            </p>

            <p>
              <b>Skor Total:</b>{" "}
              <span className="text-cyan-300">{item.total_score}</span>
            </p>

            <p>
              <b>Status:</b>{" "}
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
               <a href={`https://explorer.solana.com/tx/${item.tx_hash}?cluster=devnet`}
                   target="_blank" className="text-cyan-400 underline text-sm"
            >
               Lihat di Blockchain
                     </a>
                  )}
              <p className="mt-2 text-sm text-cyan-400 break-all">
                TX: {item.tx_hash}
              </p>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => updateStatus(item.id, "accepted")}
                className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white"
              >
                Terima
              </button>

              <button
                type="button"
                onClick={() => updateStatus(item.id, "rejected")}
                className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white"
              >
                Tolak
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { sendTransaction } from "@/lib/phantom";

export default function AdminPage() {
  const router = useRouter();

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
      alert("Transaksi gagal");
    }
  }

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        router.push("/login");
        return;
      }

      fetchApplications();
    }

    checkAdmin();
  }, [router]);

  return (
    <>
      <Navbar />

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
                <div className="mt-2">
                  <p className="break-all text-sm text-cyan-400">
                    TX: {item.tx_hash}
                  </p>

                  <a
                    href={`https://explorer.solana.com/tx/${item.tx_hash}?cluster=devnet`}
                    target="_blank"
                    className="text-sm text-cyan-400 underline"
                  >
                    Lihat di Blockchain
                  </a>
                </div>
              )}

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
    </>
  );
}
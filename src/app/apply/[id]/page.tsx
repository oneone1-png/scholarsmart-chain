"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {

  
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    ekonomi: "",
    akademik: "",
    organisasi: "",
  });
  

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const economicScore = parseInt(form.ekonomi) || 0;
    const academicScore = parseInt(form.akademik) || 0;
    const organizationScore = parseInt(form.organisasi) || 0;

    const totalScore = Math.round(
      economicScore * 0.4 + academicScore * 0.4 + organizationScore * 0.2
    );
    const { error } = await supabase.from("applications").insert({
      scholarship_id: id,
      name: form.name,
      economic_score: economicScore,
      academic_score: academicScore,
      organization_score: organizationScore,
      total_score: totalScore,
      status: "pending",
    });

    setLoading(false);

    if (error) {
      setMessage(`Gagal submit: ${error.message}`);
      return;
    }

    setMessage(`Pendaftaran berhasil dikirim. Skor kamu: ${totalScore}`);
    setForm({
      name: "",
      ekonomi: "",
      akademik: "",
      organisasi: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold">Form Pendaftaran Beasiswa</h1>
        <p className="mt-3 text-slate-400">
          Isi data berikut untuk mengikuti seleksi beasiswa.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Nama lengkap"
            value={form.name}
            required
            className="w-full rounded-xl bg-white/10 p-3 outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Skor ekonomi (0-100)"
            value={form.ekonomi}
            min="0"
            max="100"
            required
            className="w-full rounded-xl bg-white/10 p-3 outline-none"
            onChange={(e) => setForm({ ...form, ekonomi: e.target.value })}
          />

          <input
            type="number"
            placeholder="Nilai akademik (0-100)"
            value={form.akademik}
            min="0"
            max="100"
            required
            className="w-full rounded-xl bg-white/10 p-3 outline-none"
            onChange={(e) => setForm({ ...form, akademik: e.target.value })}
          />

          <input
            type="number"
            placeholder="Nilai organisasi (0-100)"
            value={form.organisasi}
            min="0"
            max="100"
            required
            className="w-full rounded-xl bg-white/10 p-3 outline-none"
            onChange={(e) => setForm({ ...form, organisasi: e.target.value })}
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-black disabled:opacity-60"
          >
            {loading ? "Mengirim..." : "Submit Pendaftaran"}
          </button>
        </form>

        {message && (
          <div className="mt-6 rounded-xl bg-white/10 p-4 text-sm">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
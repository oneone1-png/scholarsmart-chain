"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        name,
        nim,
        major,
        role: "student",
      });

      if (profileError) {
        alert(profileError.message);
        setLoading(false);
        return;
      }
    }

    alert("Pendaftaran berhasil. Silakan login.");
    router.push("/login");

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-center text-3xl font-bold">
            Pendaftaran Mahasiswa
          </h1>

          <p className="mt-2 text-center text-sm text-slate-400">
            Buat akun untuk mendaftar program beasiswa.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="text"
              placeholder="NIM / Nomor Induk Mahasiswa"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
              className="w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="text"
              placeholder="Program Studi"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              className="w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              type="password"
              placeholder="Password minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Mendaftarkan..." : "Daftar Akun"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Sudah punya akun?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-cyan-300 underline"
            >
              Login di sini
            </button>
          </p>
        </div>
      </main>
    </>
  );
}
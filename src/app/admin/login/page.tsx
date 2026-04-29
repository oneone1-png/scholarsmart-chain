"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // cek role admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user?.id)
      .single();

    if (profile?.role !== "admin") {
      alert("Akses ditolak. Bukan admin.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white/5 p-6"
      >
        <h1 className="text-2xl font-bold">Login Admin</h1>

        <input
          type="email"
          placeholder="Email admin"
          className="w-full rounded-lg bg-white/10 p-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-white/10 p-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-lg bg-cyan-400 p-3 font-bold text-black">
          Login Admin
        </button>
      </form>
    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    router.push("/scholarships");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Login</h1>

        <input className="w-full rounded-xl bg-white/10 p-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-xl bg-white/10 p-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950">
          Masuk
        </button>
      </form>
    </main>
  );
}
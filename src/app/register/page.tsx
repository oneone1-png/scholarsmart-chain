"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return alert(error.message);

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        role: "student",
      });
    }

    alert("Register berhasil. Silakan login.");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <form onSubmit={handleRegister} className="mx-auto max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Register</h1>

        <input className="w-full rounded-xl bg-white/10 p-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-xl bg-white/10 p-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full rounded-xl bg-cyan-400 p-3 font-bold text-slate-950">
          Daftar
        </button>
      </form>
    </main>
  );
}
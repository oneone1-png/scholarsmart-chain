"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-6 py-4 text-white">
      <h1 className="font-bold">🎓 SmartScholar</h1>

      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>

        {user && (
          <>
            <Link href="/transparency">Dashboard</Link>
            <Link href="/scholarships">Beasiswa</Link>
          </>
        )}

        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
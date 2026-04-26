import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ScholarshipsPage() {
  const { data: scholarships, error } = await supabase
    .from("scholarships")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-2xl font-bold">Gagal mengambil data beasiswa</h1>
        <p className="mt-4 text-red-400">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Daftar Beasiswa</h1>
        <p className="mt-3 text-slate-400">
          Pilih beasiswa yang sesuai dengan kebutuhan dan potensimu.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {scholarships?.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-bold">{item.title}</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>

              <p className="mt-5 text-sm text-cyan-300">
                Kuota: {item.quota} penerima
              </p>

              <Link
                href={`/apply/${item.id}`}
                className="mt-6 inline-block rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                Daftar Beasiswa
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
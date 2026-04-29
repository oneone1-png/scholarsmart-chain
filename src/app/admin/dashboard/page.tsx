
import Link from "next/link";


export default function AdminHomePage() {
  return (
    <>
     

      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Dashboard Area</h1>
          <p className="mt-3 text-slate-400">
            Pilih menu untuk mengelola sistem SmartScholar.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/40"
            >
              <h2 className="text-xl font-bold">Dashboard</h2>
              <p className="mt-2 text-sm text-slate-400">
                Lihat ringkasan data pendaftar.
              </p>
            </Link>

            <Link
              href="/admin/applications"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/40"
            >
              <h2 className="text-xl font-bold">Kelola Pendaftar</h2>
              <p className="mt-2 text-sm text-slate-400">
                Terima atau tolak pengajuan beasiswa.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
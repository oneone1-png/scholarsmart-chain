import { supabase } from "@/lib/supabase";

export default async function TransparencyPage() {
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-bold">Dashboard Transparansi</h1>
        <p className="mt-4 text-red-400">{error.message}</p>
      </main>
    );
  }

  const total = applications?.length || 0;
  const accepted =
    applications?.filter((item) => item.status === "accepted").length || 0;
  const rejected =
    applications?.filter((item) => item.status === "rejected").length || 0;
  const pending =
    applications?.filter((item) => item.status === "pending").length || 0;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Dashboard Transparansi</h1>
        <p className="mt-3 text-slate-400">
          Menampilkan ringkasan proses seleksi dan jejak transaksi blockchain.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-slate-400">Total Pendaftar</p>
            <h2 className="mt-2 text-3xl font-bold">{total}</h2>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-slate-400">Diterima</p>
            <h2 className="mt-2 text-3xl font-bold text-green-400">
              {accepted}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-slate-400">Ditolak</p>
            <h2 className="mt-2 text-3xl font-bold text-red-400">
              {rejected}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-slate-400">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {pending}
            </h2>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {applications?.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Skor Total:{" "}
                    <span className="text-cyan-300">{item.total_score}</span>
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Status:{" "}
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
                </div>

                <div className="max-w-md">
                  {item.tx_hash ? (
                    <div>
                      <p className="text-sm text-slate-400">Blockchain TX:</p>

                      <p className="mt-1 break-all text-sm text-cyan-400">
                        {item.tx_hash}
                      </p>

                      {item.tx_hash.startsWith("SIMULATED") ? (
                        <p className="mt-2 text-xs text-yellow-400">
                          Simulasi blockchain
                        </p>
                      ) : (
                        <a
                          href={`https://explorer.solana.com/tx/${item.tx_hash}?cluster=devnet`}
                          target="_blank"
                          className="mt-2 inline-block text-sm text-cyan-300 underline"
                        >
                          Lihat di Solana Explorer
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Belum tercatat di blockchain
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {applications?.length === 0 && (
            <p className="text-slate-400">Belum ada data pendaftaran.</p>
          )}
        </div>
      </div>
    </main>
  );
}
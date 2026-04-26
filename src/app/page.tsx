import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  GraduationCap,
  Blocks,
  LineChart,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Users,
  WalletCards,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SmartScholarLandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">SmartScholar</h1>
              <p className="text-xs text-slate-400">Scholarship Transparency System</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#fitur" className="hover:text-white">Fitur</a>
            <a href="#alur" className="hover:text-white">Alur</a>
            <a href="#transparansi" className="hover:text-white">Transparansi</a>
          </div>

          <Button className="rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300">
            Mulai Sekarang
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              <Blocks size={16} />
              Berbasis Web & Blockchain
            </div>

            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Penyaluran Beasiswa yang Lebih Akurat, Adil, dan Transparan.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              SmartScholar membantu proses pendaftaran, seleksi, dan pelacakan beasiswa dengan sistem scoring transparan serta audit trail berbasis blockchain.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button className="h-12 rounded-2xl bg-cyan-400 px-6 text-base font-semibold text-slate-950 hover:bg-cyan-300">
                Cari Beasiswa <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" className="h-12 rounded-2xl border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10">
                Lihat Transparansi
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10"
          >
            <Card className="rounded-[2rem] border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="rounded-3xl bg-slate-900 p-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm text-slate-400">Total Dana Tersalurkan</p>
                      <h3 className="mt-1 text-3xl font-bold text-white">Rp 245.000.000</h3>
                    </div>
                    <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-300">
                      <WalletCards />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {[
                      ["Pendaftar", "1.240", Users],
                      ["Penerima", "320", CheckCircle2],
                      ["Data Tercatat di Blockchain", "98%", ShieldCheck],
                    ].map(([label, value, Icon]: any) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-cyan-300/10 p-2 text-cyan-300">
                            <Icon size={20} />
                          </div>
                          <p className="text-sm text-slate-300">{label}</p>
                        </div>
                        <p className="font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-cyan-300">Fitur Utama</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Dibangun untuk seleksi beasiswa yang terpercaya</h2>
          <p className="mt-4 text-slate-400">Mulai dari pendaftaran, scoring, hingga pencatatan hasil seleksi secara transparan.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: LineChart,
              title: "Smart Scoring",
              desc: "Sistem menilai pendaftar berdasarkan kriteria ekonomi, akademik, dan prestasi.",
            },
            {
              icon: Blocks,
              title: "Blockchain Audit Trail",
              desc: "Hasil seleksi penting dicatat sebagai bukti digital yang sulit dimanipulasi.",
            },
            {
              icon: FileCheck,
              title: "Tracking Aplikasi",
              desc: "Pendaftar dapat melihat status pengajuan beasiswa secara jelas dan real-time.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="rounded-3xl border-white/10 bg-white/[0.06] text-white">
              <CardContent className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="alur" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-semibold text-cyan-300">Alur Sistem</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Sederhana untuk pengguna, kuat untuk pengelola</h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {["Daftar Akun", "Pilih Beasiswa", "Upload Data", "Scoring", "Hasil Tercatat"].map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <h3 className="font-bold">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Proses dibuat jelas agar pengguna tahu tahapan yang sedang berjalan.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparansi" className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="font-semibold text-cyan-300">Transparansi</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Setiap keputusan punya jejak yang bisa diverifikasi</h2>
          <p className="mt-5 leading-8 text-slate-400">
            Sistem menyimpan ringkasan hasil seleksi dan hash data ke blockchain. Data pribadi tetap aman, sementara bukti proses tetap dapat dicek.
          </p>
        </div>

        <Card className="rounded-[2rem] border-white/10 bg-white/[0.06] text-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                "Data sensitif tidak dibuka ke publik",
                "Hash hasil seleksi dicatat ke blockchain",
                "Donatur dapat melihat ringkasan distribusi dana",
                "Pendaftar dapat melacak status pengajuan",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                  <CheckCircle2 className="mt-1 text-cyan-300" size={20} />
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-cyan-400 p-10 text-center text-slate-950 md:p-14">
          <h2 className="text-3xl font-black md:text-4xl">Bangun ekosistem beasiswa yang lebih adil</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-800">
            SmartScholar membantu siswa, institusi, dan pemberi beasiswa dalam proses penyaluran bantuan pendidikan yang akurat dan transparan.
          </p>
          <Button className="mt-8 h-12 rounded-2xl bg-slate-950 px-6 text-white hover:bg-slate-800">
            Mulai Bangun Sistem
          </Button>
          <Button asChild>
  <a href="/transparency">Lihat Transparansi</a>
</Button>
        </div>
      </section>
    </main>
  );
}

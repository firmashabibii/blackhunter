import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Crosshair } from "lucide-react";
import { STATS } from "@/lib/blackhunter";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "BLACKHUNTER — The Elite Boarding House Chronicles" },
      { name: "description", content: "Arsip rahasia warga sekos BLACKHUNTER: galeri kenangan, agen, dan kutipan blackbox." },
      { property: "og:title", content: "BLACKHUNTER — Arsip Rahasia Warga Sekos" },
      { property: "og:description", content: "Galeri kenangan dan keseruan anak sekos yang elite dan misterius." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <section className="relative mx-auto flex min-h-[80svh] sm:min-h-[90vh] max-w-6xl flex-col justify-center px-4 py-12 sm:px-5 sm:py-20">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-primary animate-in fade-in">
          <Crosshair size={14} /> Classified · Level 5
        </div>
        <h1 className="font-display text-4xl font-bold text-glow min-[380px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          BLACK<span className="text-primary">HUNTER</span>
        </h1>
        <p className="mt-4 font-display text-xl text-muted-foreground sm:text-2xl">The Elite Boarding House Chronicles</p>
        <p className="font-mono text-sm text-accent">// Arsip Rahasia Warga Sekos</p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="glass rounded-xl p-4 transition hover:glow animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <Button asChild className="mt-8 w-full sm:w-fit"><Link to="/markas" className="group inline-flex w-full items-center gap-3 rounded-lg bg-primary px-5 py-3 sm:px-7 sm:py-4 font-display text-lg font-semibold uppercase tracking-widest text-primary-foreground glow transition hover:scale-[1.03]">
          Masuk Markas <ArrowRight className="transition group-hover:translate-x-1" />
        </Link></Button>
        <Link to="/login" className="mt-3 flex min-h-11 items-center font-mono text-xs text-accent hover:underline">Punya akun? Login sebagai Pemain Inti →</Link>
      </section>
      <Footer />
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ShieldCheck, User } from "lucide-react";
import { login, MOCK_CREDENTIALS } from "@/lib/blackhunter";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Gerbang Agen — BLACKHUNTER" },
      { name: "description", content: "Gerbang login eksklusif agen BLACKHUNTER." },
      { property: "og:title", content: "Gerbang Agen — BLACKHUNTER" },
      { property: "og:description", content: "Hanya agen terverifikasi yang boleh masuk markas." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [c, setC] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(c, p)) nav({ to: "/markas" });
    else setErr("Akses ditolak. Identitas agen tidak dikenali.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="glass scanline w-full max-w-sm rounded-2xl p-8 glow-soft animate-in fade-in zoom-in-95">
        <ShieldCheck className="mx-auto text-primary" size={40} />
        <h1 className="mt-4 text-center font-display text-2xl font-bold tracking-widest">GERBANG AGEN</h1>
        <p className="mt-1 text-center font-mono text-xs text-muted-foreground">Identifikasi diri untuk masuk markas</p>

        <label className="mt-8 block font-mono text-xs uppercase tracking-widest text-muted-foreground">Nama Sandi</label>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-input bg-background/60 px-3 focus-within:glow">
          <User size={16} className="text-muted-foreground" />
          <input value={c} onChange={(e) => setC(e.target.value)} className="w-full bg-transparent py-3 outline-none" placeholder="hunter" />
        </div>
        <label className="mt-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground">Kode Akses</label>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-input bg-background/60 px-3 focus-within:glow">
          <Lock size={16} className="text-muted-foreground" />
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} className="w-full bg-transparent py-3 outline-none" placeholder="••••••••" />
        </div>
        {err && <p className="mt-3 font-mono text-xs text-destructive">{err}</p>}
        <button className="mt-6 w-full rounded-lg bg-primary py-3 font-display font-semibold uppercase tracking-widest text-primary-foreground transition hover:glow">Verifikasi</button>
        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
          Demo: {MOCK_CREDENTIALS.codename} / {MOCK_CREDENTIALS.password}
        </p>
        <Link to="/" className="mt-2 block text-center font-mono text-[11px] text-accent hover:underline">← Kembali</Link>
      </form>
    </div>
  );
}

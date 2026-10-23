import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Calendar, LogIn, Eye, Heart, LogOut, MapPin, MessageSquare, Search, Send, X } from "lucide-react";
import { AGENTS, ARCHIVES, CATEGORIES, filterArchives, isAuthed, logout, type Archive } from "@/lib/blackhunter";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/Button";
import { Slot } from "@/components/Slot";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/markas")({
  head: () => ({
    meta: [
      { title: "Markas — BLACKHUNTER" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "description", content: "Galeri arsip misi, daftar agen, dan blackbox quotes BLACKHUNTER." },
      { property: "og:title", content: "Markas — BLACKHUNTER" },
      { property: "og:description", content: "Arsip misi rahasia warga sekos." },
    ],
  }),
  component: Markas,
});

type Quote = { name: string; text: string };
const QKEY = "bh-quotes";
const SEED: Quote[] = [
  { name: "BENDAHARA", text: "Yang belum bayar patungan galon, saya tahu kalian siapa." },
  { name: "GHOST", text: "Tanggal 25 ke atas, kita semua vegetarian terpaksa." },
  { name: "NOCTURNAL", text: "Tidur itu mitos. Begadang itu gaya hidup." },
];

function Markas() {
  const nav = useNavigate();
  const [member, setMember] = useState(false);
  const [cat, setCat] = useState<string>("Semua Misi");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Archive | null>(null);

  useEffect(() => {
    setMember(isAuthed());
  }, []);

  const list = useMemo(() => filterArchives(ARCHIVES, cat, q), [cat, q]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 glass border-x-0 border-t-0">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 sm:flex sm:justify-between sm:px-5 sm:py-3">
          <span className="min-w-0 truncate font-display text-base font-bold sm:text-lg">BLACK<span className="text-primary">HUNTER</span></span>
          <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:flex">
            <a href="#galeri" className="hover:text-primary">Galeri</a>
            <a href="#agen" className="hover:text-primary">Agen</a>
            <a href="#blackbox" className="hover:text-primary">Blackbox</a>
          </nav>
          {member ? (
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary sm:inline">Pemain Inti</span>
              <Button onClick={() => { logout(); setMember(false); }} className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-destructive">
                <LogOut size={14} /> Keluar
              </Button>
            </div>
          ) : (
            <Button onClick={() => nav({ to: "/login" })} className="flex items-center gap-2 rounded-lg border border-primary px-3 py-1.5 font-mono text-xs text-primary hover:glow">
              <LogIn size={14} /> Login Agen
            </Button>
          )}
        </div>
        <nav aria-label="Navigasi markas" className="grid grid-cols-3 border-t border-border px-4 font-mono text-xs text-muted-foreground sm:hidden">
          <a href="#galeri" className="flex min-h-11 items-center justify-center focus-visible:text-primary">Galeri</a>
          <a href="#agen" className="flex min-h-11 items-center justify-center focus-visible:text-primary">Agen</a>
          <a href="#blackbox" className="flex min-h-11 items-center justify-center focus-visible:text-primary">Blackbox</a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-5">
        <section id="galeri" className="scroll-mt-28 pt-8 sm:scroll-mt-20 sm:pt-12">
          <SectionTitle tag="01" title="Arsip Misi" />
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("rounded-full border px-3 py-2 sm:px-4 font-mono text-xs transition", cat === c ? "border-primary bg-primary text-primary-foreground glow" : "border-border text-muted-foreground hover:border-primary hover:text-primary")}>{c}</Button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-lg glass px-3 md:w-72 focus-within:glow">
              <Search size={16} className="shrink-0 text-muted-foreground" />
              <input aria-label="Cari agen atau lokasi" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari agen / lokasi..." className="min-w-0 w-full bg-transparent py-2.5 text-base sm:text-sm outline-none" />
            </div>
          </div>

          {list.length === 0 ? (
            <p className="mt-16 text-center font-mono text-sm text-muted-foreground">Tidak ada arsip ditemukan. Mungkin sudah dihapus intel.</p>
          ) : (
            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {list.map((a) => (
                <Button key={a.id} onClick={() => setOpen(a)} className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl glass p-2 text-left transition hover:glow animate-in fade-in">
                  <Slot className={a.tall ? "h-64 sm:h-80" : "h-52"} />
                  <div className="absolute inset-2 flex flex-col justify-end rounded-lg bg-background/85 p-4 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="flex items-center gap-1 font-mono text-[11px] text-accent"><Calendar size={12} />{a.date}</p>
                    <p className="flex items-center gap-1 font-mono text-[11px] text-accent"><MapPin size={12} />{a.location}</p>
                    <p className="mt-2 text-sm">{a.brief}</p>
                  </div>
                  <div className="px-2 pb-1 pt-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{a.category}</p>
                    <p className="font-display font-semibold">{a.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">Agen: {a.agent}</p>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </section>

        <section id="agen" className="scroll-mt-28 pt-12 sm:scroll-mt-20 sm:pt-20">
          <SectionTitle tag="02" title="Daftar Agen" />
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {AGENTS.map((g) => (
              <div key={g.code} className="glass grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-lg p-4 transition hover:glow">
                <Slot className="h-16 w-16 shrink-0 rounded-full" size={20} />
                <div className="min-w-0">
                  <p className="break-words font-display font-bold text-primary">{g.code}</p>
                  <p className="text-sm">{g.name}</p>
                  <p className="font-mono text-xs leading-relaxed text-muted-foreground">{g.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Blackbox member={member} />
      </main>
      <Footer />
      {open && <Lightbox member={member} a={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function SectionTitle({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-sm text-primary">{tag}//</span>
      <h2 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">{title}</h2>
    </div>
  );
}

function Lightbox({ a, onClose, member }: { a: Archive; onClose: () => void; member: boolean }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [c, setC] = useState("");
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <Dialog.Root open onOpenChange={(next) => { if (!next) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <Dialog.Content aria-describedby="archive-story" className="pointer-events-auto relative glass grid max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-lg glow-soft outline-none md:grid-cols-2 animate-in zoom-in-95">
        <Slot className="m-3 h-48 sm:h-72 md:h-auto md:min-h-[28rem]" size={40} />
        <div className="min-w-0 flex flex-col px-4 pb-5 pt-0 sm:p-6">
          <Button onClick={onClose} className="absolute right-5 top-5 h-11 w-11 border border-border bg-background text-muted-foreground hover:text-primary" aria-label="Tutup"><X /></Button>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{a.category}</p>
          <Dialog.Title className="mt-1 break-words font-display text-2xl font-bold sm:text-3xl">{a.title}</Dialog.Title>
          <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs text-accent">
            <span className="flex items-center gap-1"><Calendar size={12} />{a.date}</span>
            <span className="flex items-center gap-1"><MapPin size={12} />{a.location}</span>
            <span>Agen: {a.agent}</span>
          </div>
          <p id="archive-story" className="mt-4 leading-relaxed text-muted-foreground">{a.story}</p>
          {member ? (<>
          <Button onClick={() => setLikes(likes + 1)} className="mt-6 flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-primary active:scale-95">
            <Heart size={16} className={likes ? "fill-primary text-primary" : ""} /> {likes} Respect
          </Button>
          <div className="mt-6 space-y-2">
            {comments.map((x, i) => (
              <p key={i} className="flex gap-2 rounded-lg bg-muted px-3 py-2 text-sm"><MessageSquare size={14} className="mt-0.5 text-primary" />{x}</p>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (c.trim()) { setComments([...comments, c.trim()]); setC(""); } }} className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <input value={c} onChange={(e) => setC(e.target.value)} placeholder="Tambah laporan..." className="min-w-0 flex-1 rounded-lg border border-input bg-background/60 px-3 py-2 text-base outline-none sm:text-sm focus:glow" />
            <Button className="rounded-lg bg-primary px-3 text-primary-foreground" aria-label="Kirim"><Send size={16} /></Button>
          </form>
          </>) : (<p className="mt-6 flex items-start gap-2 rounded-lg border border-dashed border-border px-4 py-3 font-mono text-xs text-muted-foreground"><Eye size={14} className="mt-0.5 shrink-0" /> Mode pengamat. Login sebagai agen untuk ikut berinteraksi.</p>)}
        </div>
      </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Blackbox({ member }: { member: boolean }) {
  const [quotes, setQuotes] = useState<Quote[]>(SEED);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    const s = localStorage.getItem(QKEY);
    if (s) setQuotes(JSON.parse(s));
  }, []);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const next = [{ name: name.trim().toUpperCase() || "ANONIM", text: text.trim() }, ...quotes];
    setQuotes(next);
    localStorage.setItem(QKEY, JSON.stringify(next));
    setText("");
  };
  return (
    <section id="blackbox" className="scroll-mt-28 pt-12 sm:scroll-mt-20 sm:pt-20">
      <SectionTitle tag="03" title="Blackbox Quotes" />
      {member ? (
      <form onSubmit={add} className="glass mt-8 flex flex-col gap-3 rounded-xl p-4 md:flex-row">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama sandi" className="rounded-lg border border-input bg-background/60 px-3 py-2.5 text-base outline-none sm:text-sm focus:glow md:w-48" />
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Curhatan tanggal tua, pesan rahasia..." className="min-w-0 flex-1 rounded-lg border border-input bg-background/60 px-3 py-2.5 text-base outline-none sm:text-sm focus:glow" />
        <Button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display font-semibold uppercase tracking-wider text-primary-foreground hover:glow"><Send size={16} /> Rekam</Button>
      </form>
      ) : (<p className="mt-6 flex items-start gap-2 rounded-lg border border-dashed border-border px-4 py-3 font-mono text-xs text-muted-foreground"><Eye size={14} className="mt-0.5 shrink-0" /> Mode pengamat. Login sebagai agen untuk ikut berinteraksi.</p>)}
      <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {quotes.map((x, i) => (
          <figure key={i} className={cn("glass mb-4 break-inside-avoid rounded-xl p-5 transition hover:glow animate-in fade-in", i % 3 === 1 && "md:rotate-1", i % 3 === 2 && "md:-rotate-1")}>
            <blockquote className="break-words font-display text-lg leading-snug">"{x.text}"</blockquote>
            <figcaption className="mt-3 font-mono text-xs text-primary">— {x.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl text-primary text-glow">"Satu token habis, semua menjerit."</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">© 2026 BLACKHUNTER · Dibuat oleh warga sekos dengan kopi sachet.</p>
        </div>
        <nav className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <Link to="/markas" hash="galeri" className="hover:text-primary">Galeri</Link>
          <Link to="/markas" hash="agen" className="hover:text-primary">Agen</Link>
          <Link to="/markas" hash="blackbox" className="hover:text-primary">Blackbox</Link>
        </nav>
      </div>
    </footer>
  );
}

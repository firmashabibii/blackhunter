export type Category = "Nongkrong & Gabut" | "Mabar & Gaming" | "Masak Darurat" | "Aib & Chaos";
export const CATEGORIES = ["Semua Misi", "Nongkrong & Gabut", "Mabar & Gaming", "Masak Darurat", "Aib & Chaos"] as const;

export type Archive = {
  id: number; title: string; category: Category; agent: string; location: string;
  date: string; brief: string; story: string; tall?: boolean;
};

export const ARCHIVES: Archive[] = [
  { id: 1, title: "Operasi Kopi Jam 3 Pagi", category: "Nongkrong & Gabut", agent: "Ghost", location: "Teras Lantai 2", date: "12 Agu 2026", brief: "Rapat darurat tanpa agenda.", story: "Awalnya cuma mau ambil air minum. Berakhir debat filsafat soal mana yang lebih dulu: ayam atau mie instan. Matahari terbit, tidak ada keputusan.", tall: true },
  { id: 2, title: "Clutch 1v5 Legendaris", category: "Mabar & Gaming", agent: "Viper", location: "Kamar 07", date: "03 Sep 2026", brief: "Wifi 2 bar, mental 100%.", story: "Satu kamar teriak bersamaan sampai ibu kos naik tangga. Clutch berhasil, tapi kita semua kena teguran." },
  { id: 3, title: "Mie Telur Tanpa Telur", category: "Masak Darurat", agent: "Chef Raka", location: "Dapur Bersama", date: "28 Sep 2026", brief: "Tanggal tua edition.", story: "Telur habis, gas tinggal sedikit, tapi semangat penuh. Hasilnya: mie kuah rasa harapan. Rating 9/10 karena lapar.", tall: true },
  { id: 4, title: "Insiden Token Habis", category: "Aib & Chaos", agent: "Bendahara", location: "Meteran Depan", date: "05 Okt 2026", brief: "Satu token habis, semua menjerit.", story: "Tengah malam, listrik mati, lima orang keluar kamar bawa senter HP. Patungan dadakan via transfer receh jam 00:14." },
  { id: 5, title: "Turnamen Kartu Remi", category: "Nongkrong & Gabut", agent: "Joker", location: "Ruang Tamu", date: "14 Okt 2026", brief: "Yang kalah cuci piring.", story: "Joker kalah 7 kali berturut-turut. Piring bersih seminggu. Kos makmur." },
  { id: 6, title: "Push Rank Sampai Subuh", category: "Mabar & Gaming", agent: "Ghost", location: "Kamar 03", date: "17 Okt 2026", brief: "Mythic atau mati.", story: "Target Mythic. Hasil: turun dua tier, naik satu kantung mata. Tetap dihitung sebagai misi sukses secara emosional.", tall: true },
  { id: 7, title: "Nasi Goreng Eksperimen", category: "Masak Darurat", agent: "Chef Raka", location: "Dapur Bersama", date: "19 Okt 2026", brief: "Kecap habis, pakai saus sambal.", story: "Warnanya merah menyala, rasanya misterius. Semua habis dalam 4 menit. Resep diklasifikasikan Top Secret." },
  { id: 8, title: "Kunci Kamar Ketinggalan", category: "Aib & Chaos", agent: "Viper", location: "Lorong Lantai 1", date: "20 Okt 2026", brief: "Tidur di sofa, ditonton semua.", story: "Viper terkunci di luar jam 1 malam. Didokumentasikan lengkap oleh agen lain. Arsip ini tidak akan pernah dihapus." },
];

export const AGENTS = [
  { code: "GHOST", name: "Arya", role: "Commander Mabar" },
  { code: "BENDAHARA", name: "Dimas", role: "Chief Financial Officer (Bendahara Patungan)" },
  { code: "JOKER", name: "Fikri", role: "Specialist Tukang Suruh" },
  { code: "CHEF RAKA", name: "Raka", role: "Head of Dapur Darurat" },
  { code: "VIPER", name: "Bayu", role: "Intel & Penyebar Aib" },
  { code: "NOCTURNAL", name: "Yoga", role: "Penjaga Begadang Abadi" },
];

export const STATS = [
  { label: "Total Misi Nongkrong", value: "347" },
  { label: "Jam Begadang", value: "2.190" },
  { label: "Mie Instan Dikonsumsi", value: "1.024" },
  { label: "Korban Token Habis", value: "19" },
];

export const MOCK_CREDENTIALS = { codename: "hunter", password: "blackhunter" };
const AUTH_KEY = "bh-auth";
export const isAuthed = () => typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "1";
export const login = (c: string, p: string) => {
  const ok = c.trim().toLowerCase() === MOCK_CREDENTIALS.codename && p === MOCK_CREDENTIALS.password;
  if (ok) localStorage.setItem(AUTH_KEY, "1");
  return ok;
};
export const logout = () => localStorage.removeItem(AUTH_KEY);

export function filterArchives(list: Archive[], category: string, query: string) {
  const q = query.trim().toLowerCase();
  return list.filter((a) =>
    (category === "Semua Misi" || a.category === category) &&
    (!q || a.agent.toLowerCase().includes(q) || a.location.toLowerCase().includes(q)),
  );
}

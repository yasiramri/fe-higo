# 🧭 Higo Frontend

Frontend project untuk visualisasi data pengguna Higo, dibangun menggunakan [Next.js](https://nextjs.org/) 15, [Tailwind CSS](https://tailwindcss.com/), dan [React 19](https://reactjs.org/).

---

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4, Radix UI, Lucide Icons
- **State Management**: TanStack React Query
- **HTTP Client**: Axios
- **Data Visualization**:
  - Nivo (Pie & Bar Charts)
  - Recharts
- **Utilities**: clsx, class-variance-authority, tailwind-merge

---

## 🛠️ Instalasi & Menjalankan Proyek

### 1. Clone repository

```bash
git clone https://github.com/username/higo-frontend.git
cd higo-frontend
```

### 2. Install dependencies

```bash
npm install
# atau
yarn install
```

### 3. Jalankan development server

```bash
npm run dev
# buka http://localhost:3000 di browser
```

### 4. 📁 Struktur Direktori

```bash
higo-frontend/
├── components/        # Komponen UI (table, chart, dll)
├── pages/             # Halaman Next.js
├── types/             # Definisi TypeScript
├── utils/             # Helper seperti konfigurasi Axios
├── styles/            # Styling global (Tailwind config)
```

### 5. Fitur

📊 Fitur
✅ Tabel interaktif untuk data pengguna

✅ Pencarian berdasarkan nama, email, gender, minat

✅ Grafik login jam & distribusi gender

✅ Responsive dan cepat

✅ Integrasi langsung ke API backend Higo

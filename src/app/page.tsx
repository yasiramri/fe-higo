export default function HomePage() {
  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Higo Interview Technical Test</h1>
      <p className="text-gray-700 leading-relaxed">
        Website ini dikembangkan sebagai bagian dari Technical Test 2 dari Higo.
        Tujuannya adalah untuk menyajikan ringkasan data dari dataset{' '}
        <strong>Customer.csv</strong> secara interaktif dan informatif.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Fitur Utama:</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            Visualisasi data seperti jenis kelamin, umur, tahun lahir, lokasi,
            dan lainnya dalam bentuk chart interaktif.
          </li>
          <li>
            Seluruh data ditampilkan dalam bentuk tabel yang dapat diurutkan dan
            dicari.
          </li>
          <li>
            Tampilan yang responsif dan mudah digunakan, didesain dengan
            pendekatan UI/UX yang optimal.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Teknologi yang Digunakan:</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <strong>Frontend:</strong> Next.js + TypeScript + Tailwind CSS
          </li>
          <li>
            <strong>Backend:</strong> Node.js + Express.js
          </li>
          <li>
            <strong>Database:</strong> MongoDB
          </li>
          <li>
            <strong>Hosting:</strong> Vercel (Frontend) dan Railway (Backend)
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Dokumentasi API:</h2>
        <p className="text-gray-700">
          API disediakan dalam format JSON dan dapat diakses dalam waktu kurang
          dari 30 detik. Dokumentasi lengkap tersedia melalui{' '}
          <a
            href="https://be-higo-production.up.railway.app/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Swagger
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Repositori GitHub:</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <a
              href="https://github.com/yasiramri/fe-higo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Frontend Repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yasiramri/be-higo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Backend Repository
            </a>
          </li>
        </ul>
      </section>

      <p className="text-sm text-gray-500 pt-6">
        Dibuat oleh <strong>Muhammad Yasir Amri</strong> sebagai bagian dari
        proses rekrutmen Higo.
      </p>
    </main>
  );
}

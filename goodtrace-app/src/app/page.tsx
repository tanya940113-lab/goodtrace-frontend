import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white text-gray-800">
      <Navbar />

      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 py-20">
        <h1 className="text-4xl font-bold mb-4 text-green-700">
          GoodTrace 農業數位履歷平台
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          透過去中心化身份驗證與可驗證憑證技術，
          GoodTrace 協助農戶建立可信的農業生產紀錄，
          並讓消費者透明了解產品來源。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/did"
            className="px-6 py-4 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
          >
            🌱 身分註冊與驗證
          </Link>
          <Link
            href="/credential"
            className="px-6 py-4 bg-amber-500 text-white rounded-2xl shadow hover:bg-amber-600 transition"
          >
            📜 發行與查驗憑證
          </Link>
          <Link
            href="/farmRecord"
            className="px-6 py-4 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 transition"
          >
            🚜 建立與查詢農務紀錄
          </Link>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6 border-t">
        © 2025 GoodTrace — 農業數位履歷平台
      </footer>
    </main>
  );
}

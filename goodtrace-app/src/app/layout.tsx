import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletConnect from "../components/common/WalletConnect"; // ✅ 加入錢包元件

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoodTrace",
  description: "農產品履歷與信任平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ 全域 Header，包含錢包連接 */}
        <header className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">GoodTrace</h1>
          <WalletConnect />
        </header>

        <main>{children}</main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          aria-label="通知訊息"
          theme="light"
        />
      </body>
    </html>
  );
}
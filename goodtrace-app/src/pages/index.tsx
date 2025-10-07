import Link from "next/link";
import React from "react";
import Navbar from "../components/common/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-24 space-y-6"> {/* py-24 讓內容不被 Navbar 擋住 */}
        <h1 className="text-3xl font-bold text-center">🌱 GoodTrace 系統入口</h1>
        <p className="text-center text-gray-600">請選擇要操作的模組：</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DID 模組 */}
          <Link href="/did">
            <div className="border rounded-lg p-4 hover:shadow-md hover:bg-blue-50 cursor-pointer text-center">
              <h2 className="text-xl font-semibold">🆔 DID 管理</h2>
              <p className="text-sm text-gray-500 mt-2">
                註冊 DID、驗證方法與控制者查詢
              </p>
            </div>
          </Link>

          {/* 農務紀錄模組 */}
          <Link href="/farmRecord">
            <div className="border rounded-lg p-4 hover:shadow-md hover:bg-green-50 cursor-pointer text-center">
              <h2 className="text-xl font-semibold">🌾 農務紀錄</h2>
              <p className="text-sm text-gray-500 mt-2">
                建立與查詢農務紀錄
              </p>
            </div>
          </Link>

          {/* 憑證模組 */}
          <Link href="/credential">
            <div className="border rounded-lg p-4 hover:shadow-md hover:bg-purple-50 cursor-pointer text-center">
              <h2 className="text-xl font-semibold">📜 憑證管理</h2>
              <p className="text-sm text-gray-500 mt-2">
                發行、查詢與撤銷憑證
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

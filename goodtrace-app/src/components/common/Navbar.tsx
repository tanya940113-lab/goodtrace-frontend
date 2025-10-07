import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        toast.error("❌ 請先安裝 MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        toast.success("✅ 錢包已連接");
      } else {
        toast.warning("⚠️ 未找到錢包地址");
      }
    } catch (error) {
      toast.error("❌ 錢包連接失敗");
      console.error(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <nav className="bg-gray-100 py-4 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold text-gray-800">🌱 GoodTrace</h1>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            首頁
          </Link>
          <Link href="/did" className="text-gray-700 hover:text-blue-600">
            DID 管理
          </Link>
          <Link href="/farmRecord" className="text-gray-700 hover:text-green-600">
            農務紀錄
          </Link>
          <Link href="/credential" className="text-gray-700 hover:text-purple-600">
            憑證管理
          </Link>

          {account ? (
            <span className="text-sm text-gray-600 truncate max-w-[120px]">
              🪪 {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              連接錢包
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

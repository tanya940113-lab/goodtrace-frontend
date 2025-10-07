import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      toast.info("🔌 正在連接錢包...");

      if (!window.ethereum) {
        toast.error("❌ 請先安裝 MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        toast.success("✅ 錢包連接成功！");
      } else {
        toast.warning("⚠️ 未找到錢包地址");
      }
    } catch (error) {
      console.error("錢包連接失敗", error);
      toast.error("❌ 錢包連接失敗");
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    // 自動檢查是否已連接
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {account ? (
        <span className="text-sm text-gray-700">🪪 已登入：{account}</span>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {isConnecting ? "連接中..." : "連接錢包"}
        </button>
      )}
    </div>
  );
}
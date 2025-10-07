"use client";
import { useEffect, useState } from "react";
import { getDIDRegistryContract } from "../../utils/didContract";
import { toast } from "react-toastify";

export default function DIDStatus({ account }: { account: string | null }) {
  const [did, setDid] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const fetchDID = async () => {
      if (account) {
        try {
          const contract = await getDIDRegistryContract();
          const result = await contract.getDID(account);
          setDid(result !== "" ? result : null);
        } catch (err) {
          console.error("查詢 DID 失敗", err);
          toast.error("❌ 查詢 DID 失敗");
        }
      }
    };

    fetchDID();
  }, [account]);

  const registerDID = async () => {
    if (!account) return;
    try {
      setIsRegistering(true);
      toast.info("🚀 開始註冊 DID...");

      const contract = await getDIDRegistryContract();
      const tx = await contract.registerDID();
      await tx.wait();

      const result = await contract.getDID(account);
      setDid(result !== "" ? result : null);
      toast.success("✅ DID 註冊成功！");
    } catch (err) {
      console.error("註冊 DID 失敗", err);
      toast.error("❌ DID 註冊失敗，請重試");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="text-sm text-gray-600 relative">
      {isRegistering && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
          <div className="text-blue-600 animate-pulse">註冊中...</div>
        </div>
      )}

      {account ? (
        did ? (
          <span>🆔 DID：{did}</span>
        ) : (
          <div>
            <span>⚠️ 尚未註冊 DID</span>
            <button
              onClick={registerDID}
              disabled={isRegistering}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              註冊 DID
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}
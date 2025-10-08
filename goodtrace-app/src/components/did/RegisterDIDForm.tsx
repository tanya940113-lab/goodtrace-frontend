"use client";
import React, { useState } from "react";
import { getDIDRegistryContract } from "../../utils/didContract";
import { toast } from "react-toastify";

export default function RegisterDIDForm() {
  const [did, setDid] = useState("");
  const [metadata, setMetadata] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // ✅ 這就是 handleRegister 函式
  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      toast.info("📝 註冊中...");

      const contract = await getDIDRegistryContract();
      const tx = await contract.registerDID(did, metadata); // 傳入兩個參數
      await tx.wait();

      toast.success("✅ DID 註冊成功！");
      setDid("");
      setMetadata("");
    } catch (err) {
      console.error(err);
      toast.error("❌ 註冊失敗，請重試");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">註冊 DID</h2>
      <input
        type="text"
        value={did}
        onChange={(e) => setDid(e.target.value)}
        placeholder="輸入 DID"
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        value={metadata}
        onChange={(e) => setMetadata(e.target.value)}
        placeholder="輸入 Metadata（選填）"
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={handleRegister}
        disabled={isRegistering}
        className={`bg-blue-500 text-white px-4 py-1 rounded ${
          isRegistering ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {isRegistering ? "註冊中..." : "註冊"}
      </button>
    </div>
  );
}
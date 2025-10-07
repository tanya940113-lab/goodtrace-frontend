"use client";
import React, { useState } from "react";
import { getDIDRegistryContract } from "../../utils/didContract";
import { toast } from "react-toastify";

export default function AddVerificationMethodForm() {
  const [did, setDid] = useState("");
  const [methodId, setMethodId] = useState("");
  const [controller, setController] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMethod = async () => {
    try {
      setIsAdding(true);
      toast.info("🔧 新增驗證方法中...");

      const contract = await getDIDRegistryContract();
      const tx = await contract.addVerificationMethod(did, methodId, controller);
      await tx.wait();

      toast.success("✅ 驗證方法新增成功！");
      setDid("");
      setMethodId("");
      setController("");
    } catch (err) {
      console.error(err);
      toast.error("❌ 新增失敗，請重試");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">新增驗證方法</h2>
      <input
        type="text"
        value={did}
        onChange={(e) => setDid(e.target.value)}
        placeholder="DID"
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        value={methodId}
        onChange={(e) => setMethodId(e.target.value)}
        placeholder="方法 ID"
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        value={controller}
        onChange={(e) => setController(e.target.value)}
        placeholder="控制者地址"
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={handleAddMethod}
        disabled={isAdding}
        className={`bg-green-500 text-white px-4 py-1 rounded ${
          isAdding ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        }`}
      >
        {isAdding ? "新增中..." : "新增方法"}
      </button>
    </div>
  );
}
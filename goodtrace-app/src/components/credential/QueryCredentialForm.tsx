"use client";
import React, { useState } from "react";
import { getCredentialContract } from "../../utils/credentialContract";
import { toast } from "react-toastify";

export default function QueryCredentialForm() {
  const [credentialId, setCredentialId] = useState("");
  const [info, setInfo] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);

  const handleQuery = async () => {
    try {
      setIsQuerying(true);
      toast.info("🔍 查詢中...");

      const contract = await getCredentialContract();
      const result = await contract.getCredential(credentialId);
      setInfo(JSON.stringify(result, null, 2));

      toast.success("✅ 查詢成功！");
    } catch (err) {
      console.error(err);
      toast.error("❌ 查詢失敗");
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">查詢憑證</h2>
      <input
        type="text"
        value={credentialId}
        onChange={(e) => setCredentialId(e.target.value)}
        placeholder="憑證 ID"
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={handleQuery}
        disabled={isQuerying}
        className={`bg-purple-500 text-white px-4 py-1 rounded ${
          isQuerying ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
        }`}
      >
        {isQuerying ? "查詢中..." : "查詢"}
      </button>
      {info && (
        <div className="mt-2 whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">
          <strong>憑證資訊：</strong>
          <pre>{info}</pre>
        </div>
      )}
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { getCredentialContract } from "../../utils/credentialContract";
import { toast } from "react-toastify";

export default function RevokeCredentialForm() {
  const [credentialId, setCredentialId] = useState("");
  const [isRevoking, setIsRevoking] = useState(false);

  const handleRevoke = async () => {
    try {
      setIsRevoking(true);
      toast.info("🛑 撤銷中...");

      const contract = await getCredentialContract();
      const tx = await contract.revokeCredential(credentialId);
      await tx.wait();

      toast.success("✅ 憑證已撤銷！");
      setCredentialId("");
    } catch (err) {
      console.error(err);
      toast.error("❌ 撤銷失敗");
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">撤銷憑證</h2>
      <input
        type="text"
        value={credentialId}
        onChange={(e) => setCredentialId(e.target.value)}
        placeholder="憑證 ID"
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={handleRevoke}
        disabled={isRevoking}
        className={`bg-red-500 text-white px-4 py-1 rounded ${
          isRevoking ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
        }`}
      >
        {isRevoking ? "撤銷中..." : "撤銷"}
      </button>
    </div>
  );
}
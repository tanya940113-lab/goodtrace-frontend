import React, { useState } from "react";
import { getCredentialContract } from "../../utils/credentialContract";
import { toast } from "react-toastify";

export default function IssueCredentialForm() {
  const [recipient, setRecipient] = useState("");
  const [recordId, setRecordId] = useState("");
  const [isIssuing, setIsIssuing] = useState(false);

  const handleIssue = async () => {
    try {
      setIsIssuing(true);
      toast.info("🚀 開始發行憑證...");

      const contract = await getCredentialContract();
      const tx = await contract.issueCredential(recipient, recordId);
      await tx.wait();

      toast.success("✅ 憑證發行成功！");
      setRecipient("");
      setRecordId("");
    } catch (err) {
      console.error(err);
      toast.error("❌ 發行失敗，請重試");
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">發行憑證</h2>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="接收者地址"
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        value={recordId}
        onChange={(e) => setRecordId(e.target.value)}
        placeholder="農務紀錄 ID"
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={handleIssue}
        disabled={isIssuing}
        className={`bg-blue-500 text-white px-4 py-1 rounded ${
          isIssuing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {isIssuing ? "發行中..." : "發行"}
      </button>
    </div>
  );
}
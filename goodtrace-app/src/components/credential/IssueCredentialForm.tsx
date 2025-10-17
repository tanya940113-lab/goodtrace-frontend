"use client";
import React, { useState, useEffect } from "react";
import { getCredentialContract } from "../../utils/credentialContract";
import { getFarmRecordContract } from "../../utils/farmRecordContract";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export default function IssueCredentialForm() {
  const [recipient, setRecipient] = useState("");
  const [claim, setClaim] = useState("");
  const [recordId, setRecordId] = useState("");
  const [recordIds, setRecordIds] = useState<number[]>([]);
  const [isIssuing, setIsIssuing] = useState(false);

  const recordContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // FarmRecord 合約地址

  useEffect(() => {
    const fetchRecordIds = async () => {
      try {
        const contract = await getFarmRecordContract();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const myAddress = await signer.getAddress();
        const ids = await contract.getRecordIndexesByFarmer(myAddress);
        setRecordIds(ids.map((id: bigint) => Number(id)));
      } catch (err) {
        console.error("查詢農務紀錄失敗：", err);
        toast.error("❌ 無法取得農務紀錄 ID");
      }
    };

    fetchRecordIds();
  }, []);

  const handleIssue = async () => {
    try {
      if (!recipient || !claim || !recordId) {
        toast.warning("⚠️ 請填寫所有欄位");
        return;
      }

      setIsIssuing(true);
      toast.info("🚀 開始發行憑證...");

      const contract = await getCredentialContract();
      const tx = await contract.issueCredential(
        recipient,
        claim,
        recordContractAddress,
        recordId
      );
      await tx.wait();

      toast.success("✅ 憑證發行成功！");
      setRecipient("");
      setClaim("");
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
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder="憑證內容（例如：農務紀錄完成）"
        className="border px-2 py-1 w-full"
      />

      <select
        value={recordId}
        onChange={(e) => setRecordId(e.target.value)}
        className="border px-2 py-1 w-full"
      >
        <option value="">請選擇農務紀錄 ID</option>
        {recordIds.map((id) => (
          <option key={id} value={id}>
            紀錄 #{id}
          </option>
        ))}
      </select>

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
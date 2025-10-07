"use client";
import React, { useState } from "react";
import { getFarmRecordContract } from "../../utils/farmRecordContract";
import { toast } from "react-toastify";

export default function QueryRecordCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleQuery = async () => {
    try {
      setIsQuerying(true);
      toast.info("📊 查詢中...");

      const contract = await getFarmRecordContract();
      const result = await contract.getRecordCount();
      setCount(result.toString());

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
      <h2 className="text-lg font-bold">查詢紀錄總數</h2>
      <button
        onClick={handleQuery}
        disabled={isQuerying}
        className={`bg-blue-500 text-white px-4 py-1 rounded ${
          isQuerying ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {isQuerying ? "查詢中..." : "查詢"}
      </button>
      {count !== null && (
        <div className="mt-2 text-sm bg-gray-100 p-2 rounded">
          <strong>紀錄總數：</strong> {count}
        </div>
      )}
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { getFarmRecordContract } from "../../utils/farmRecordContract";
import { toast } from "react-toastify";

export default function CreateRecordForm() {
  const [farmer, setFarmer] = useState("");
  const [crop, setCrop] = useState("");
  const [activity, setActivity] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      toast.info("🌾 建立中...");

      const contract = await getFarmRecordContract();
      const tx = await contract.createRecord(farmer, crop, activity);
      await tx.wait();

      toast.success("✅ 農務紀錄建立成功！");
      setFarmer("");
      setCrop("");
      setActivity("");
    } catch (err) {
      console.error(err);
      toast.error("❌ 建立失敗，請重試");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">建立農務紀錄</h2>
      <input
        type="text"
        value={farmer}
        onChange={(e) => setFarmer(e.target.value)}
        placeholder="農民地址"
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        placeholder="作物名稱"
        className="border px-2 py-1 w-full"
      />
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="作業內容"
        className="border px-2 py-1 w-full"
      />
      <button
        onClick={handleCreate}
        disabled={isCreating}
        className={`bg-green-500 text-white px-4 py-1 rounded ${
          isCreating ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        }`}
      >
        {isCreating ? "建立中..." : "建立紀錄"}
      </button>
    </div>
  );
}
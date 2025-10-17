"use client";
import React, { useState } from "react";
import { getFarmRecordContract } from "../../utils/farmRecordContract";
import { toast } from "react-toastify";

// 定義 TaskType 枚舉
enum TaskType {
  Sowing = 0,
  Fertilizing = 1,
  Irrigating = 2,
  Harvesting = 3
}

export default function CreateRecordForm() {
  const [task, setTask] = useState<number>(TaskType.Sowing);
  const [crop, setCrop] = useState("");
  const [description, setDescription] = useState("");
  const [didSignature, setDidSignature] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      toast.info("🌾 建立中...");

      const contract = await getFarmRecordContract();
      const tx = await contract.createRecord(task, crop, description, didSignature);
      await tx.wait();

      toast.success("✅ 農務紀錄建立成功！");
      setCrop("");
      setDescription("");
      setDidSignature("");
      setTask(TaskType.Sowing);
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

      <label className="block">作業類型：</label>
      <select
        value={task}
        onChange={(e) => setTask(Number(e.target.value))}
        className="border px-2 py-1 w-full"
      >
        <option value={TaskType.Sowing}>播種</option>
        <option value={TaskType.Fertilizing}>施肥</option>
        <option value={TaskType.Irrigating}>灌溉</option>
        <option value={TaskType.Harvesting}>收割</option>
      </select>

      <label className="block">作物名稱：</label>
      <input
        type="text"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        placeholder="例如：番茄"
        className="border px-2 py-1 w-full"
      />

      <label className="block">作業內容：</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="例如：施肥作業"
        className="border px-2 py-1 w-full"
      />

      <label className="block">DID 簽章：</label>
      <input
        type="text"
        value={didSignature}
        onChange={(e) => setDidSignature(e.target.value)}
        placeholder="例如：did:example:123456789abcdefghi"
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
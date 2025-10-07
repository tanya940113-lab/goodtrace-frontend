import React, { useState } from "react";
import { getDIDRegistryContract } from "../../utils/didContract";
import { toast } from "react-toastify";

export default function ResolveControllerForm() {
  const [did, setDid] = useState("");
  const [methodId, setMethodId] = useState("");
  const [controller, setController] = useState("");
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = async () => {
    try {
      setIsResolving(true);
      toast.info("🔍 查詢中...");

      const contract = await getDIDRegistryContract();
      const result = await contract.resolveVerificationController(did, methodId);
      setController(result);

      toast.success("✅ 查詢成功！");
    } catch (err) {
      console.error(err);
      toast.error("❌ 查詢失敗");
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">查詢驗證控制者</h2>
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
      <button
        onClick={handleResolve}
        disabled={isResolving}
        className={`bg-purple-500 text-white px-4 py-1 rounded ${
          isResolving ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
        }`}
      >
        {isResolving ? "查詢中..." : "查詢控制者"}
      </button>
      {controller && (
        <div className="mt-2 text-sm bg-gray-100 p-2 rounded">
          <strong>控制者地址：</strong> {controller}
        </div>
      )}
    </div>
  );
}
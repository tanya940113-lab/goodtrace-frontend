import CreateRecordForm from "@/components/farmRecord/CreateRecordForm";
import QueryRecordCount from "@/components/farmRecord/QueryRecordCount";

export default function FarmRecordPage() {
  return (
    <div className="min-h-screen bg-[#fff9e6] text-gray-900 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">農務紀錄管理介面</h1>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <CreateRecordForm />
        </div>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <QueryRecordCount />
        </div>
      </div>
    </div>
  );
}
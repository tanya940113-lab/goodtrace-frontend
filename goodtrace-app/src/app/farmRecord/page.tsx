import CreateRecordForm from "@/components/farmRecord/CreateRecordForm";
import QueryRecordCount from "@/components/farmRecord/QueryRecordCount";

export default function FarmRecordPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold text-center">農務紀錄管理介面</h1>
      <CreateRecordForm />
      <QueryRecordCount />
    </div>
  );
}

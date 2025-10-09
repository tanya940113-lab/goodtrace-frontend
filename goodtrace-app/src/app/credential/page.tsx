import IssueCredentialForm from "@/components/credential/IssueCredentialForm";
import RevokeCredentialForm from "@/components/credential/RevokeCredentialForm";
import QueryCredentialForm from "@/components/credential/QueryCredentialForm";

export default function CredentialPage() {
  return (
    <div className="min-h-screen bg-[#fff9e6] text-gray-900 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">憑證管理介面</h1>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <IssueCredentialForm />
        </div>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <RevokeCredentialForm />
        </div>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <QueryCredentialForm />
        </div>
      </div>
    </div>
  );
}
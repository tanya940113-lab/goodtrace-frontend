import RegisterDIDForm from "@/components/did/RegisterDIDForm";
import AddVerificationMethodForm from "@/components/did/AddVerificationMethodForm";
import ResolveControllerForm from "@/components/did/ResolveControllerForm";

export default function DIDPage() {
  return (
    <div className="min-h-screen bg-[#fff9e6] text-gray-900 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">DID 管理介面</h1>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <RegisterDIDForm />
        </div>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <AddVerificationMethodForm />
        </div>

        <div className="border border-gray-600 rounded-lg p-4 shadow-md bg-white">
          <ResolveControllerForm />
        </div>
      </div>
    </div>
  );
}
import RegisterDIDForm from "@/components/did/RegisterDIDForm";
import AddVerificationMethodForm from "@/components/did/AddVerificationMethodForm";
import ResolveControllerForm from "@/components/did/ResolveControllerForm";

export default function DIDPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold text-center">DID 管理介面</h1>
      <RegisterDIDForm />
      <AddVerificationMethodForm />
      <ResolveControllerForm />
    </div>
  );
}

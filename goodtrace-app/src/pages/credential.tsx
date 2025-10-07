import IssueCredentialForm from "../components/credential/IssueCredentialForm";
import RevokeCredentialForm from "../components/credential/RevokeCredentialForm";
import QueryCredentialForm from "../components/credential/QueryCredentialForm";

export default function CredentialPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold text-center">憑證管理介面</h1>
      <IssueCredentialForm />
      <RevokeCredentialForm />
      <QueryCredentialForm />
    </div>
  );
}
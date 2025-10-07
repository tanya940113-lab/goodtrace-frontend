import { Contract } from "ethers";

export function useVC(vcContract?: Contract) {
  // 發行 VC
  async function issueCredentialOnChain(
    cid: string,
    types: string[],
    subject: string,
    credentialSubject: any,
    recordContract: string,
    recordIndex: number
  ) {
    if (!vcContract) throw new Error("VC Contract not initialized");
    const tx = await vcContract.issueCredentialOnChain(
      cid,
      [], // context 可先空
      types,
      subject,
      credentialSubject,
      recordContract,
      recordIndex
    );
    await tx.wait();
    return tx;
  }

  return { issueCredentialOnChain };
}

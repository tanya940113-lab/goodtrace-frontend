import { ethers } from "ethers";
import VerifiableCredentialABI from "../abi/VerifiableCredential.json";

const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // 請依照實際部署地址更新

export async function getCredentialContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, VerifiableCredentialABI, signer);
}
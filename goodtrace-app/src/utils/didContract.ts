import { ethers } from "ethers";
import DIDRegistryABI from "../abi/DIDRegistry.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function getDIDRegistryContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, DIDRegistryABI, signer);
}

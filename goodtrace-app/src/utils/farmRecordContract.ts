import { ethers } from "ethers";
import FarmRecordABI from "../abi/FarmRecord.json";

const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // 請依照實際部署地址更新

export async function getFarmRecordContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, FarmRecordABI, signer);
}
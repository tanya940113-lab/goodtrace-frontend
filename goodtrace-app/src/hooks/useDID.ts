import { useState } from "react";
import { ethers } from "ethers";

// ✅ 你的合約 ABI
const DID_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "account", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "did", "type": "string" }
    ],
    "name": "DIDRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "vmId", "type": "string" },
      { "indexed": false, "internalType": "address", "name": "controller", "type": "address" }
    ],
    "name": "VerificationMethodAdded",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "entryId", "type": "uint256" },
      { "internalType": "string", "name": "vmId", "type": "string" },
      { "internalType": "address", "name": "controller", "type": "address" }
    ],
    "name": "addVerificationMethod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "entries",
    "outputs": [
      { "internalType": "address", "name": "account", "type": "address" },
      { "internalType": "string", "name": "did", "type": "string" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "string", "name": "metadata", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "latestIndex",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "did", "type": "string" },
      { "internalType": "string", "name": "metadata", "type": "string" }
    ],
    "name": "registerDID",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "did", "type": "string" },
      { "internalType": "string", "name": "vmId", "type": "string" }
    ],
    "name": "resolveVerificationController",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export function useDID(didAddress?: string, provider?: ethers.BrowserProvider) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** 🔹 註冊 DID */
  const registerDID = async (did: string, metadata: string) => {
    if (!didAddress || !provider) {
      setError("缺少合約地址或 provider");
      return;
    }

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(didAddress, DID_ABI, signer);
      const tx = await contract.registerDID(did, metadata);
      await tx.wait();
      setLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  /** 🔹 查詢 DID */
  const getEntry = async (index: number) => {
    if (!didAddress || !provider) {
      setError("缺少合約地址或 provider");
      return null;
    }

    try {
      const contract = new ethers.Contract(didAddress, DID_ABI, provider);
      const result = await contract.entries(index);
      return result;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return { registerDID, getEntry, loading, error };
}

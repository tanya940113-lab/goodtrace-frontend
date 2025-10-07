// useContract.ts
import { useState } from "react";
import { BrowserProvider, Contract, Signer } from "ethers";
import DIDRegistryABI from "../abi/DIDRegistry.json";
import VCABI from "../abi/VerifiableCredential.json";
import FarmerCordABI from "../abi/FarmRecord.json";

// ✅ 合約地址（本地部署）
const DID_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const VC_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const FARMERCORD_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export interface UseContractResult {
  connectWallet: () => Promise<void>;
  account: string;
  provider?: BrowserProvider;
  signer?: Signer;
  didContract?: Contract;
  vcContract?: Contract;
  farmercordContract?: Contract;
}

export function useContract(): UseContractResult {
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signer, setSigner] = useState<Signer>();
  const [didContract, setDidContract] = useState<Contract>();
  const [vcContract, setVcContract] = useState<Contract>();
  const [farmercordContract, setFarmercordContract] = useState<Contract>();
  const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("請安裝 MetaMask");
      return;
    }

    try {
      const _provider = new BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _account = await _signer.getAddress();

      setProvider(_provider);
      setSigner(_signer);
      setAccount(_account);

      setDidContract(new Contract(DID_ADDRESS, DIDRegistryABI, _signer));
      setVcContract(new Contract(VC_ADDRESS, VCABI, _signer));
      setFarmercordContract(new Contract(FARMERCORD_ADDRESS, FarmerCordABI, _signer));
    } catch (err) {
      console.error("Connect wallet error:", err);
    }
  };

  return {
    connectWallet,
    account,
    provider,
    signer,
    didContract,
    vcContract,
    farmercordContract,
  };
}
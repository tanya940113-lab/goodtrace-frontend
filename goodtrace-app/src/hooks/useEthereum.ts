import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useEthereum() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const prov = new BrowserProvider(window.ethereum);
      setProvider(prov);
    } else {
      console.warn("MetaMask not detected");
    }
  }, []);

  const connect = async () => {
    if (!window.ethereum) return;
    try {
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) setAccount(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  return { account, provider, connect };
}

import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Subscribe = () => {
  const [user, setUser] = useState("");
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [greeting, setGreeting] = useState("Connect");
  const contractAddress = "0x027fc52f721E932B1B480D3C728ca83e24975857";
  const db = getFirestore();

  const provider = new ethers.BrowserProvider(window.ethereum);
  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setUser(accounts[0]);
    }
  };

  const handleBuy = async () => {
    if (!user) {
      setGreeting("Connecting");
      if (window.ethereum) {
        const accounts = await provider.send("eth_requestAccounts", []);
        setUser(accounts[0]);
      }
      setGreeting("Buy");
    } else {
      setGreeting("Loading");
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      let _price = price.toString();
      setFinalPrice(_price);

      const tx = await signer.sendTransaction({
        to: "0x83f5ebac3c2806ef448946c19a371076b6a6d0ca",
        value: ethers.parseEther(_price),
      });
      setGreeting("Processing");
      let receipt = await tx.wait();
      setGreeting("Buy");
      console.log("Transaction Complete", receipt);
    }
  };
  return (
    <div>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Subscribe;

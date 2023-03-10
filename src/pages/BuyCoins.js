import { ethers } from "ethers";
import { useState, useEffect } from "react";
import React from "react";
import abi from "../constants/abi.json";

const BuyCoins = () => {
  const [user, setUser] = useState("");
  const [price, setPrice] = useState(0);
  const [greeting, setGreeting] = useState("Buy");
  const [finalPrice, setFinalPrice] = useState(0);
  const contractAddress = "0x027fc52f721E932B1B480D3C728ca83e24975857";

  const provider = new ethers.BrowserProvider(window.ethereum);
  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setUser(accounts[0]);
    }
  };

  const handleAccChange = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    setUser(accounts[0]);
  };

  const handleBuy = async () => {
    try {
      setFinalPrice(price);
      setGreeting("Loading");
      const signer = await provider.getSigner();

      let _price = price.toString();

      const tx = await signer.sendTransaction({
        to: "0x83f5ebac3c2806ef448946c19a371076b6a6d0ca",
        value: ethers.parseEther(_price),
      });
      setGreeting("Processing");
      setGreeting("Buy");
      console.log("Transaction Complete");
    } catch (error) {
      setGreeting("Buy");
      console.log(error);
    }
  };

  const changePrice = (operation) => {
    if (!operation) {
      if (price > 0) setPrice(price - 1);
    } else setPrice(price + 1);
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccChange);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className=" text-center">
        {!user ? (
          <button className="addr" onClick={handleConnect}>
            Connect
          </button>
        ) : (
          <button className="addr">
            {user.substring(0, 4) + "..." + user.substring(38)}
          </button>
        )}
      </div>

      <div className="w-[30%] m-auto flex rounded-sm justify-between items-center bg-gray-300">
        <button
          className="hover:bg-gray-500 px-2 text-xl rounded-sm text-center font-bold"
          onClick={() => changePrice(false)}
        >
          -
        </button>
        <input
          type="number"
          className="w-[40%] m-auto outline-none bg-inherit text-center"
          value={price}
          readOnly
        />
        <button
          className="hover:bg-gray-500 px-2 text-xl rounded-sm text-center font-bold"
          onClick={() => changePrice(true)}
        >
          +
        </button>
      </div>
      <button
        className="px-32 bg-red-400 text-2xl font-extrabold"
        onClick={handleBuy}
      >
        {greeting}
      </button>
    </div>
  );
};

export default BuyCoins;
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import React from "react";
import abi from "../constants/abi.json";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

const BuyCoins = () => {
  const [muser, setMuser] = useState("");
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [error, setError] = useState("");
  const [dbData, setDbData] = useState({});
  const [greeting, setGreeting] = useState("Connect");
  const { user, authState } = useUserAuth();
  const contractAddress = "0x027fc52f721E932B1B480D3C728ca83e24975857";
  const db = getFirestore();

  const provider = new ethers.BrowserProvider(window.ethereum);
  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setMuser(accounts[0]);
    }
  };
  const getDb = async () => {
    const docRef = doc(db, "users", user?.uid);
    try {
      const docSnap = await getDoc(docRef);
      setDbData(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccChange = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    setMuser(accounts[0]);
  };

  const handleBuy = async () => {
    if (!muser) {
      setGreeting("Connecting");
      if (window.ethereum) {
        const accounts = await provider.send("eth_requestAccounts", []);
        setMuser(accounts[0]);
      }
      setGreeting("Buy");
    } else {
      try {
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
        handleCoins();
      } catch (error) {
        console.log(error);
        setGreeting("Buy");
      }
    }
  };

  const handleCoins = async () => {
    setError("");
    let change = 500 * finalPrice;

    try {
      const docRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(docRef, {
          coins: dbData?.coins + change,
        });
        getDb();
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const changePrice = (operation) => {
    if (!operation) {
      if (price > 0) setPrice(price - 1);
    } else setPrice(price + 1);
  };
  useEffect(() => {
    if (muser) setGreeting("Buy");
  }, []);

  useEffect(() => {
    getDb();
  }, [user]);

  return (
    // <div className="flex flex-col justify-center">
    //   <div className="text-center">
    //     {!muser ? (
    //       <div className="addr">{muser}</div>
    //     ) : (
    //       <div className="addr">
    //         {muser.substring(0, 4) + "..." + muser.substring(38)}
    //       </div>
    //     )}
    //   </div>

    //   <div className="w-[30%] m-auto flex rounded-sm justify-between items-center bg-gray-300">
    //     <button
    //       className="hover:bg-gray-500 px-2 text-xl rounded-sm text-center font-bold"
    //       onClick={() => changePrice(false)}
    //     >
    //       -
    //     </button>
    //     <input
    //       type="number"
    //       className="w-[40%] m-auto outline-none bg-inherit text-center"
    //       value={price}
    //     />
    //     <button
    //       className="hover:bg-gray-500 px-2 text-xl rounded-sm text-center font-bold"
    //       onClick={() => changePrice(true)}
    //     >
    //       +
    //     </button>
    //   </div>
    //   <button
    //     className="px-32 bg-red-400 text-2xl font-extrabold"
    //     onClick={handleBuy}
    //   >
    //     {greeting}
    //   </button>
    // </div>

    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        Standard plan
      </h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-3xl font-semibold">$</span>
        <span class="text-5xl font-extrabold tracking-tight">49</span>
        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /month
        </span>
      </div>
      {/* <!-- List --> */}
      <ul role="list" class="space-y-5 my-7">
        <li class="flex space-x-3">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            2 team members
          </span>
        </li>
      </ul>
      <button
        type="button"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onClick={handleBuy}
      >
        Choose plan
      </button>
    </div>
  );
};

export default BuyCoins;

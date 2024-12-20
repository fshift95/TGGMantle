import { ethers } from "ethers";
import { useState } from "react";

const SendMTransaction = ({ state }) => {
  const [wallet, setWallet] = useState({
    walletphrase: null,
    walletAddress1: null,
  });

  const startTransaction = async () => {
    const { contract } = state;

    // const transaction = await contract.getFunction("claimedWallet").call(null);
    const walletphrase = await contract.claimedWallet();
    const walletAddress1 = await contract.walletAddress1();

    console.log("walletphrase", walletphrase);
    console.log("walletAddress1", walletAddress1);
    console.log("typeof", typeof walletphrase);
    console.log("length", walletphrase.length);
    if (typeof walletphrase === "string" && walletphrase.length > 0) {
      setWallet((prevState) => ({
        ...prevState,
        walletphrase,
      }));
    }

    if (typeof walletAddress1 === "string" && walletAddress1.length > 0) {
      setWallet((prevState) => ({
        ...prevState,
        walletAddress1,
      }));
    }
    // console.log("transactionsss", transactions);
  };

  return (
    <div>
      <div onClick={startTransaction} className="cursor-pointer">
        This is a test TRansaction to Contract
        <div>
          {wallet.walletphrase != null ? (
            <div className="py-8">
              The phrase is
              <div className="text-red-400 font-bold ">
                {wallet.walletphrase}
              </div>
            </div>
          ) : null}
          {wallet.walletAddress1 != null ? (
            <div className="text-red-400 font-bold ">
              {" "}
              {wallet.walletAddress1}{" "}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SendMTransaction;

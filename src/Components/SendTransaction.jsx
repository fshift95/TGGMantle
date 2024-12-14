import { ethers } from "ethers";
import { useState } from "react";

const SendMTransaction = ({ state }) => {
  const [wallet, setWallet] = useState({
    walletphrase: null,
  });

  const startTransaction = async () => {
    const { contract } = state;

    // const transaction = await contract.getFunction("claimedWallet").call(null);
    const transaction = await contract.claimedWallet();

    console.log("transaction", transaction);
    console.log("typeof", typeof transaction);
    console.log("length", transaction.length);
    if (typeof transaction === "string" && transaction.length > 0) {
      setWallet({ walletphrase: transaction });
    }
    // console.log("transactionsss", transactions);
  };

  return (
    <div onClick={startTransaction} className="cursor-pointer">
      This is a test TRansaction to Contract
      <div>
        {wallet.walletphrase != null ? (
          <div className="py-8">
            The phrase is
            <div className="text-red-400 font-bold ">{wallet.walletphrase}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default SendMTransaction;

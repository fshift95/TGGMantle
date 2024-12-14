import { ethers } from "ethers";
import { useState } from "react";

const WriteTransaction = ({ state }) => {
  const [wallet, setWallet] = useState({
    walletphrase: null,
    walletAddress1: null,
  });

  const startTransaction = async () => {
    const { contract } = state;

    // const transaction = await contract.getFunction("claimedWallet").call(null);

    const walletAddress1 = await contract.store_wallet1(
      "dsds dffsdf e fdf sdf df ",
      "0xf8A80B46fA1CD68e061E60B5F71BDde32B7F3440"
    );
    // const walletAddress1 = await contract.setScore("25");

    console.log("walletphrase", walletAddress1);

    // console.log("transactionsss", transactions);
  };

  return (
    <div>
      <div onClick={startTransaction} className="cursor-pointer">
        This is a Writing test TRansaction to Contract
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
export default WriteTransaction;

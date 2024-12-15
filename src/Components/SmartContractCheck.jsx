import { Wallet } from "ethers";
import { ethers } from "ethers";
import { useState } from "react";

//change also key vessel sound april knock annual subway pudding sentence inhale

const SmartContractCheck = ({ state }) => {
  const [wallet, setWallet] = useState({
    walletphrase: null,
    walletAddress1: null,
  });
  const [balance, setBalance] = useState(0);
  const { contract } = state;
  const { provider } = state;

  const claimGoldenwallet = async () => {
    const wallet = Wallet.fromPhrase(
      ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16))
    );
    let answer = "acbbbcbbcbdb";
    // contract
    //   .claimGoldenWallet(wallet.mnemonic.phrase, wallet.address, answer)
    //   .on("transactionHash", (hash) => {
    //     console.log("Transaction Hash:", hash);
    //   })
    //   .on("receipt", (receipt) => {
    //     console.log("Transaction Receipt:", receipt);
    //   })
    //   .on("error", (error) => {
    //     console.error("Transaction Error:", error);
    //   });
    console.log("mnemonic", wallet.mnemonic.phrase);
    const rss = await contract
      .claimGoldenWallet(wallet.mnemonic.phrase, wallet.address, answer)
      .then((addr) => {
        console.log("resss", addr.data);
        console.log("resss", addr);
        console.log(
          addr.wait().then((s) => {
            console.log("TransactionReceipt", s.return_value);
          })
        );
      });

    //   setWallet({ walletphrase: addr });
    // });
    console.log("transaction obj", rss);
  };

  const startTransaction = async () => {
    const GoldenWalletBalance = await contract.walletAddress1().then((addr) => {
      provider.getBalance(addr).then((t) => {
        setBalance(ethers.formatEther(t));
      });
    });

    // const address1 = "0x2643f0eC95314E7A74C6c2bb3137f676eB8a12bE";
    // const bal = provider.getBalance(address1).then((t) => {
    //   setBalance(ethers.formatEther(t));
    // });

    // const balance = ethers.formatEther(bal); // wei balance convert to eth balance
    // console.log(bal);
    //console.log(balance);
  };

  const claimwinner = async () => {
    const GoldenWalletBalance = await contract
      .getGoldenWalletPrize()
      .then((addr) => {
        console.log(addr);
      });
  };

  const sendTransaction = async () => {
    const payEntranceFee = await contract
      .payEntranceFee("0x2643f0eC95314E7A74C6c2bb3137f676eB8a12bE", {
        value: "2000000000000000000",
      })
      .then((addr) => {
        console.log(addr);
      });
  };

  const checkReadonly = async () => {
    const claimedWallet = await contract.walletAddress1.call().then((addr) => {
      console.log(addr);
    });
  };

  return (
    <div>
      <div onClick={startTransaction} className="cursor-pointer">
        Check Golden Wallet account balance
      </div>
      {balance != 0 ? <div>balance is {balance}</div> : null}

      <div onClick={claimGoldenwallet} className="cursor-pointer teext-xl py-4">
        Submit Answers
      </div>
      <div onClick={claimwinner} className="cursor-pointer teext-xl py-4">
        claimGoldenwallet
      </div>
    </div>
  );
};
export default SmartContractCheck;

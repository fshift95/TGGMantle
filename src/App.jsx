import "./App.css";
import abi from "./Contracts/WalletWin/WinWalletABI.json";
import {
  MetaMaskButton,
  MetaMaskProvider,
  useAccount,
  useSDK,
  useSignMessage,
} from "@metamask/sdk-react-ui";

import { Wallet, ethers } from "ethers";
import { useEffect, useState } from "react";
import SendMTransaction from "./Components/SendTransaction";

function newWallet() {
  const wallet = Wallet.fromPhrase(
    // ethers.Mnemonic.entropyToMnemonic(ethers.randomBytes(32))
    ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16))
  );
  console.log("wallet.address:", wallet.address);
  console.log("wallet.mnemonic.phrase:", wallet.mnemonic.phrase);
  console.log("wallet.publicKey:", wallet.publicKey);
  console.log("wallet.privateKey:", wallet.privateKey);

  // return wallet;
}

async function addMAntle() {
  try {
    await window.ethereum // Or window.ethereum if you don't support EIP-6963.
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x138B" }],
      });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum // Or window.ethereum if you don't support EIP-6963.
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x138B",
                chainName: "...",
                rpcUrls: ["https://rpc.sepolia.mantle.xyz"] /* ... */,
              },
            ],
          });
      } catch (addError) {
        // Handle "add" error.
      }
    }
    // Handle other "switch" errors.
  }
}

function AppReady() {
  // fromm vidtut
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xf8A80B46fA1CD68e061E60B5F71BDde32B7F3440";
      const contractABI = abi;
      const { ethereum } = window;
      // const account = await ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      console.log(
        "contract",
        contract.interface.forEachFunction((f) => console.log(f))
      );
      setState({ provider, signer, contract });
    };

    template();
  }, []);

  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,

    signMessage,
  } = useSignMessage({
    message: "Hello WinWallet friends",
  });
  const { isConnected } = useAccount();
  // fromm https://github.com/MetaMask/metamask-sdk/blob/main/packages/examples/react-metamask-button/src/App.js
  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
        {isConnected && (
          <>
            <div style={{ marginTop: 20 }}>
              <button disabled={isSignLoading} onClick={() => signMessage()}>
                Sign message
              </button>

              <div onClick={addMAntle} className="">
                addMAntle
              </div>
              <div>
                <SendMTransaction state={state} />
              </div>
              <div
                className="cursor-pointer p-2 rounded bg-red-200 "
                onClick={newWallet}
              >
                NewWallet
              </div>
              {isSignSuccess && <div>Signature: {signData}</div>}
              {isSignError && <div>Error signing message</div>}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

function App() {
  const { ready } = useSDK();

  if (!ready) {
    return <div>Loading...</div>;
  }

  return <AppReady />;

  // return (
  //   <div className="text-3xl font-bold underline cursor-pointer">
  //     {" "}
  //     Welcome To Telegram And Mantle Game
  //     <div className="mt-8">
  //       <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
  //     </div>
  //   </div>
  // );
}

export default App;

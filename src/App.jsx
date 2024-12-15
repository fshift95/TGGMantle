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
import WriteTransaction from "./Components/WriteTransaction";
import Start from "./Components/Pages/Start";
import Page1 from "./Components/Pages/Page1";
import Page20 from "./Components/Pages/TutWallet/Page20";
import SmartContractCheck from "./Components/SmartContractCheck";

// const privateKey = generatePrivateKey();
// const account = privateKeyToAccount(`${privateKey}`);

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

function AppReady(customeProvider) {
  // fromm vidtut
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [page, setPage] = useState({
    pageNumber: 0,
  });

  const changePage = (pageNumber) => {
    console.log("page is  ", pageNumber);
    setPage({ pageNumber });
  };
  useEffect(() => {
    const template = async () => {
      // const biconomy = new Biconomy(providerr, {
      //   apiKey: "VOyh93jty.7c99111d-083c-4802-ad8a-8f22779097eb",

      //   debug: true,
      // });
      // biconomy
      //   .onEvent(biconomy.READY, () => {
      //     console.log("reaaaaadyyyyyyyyyyyy");
      //   })
      //   .onEvent(biconomy.ERROR, (error, message) => {
      //     // Handle error while initializing mexa
      //   });

      //  const contractAddress = "0xf8A80B46fA1CD68e061E60B5F71BDde32B7F3440";
      // const contractAddress = "0xf943868f2e0c7d1Dd8E00Aa527D870A1C05e25Da";
      //const contractAddress = "0x3238ce9fCe8BF4A38a443F597BbfAF540478CD97";
      //const contractAddress = "0xF763BFcC24C2dc8Ae94d2abf3f69b2F8996b08B2";
      //const contractAddress = "0xbDf1a21A4fD030112dE2E88250E49453c0D322D8";
      //const contractAddress = "0x20Cc3E09e49EB89c0c96C0e9c99a17885a9E48A6";
      //const contractAddress = "0x7C3b69b379A2d106D1Ff9600Da590eF72e000772";
      const contractAddress = "0x677A6E0616fBB2894a23340E19D77987D88FcC74";
      const contractABI = abi;
      const { ethereum } = window;
      // const account = await ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // const provider = new ethers.BrowserProvider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
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
    <div className="App  w-full flex flex-col jestify-center items-center">
      <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
      {page.pageNumber == 0 ? <Start changePage={changePage} /> : null}
      {page.pageNumber == 1 ? (
        <Page1 state={state} changePage={changePage} />
      ) : null}
      {page.pageNumber == 20 ? (
        <Page20 changePage={changePage} state={state} />
      ) : null}
      <header className="App-header w-full"></header>
    </div>
  );
}

function App() {
  const { ready } = useSDK(); // was inside the block

  if (!ready) {
    return <div>Loading...</div>;
  }

  return <AppReady />;
}

export default App;

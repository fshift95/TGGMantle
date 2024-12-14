import { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from "ethers";
import { EtherspotBundler, ModularSdk } from '@etherspot/modular-sdk';
import { ERC20_ABI } from '../abi/ERC20_ABI';
import * as dotenv from 'dotenv';
import { sleep } from '@etherspot/modular-sdk/dist/sdk/common';

dotenv.config();

// Setup Web3Auth parameters and initialize chain configurations
const clientId = "WEBS_AUTH_ID";
const erc20TokenAddress = '0x2E71C75Ad02E8ad2eC0f1469de1FC3d835B5E7AD';
const apiKey = "arka_public_key";
const explorerBaseUrl = "https://explorer.apothem.network/";

// Chain configuration for the XDC Apothem test network
const chainConfig = {
  chainId: "0x33",
  rpcTarget: "https://erpc.apothem.network",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "XDC APOTHEM",
  blockExplorerUrl: "https://explorer.apothem.network/",
  ticker: "XDC",
  tickerName: "Xinfin",
  logo: "https://images.toruswallet.io/eth.svg",
};

// Setting up the Ethereum private key provider for Web3Auth
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});

// Initialize Web3Auth instance
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});


// Main component function handling Smart Account and minting with Account Abstraction
export function SmartAccountW() {
  const [userPrivateKey, setUserPrivateKey] = useState<string | null>(null); // State for user's private key
  const [message, setMessage] = useState<string | JSX.Element>("");
  const [showPopup, setShowPopup] = useState(false); // State to show/hide popup
  const [recipient, setRecipient] = useState<string>(""); // State for the input user address
  const [value, setValue] = useState<string>(""); // State for the input user address

  // Initialize Web3Auth and Smart Account on component mount
  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal(); // Initialize Web3Auth modal
        await web3auth.connect(); // Connect to Web3Auth
        if (web3auth.connected) {
          // Fetch private key after connection
          const privateKey = await web3auth.provider?.request({
            method: "eth_private_key",
          });
          if (privateKey) {
            const formattedPrivateKey = `0x${privateKey}`;
            setUserPrivateKey(formattedPrivateKey);
            const wallet = new ethers.Wallet(formattedPrivateKey);

            setShowPopup(true); // Display popup with connection details
          }
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
        setMessage("Error initializing Web3Auth. Please try again.");
        setShowPopup(true);
      }
    };
    initWeb3Auth();
  }, []);



  // Function to mint ERC20 tokens using PayMaster (gasless transaction)
  const handleERC20MintWithPayMaster = async () => {
    if (!userPrivateKey) {
      console.error("User not authenticated");
      setMessage("Error: User not authenticated");
      setShowPopup(true);
      return;
    }

    try {
      const modularSdk = new ModularSdk(
        { privateKey: userPrivateKey },
        {
          chainId: Number(51),
          bundlerProvider: new EtherspotBundler(Number(51)),
        }
      );

      const balance: string = await modularSdk.getNativeBalance();
      console.log("EtherspotWallet balance before:", balance);
      console.log("SCW", await modularSdk.getCounterFactualAddress());

      const provider = new ethers.providers.JsonRpcProvider(process.env.BUNDLER_URL);
      const erc20Instance = new ethers.Contract(erc20TokenAddress, ERC20_ABI, provider);

      const transactionData = erc20Instance.interface.encodeFunctionData('mint', [recipient, ethers.utils.parseEther(value)]);
      const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: erc20TokenAddress, data: transactionData });

      const op = await modularSdk.estimate({
        paymasterDetails: { url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${Number(51)}`, context: { mode: 'sponsor' } }
      });

      const uoHash = await modularSdk.send(op);
      console.log(`UserOpHash: ${uoHash}`);

      console.log('Waiting for transaction...');
      let userOpsReceipt = null;
      const timeout = Date.now() + 60000; // 1 minute timeout
      while ((userOpsReceipt == null) && (Date.now() < timeout)) {
        await sleep(2);
        userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
      }
      console.log('Transaction Receipt: ', userOpsReceipt);

      const Pbalance: string = await modularSdk.getNativeBalance();
      console.log("EtherspotWallet After:", Pbalance);

      const transactionLink = `${explorerBaseUrl}tx/${userOpsReceipt.receipt.transactionHash}`;
      setMessage(
        <span style={{ color: "green" }}> {/* Change the text color */}
          Mint with PayMaster successful! View the transaction here:{" "}
          <a
            href={transactionLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }} // Change the link color
          >
            {transactionLink}
          </a>
        </span>
      );
      setShowPopup(true);
    } catch (error) {
      console.error("Error in minting transaction:", error);
      setMessage("Error in minting transaction with PayMaster. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="app-container">
    <div className="paymaster-section">
      <h3>Mint with Smart Account + PayMaster (Gasless)</h3>
      <input type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)} 
          placeholder="Enter recipient address" 
          className="input-field"
        />
        <label className="label">Token Amount:</label>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter token amount" 
          className="input-field"
        />
      <button className="action-button" onClick={handleERC20MintWithPayMaster} disabled={!userPrivateKey}>
        Mint ERC20 with PayMaster
      </button>
    </div>
    {showPopup}
  </div>
  );
 }

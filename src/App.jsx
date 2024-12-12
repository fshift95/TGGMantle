import "./App.css";

import {
  MetaMaskButton,
  MetaMaskProvider,
  useAccount,
  useSDK,
  useSignMessage,
} from "@metamask/sdk-react-ui";

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
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: "gm wagmi frens",
  });

  const { isConnected } = useAccount();

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

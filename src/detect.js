//from https://docs.metamask.io/wallet/tutorials/javascript-dapp-simple/
async function setup() {
  const provider = await detectEthereumProvider();

  if (provider && provider === window.ethereum) {
    console.log("MetaMask is available!");
    startApp(provider); // Initialize your dapp with MetaMask.
  } else {
    console.log("Please install MetaMask!");
  }
}
function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?");
  }
}
window.addEventListener("load", setup);

const chainId = await window.ethereum.request({ method: "eth_chainId" });

window.ethereum.on("chainChanged", handleChainChanged);

function handleChainChanged(chainId) {
  // We recommend reloading the page, unless you must do otherwise.
  window.location.reload();
}

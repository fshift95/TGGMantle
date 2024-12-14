import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "WinWallet Game on Mantle",
          url: window.location.href,
        },

        infuraAPIKey: import.meta.env.INFURA_API_KEY,
        // Other options.
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </StrictMode>
);

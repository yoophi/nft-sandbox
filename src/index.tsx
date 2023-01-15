import { getDefaultProvider } from "ethers";
import React from "react";
import ReactDOM from "react-dom/client";
import { createClient, WagmiConfig } from "wagmi";
import "./index.css";
import { Profile } from "./Profile";

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <Profile />
    </WagmiConfig>
  </React.StrictMode>
);

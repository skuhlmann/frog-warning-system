import React from "react";
import ReactDOM from "react-dom/client";
import { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { DHConnectProvider } from "@daohaus/connect";
import { HausThemeProvider } from "@daohaus/ui";
import { HashRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { HAUS_RPC } from "@daohaus/keychain-utils";

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
        5: `https://${import.meta.env.VITE_RIVET_KEY}.goerli.rpc.rivet.cloud/`,
        100: HAUS_RPC["0x64"],
      },
    },
  },
};

export const web3modalOptions = {
  cacheProvider: true,
  providerOptions,
  theme: "dark",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <DHConnectProvider web3modalOptions={web3modalOptions}>
          <Routes />
        </DHConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);

import { useDHConnect } from "@daohaus/connect";
import { Outlet } from "react-router-dom";

import { useDao } from "@daohaus/moloch-v3-context";
import { TXBuilder } from "@daohaus/tx-builder";

import { DAO_ADDRESS, DAO_CHAIN, SAFE_ADDRESS } from "../utils/constants";
import { HAUS_RPC } from "@daohaus/keychain-utils";

export const HomeContainer = () => {
  const { provider } = useDHConnect();
  const { dao } = useDao();

  return (
    <TXBuilder
      provider={provider}
      chainId={DAO_CHAIN}
      daoId={DAO_ADDRESS}
      safeId={SAFE_ADDRESS}
      appState={{ dao }}
      rpcs={{
        "0x1": `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
        "0x5": `https://${
          import.meta.env.VITE_RIVET_KEY
        }.goerli.rpc.rivet.cloud/`,
        "0x64": HAUS_RPC["0x64"],
      }}
    >
      <Outlet />
    </TXBuilder>
  );
};

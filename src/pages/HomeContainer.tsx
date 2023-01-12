import { useDHConnect } from "@daohaus/connect";
import { Outlet } from "react-router-dom";

import { useDao } from "@daohaus/moloch-v3-context";
import { TXBuilder } from "@daohaus/tx-builder";

import { DAO_ADDRESS, DAO_CHAIN, SAFE_ADDRESS } from "../utils/constants";

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
    >
      <Outlet />
    </TXBuilder>
  );
};

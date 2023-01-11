import { useMemo } from "react";

import { FormBuilder } from "@daohaus/form-builder";
import { useConnectedMember, useDao } from "@daohaus/moloch-v3-context";
import { CustomFields } from "../legos/config";
import { FORM } from "../legos/forms";
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from "@daohaus/utils";
import { sortTokensForRageQuit } from "../utils/general";
import { useParams } from "react-router-dom";
import { DAO_CHAIN } from "../utils/constants";

export function RageQuit() {
  const { dao, refreshAll } = useDao();
  const { connectedMember } = useConnectedMember();
  const daochain = DAO_CHAIN;

  const defaultFields = useMemo(() => {
    if (connectedMember && dao) {
      const treasury = dao.vaults.find(
        (v) => dao.safeAddress === v.safeAddress
      );

      return {
        to: connectedMember.memberAddress,
        tokens:
          treasury &&
          sortTokensForRageQuit(
            treasury.tokenBalances
              .filter((token: TokenBalance) => Number(token.balance) > 0)
              .map(
                (token: TokenBalance) =>
                  token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS
              )
          ),
      };
    }
  }, [connectedMember, dao]);

  const onFormComplete = () => {
    refreshAll?.();
  };

  if (!dao || !connectedMember) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={FORM.RAGEQUIT}
      customFields={CustomFields}
      onSuccess={onFormComplete}
      targetNetwork={daochain}
    />
  );
}

export default RageQuit;

import { isValidNetwork } from "@daohaus/keychain-utils";

import { Buildable, WrappedSelect } from "@daohaus/ui";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useDao } from "@daohaus/moloch-v3-context";
import { getErc20s } from "../../utils/tokenData";
import { DAO_CHAIN } from "../../utils/constants";

export enum InputStates {
  Loading,
  InvalidNetwork = "Invalid Network",
  CorruptTokenData = "Corrupt Token Data",
}

export const DisperseERC20 = (
  props: Buildable<{
    addressId?: string;
    safeAddressId?: string;
  }>
) => {
  const daochain = DAO_CHAIN;

  const { addressId = "paymentTokenAddress", safeAddressId = "safeAddress" } =
    props;
  const { dao } = useDao();
  const { watch, setValue } = useFormContext();

  const paymentTokenAddr = watch(addressId);
  const safeAddress = watch(safeAddressId);

  console.log("paymentTokenAddr", paymentTokenAddr);

  const erc20s = useMemo(() => {
    if (dao && isValidNetwork(daochain)) {
      const selectedSafe = dao.vaults.find((v) => {
        if (!safeAddress) return v.safeAddress === dao.safeAddress;
        return v.safeAddress === safeAddress;
      });

      // console.log("selectedSafe", selectedSafe);
      return selectedSafe && getErc20s(selectedSafe);
    }
    return null;
  }, [dao, daochain, safeAddress]);

  const selectOptions = useMemo(() => {
    if (erc20s) {
      const options = erc20s.map((token) => ({
        name: token.symbol,
        value: token.address,
      }));

      return options;
    }
  }, [erc20s]);

  return (
    <WrappedSelect
      {...props}
      id={addressId}
      label="Request ERC-20"
      options={selectOptions || []}
    />
  );
};

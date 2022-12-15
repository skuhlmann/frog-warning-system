import { useDHConnect } from "@daohaus/connect";
import { FormBuilder } from "@daohaus/form-builder";
import { useConnectedMember } from "@daohaus/moloch-v3-context";
import { TXBuilder } from "@daohaus/tx-builder";
import { CustomFields } from "../legos/config";

import { FORM } from "../legos/forms";

export const ConvertShares = () => {
  const { provider } = useDHConnect();
  const { connectedMember } = useConnectedMember();

  if (!connectedMember) return null;

  return (
    <TXBuilder
      provider={provider}
      chainId="0x5"
      daoId="0xc035dd7cda32ae73f0f306ed56658527aad47648"
      safeId="0x36824793440d1ab326b9b5634418393d5f5e30a3"
      appState={{
        connectedAddress: connectedMember.memberAddress,
        memberShares: connectedMember.shares,
      }}
    >
      <FormBuilder
        form={FORM.CONVERT}
        targetNetwork="0x5"
        customFields={CustomFields}
      />
    </TXBuilder>
  );
};

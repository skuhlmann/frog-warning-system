import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormBuilder } from "@daohaus/form-builder";

import { getFormLegoById } from "../legos/forms";
import { CustomFields } from "../legos/config";
import { useDao } from "@daohaus/moloch-v3-context";
import { DAO_ADDRESS, DAO_CHAIN, SAFE_ADDRESS } from "../utils/constants";
import { TXBuilder } from "@daohaus/tx-builder";
import { useDHConnect } from "@daohaus/connect";

export function NewProposal() {
  const location = useLocation();
  const { provider } = useDHConnect();

  const navigate = useNavigate();
  const daoid = DAO_ADDRESS;
  const daochain = DAO_CHAIN;
  const { refreshAll } = useDao();

  const onFormComplete = () => {
    refreshAll?.();
    navigate(`/proposals`);
  };

  const formLego = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoId = params.get("formLego");

    if (!legoId) return null;
    return getFormLegoById(legoId);
  }, [location]);

  const defaults = useMemo(() => {
    if (formLego) {
      const params = new URLSearchParams(location.search);
      const defaultValues = params.get("defaultValues");

      if (!defaultValues) return null;
      return JSON.parse(defaultValues);
    }
    return null;
  }, [location, formLego]);

  if (!formLego) return null;

  return (
    <TXBuilder
      provider={provider}
      chainId={DAO_CHAIN}
      daoId={DAO_ADDRESS}
      safeId={SAFE_ADDRESS}
      appState={{}}
    >
      <FormBuilder
        form={formLego}
        customFields={CustomFields}
        onSuccess={onFormComplete}
        defaultValues={defaults}
        targetNetwork={daochain}
      />
    </TXBuilder>
  );
}

export default NewProposal;

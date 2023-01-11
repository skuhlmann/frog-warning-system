import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormBuilder } from "@daohaus/form-builder";

import { getFormLegoById } from "../legos/forms";
import { CustomFields } from "../legos/config";
import { useDao } from "@daohaus/moloch-v3-context";
import { DAO_CHAIN } from "../utils/constants";

export function NewProposal() {
  const location = useLocation();

  const navigate = useNavigate();
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
    <FormBuilder
      form={formLego}
      customFields={CustomFields}
      onSuccess={onFormComplete}
      defaultValues={defaults}
      targetNetwork={daochain}
    />
  );
}

export default NewProposal;

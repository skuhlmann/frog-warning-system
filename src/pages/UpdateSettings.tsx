import { FormBuilder } from "@daohaus/form-builder";
import { useMemo } from "react";
import { useDao } from "@daohaus/moloch-v3-context";
import { CustomFields } from "../legos/config";
import { formatDaoProfileForForm } from "../utils/settingsHelper";
import { DAO_CHAIN } from "../utils/constants";
import { FORM } from "../legos/forms";
import { useNavigate } from "react-router-dom";

export function UpdateSettings() {
  const { dao, refreshAll } = useDao();
  const navigate = useNavigate();

  const daochain = DAO_CHAIN;

  const defaultFields = useMemo(() => {
    if (dao) {
      return formatDaoProfileForForm(dao);
    }
    return undefined;
  }, [dao]);

  const onFormComplete = () => {
    refreshAll?.();
    navigate(`/proposals`);
  };

  if (!dao) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...FORM.METADATA_SETTINGS, log: true }}
      customFields={CustomFields}
      targetNetwork={daochain}
      onSuccess={onFormComplete}
    />
  );
}

export default UpdateSettings;

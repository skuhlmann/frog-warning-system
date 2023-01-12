import { FormBuilder } from "@daohaus/form-builder";
import { useMemo } from "react";
import { useDao } from "@daohaus/moloch-v3-context";
import { CustomFields } from "../legos/config";
import { formatDaoProfileForForm } from "../utils/settingsHelper";
import { DAO_CHAIN } from "../utils/constants";
import { FORM } from "../legos/forms";

export function UpdateSettings() {
  const { dao } = useDao();
  const daochain = DAO_CHAIN;

  const defaultFields = useMemo(() => {
    if (dao) {
      return formatDaoProfileForForm(dao);
    }
    return undefined;
  }, [dao]);

  if (!dao) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...FORM.METADATA_SETTINGS, log: true }}
      customFields={CustomFields}
      targetNetwork={daochain}
    />
  );
}

export default UpdateSettings;

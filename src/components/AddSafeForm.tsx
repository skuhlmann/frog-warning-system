import { FormBuilder } from "@daohaus/form-builder";
import { useDao } from "@daohaus/moloch-v3-context";

import { FORM } from "../legos/forms";
import { DAO_CHAIN } from "../utils/constants";

export const AddSafeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { refreshAll } = useDao();
  const daochain = DAO_CHAIN;

  const onFormComplete = () => {
    refreshAll?.();
    onSuccess();
  };

  return (
    <FormBuilder
      form={FORM.ADD_SAFE}
      onSuccess={onFormComplete}
      targetNetwork={daochain}
    />
  );
};

export default AddSafeForm;

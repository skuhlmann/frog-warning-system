import React, { useMemo } from "react";

import { Buildable, Field, WrappedTextArea } from "@daohaus/ui";
import { RegisterOptions, useFormContext } from "react-hook-form";
import {
  transformDisperseData,
  validateDisperseData,
} from "../../utils/disperseHelpers";

export const DisperseInput = (props: Buildable<Field>) => {
  const { watch } = useFormContext();

  const disperseField = watch("disperse");

  const validFieldMsg = useMemo(() => {
    if (disperseField === "") {
      return undefined;
    }
    if (validateDisperseData(disperseField)) {
      return "Formatting is valid.";
    }
    return undefined;
  }, [disperseField]);

  const newRules: RegisterOptions = {
    ...props.rules,
    setValueAs: transformDisperseData,
    validate: validateDisperseData,
  };

  return (
    <WrappedTextArea
      {...props}
      label="Addresses & Amounts"
      placeholder="0x00000000000000000000000000 1"
      rules={newRules}
      helperText={validFieldMsg}
    />
  );
};

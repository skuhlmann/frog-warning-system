import React from "react";

import { Buildable, Field, WrappedTextArea } from "@daohaus/ui";
import { RegisterOptions } from "react-hook-form";
import {
  transformDisperseData,
  validateDisperseData,
} from "../../utils/disperseHelpers";

export const DisperseInput = (props: Buildable<Field>) => {
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
    />
  );
};

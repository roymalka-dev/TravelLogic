import React from "react";
import { Field } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FieldConfig, RequestType } from "@/types/form.types";
import ConditionalSelect from "../ui/inputs/ConditionalSelect";
import MultiInputField from "../ui/inputs/MultiInputField";
import MultiSelectField from "../ui/inputs/MultiSelectField";
import SelectField from "../ui/inputs/SelectField";
import TextFieldWithInfo from "../ui/inputs/TextFieldWithInfo";
import LogicCreator from "../ui/inputs/LogicCreator";

/**
 * DynamicField component renders different form input fields based on the type provided in FieldConfig.
 * @param {FieldConfig<RequestType>} props - Component props containing field configuration.
 * @returns {JSX.Element} DynamicField component
 */
const DynamicField: React.FC<FieldConfig<RequestType>> = ({
  name,
  label,
  type,
  options,
  information,
  imageExample,
  bucketName,
}) => {
  return (
    <Field name={name}>
      {({ field }: any) => {
        if (type === "checkbox") {
          return (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={label}
            />
          );
        }

        if (type === "select") {
          return (
            <SelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "logic-creator") {
          return <LogicCreator />;
        }

        // Handle multi-select
        if (type === "multi-select") {
          return (
            <MultiSelectField
              name={String(name)}
              label={label}
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "multi-input") {
          return (
            <MultiInputField
              name={String(name)}
              label={label}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        if (type === "conditional-select") {
          return (
            <ConditionalSelect
              name={String(name)}
              selectLabel={label}
              textFieldLabel="Specify Other"
              options={options || []}
              information={information}
              imageExample={imageExample}
            />
          );
        }

        return (
          <TextFieldWithInfo
            name={String(name)}
            label={label}
            type={type}
            information={information}
            imageExample={imageExample || ""}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
          />
        );
      }}
    </Field>
  );
};

export default DynamicField;

import React from "react";
import { useField } from "formik";
import { Box, TextField, MenuItem } from "@mui/material";
import InformationTooltip from "../tools/InformationTooltip";
import ImageExampleTooltip from "../tools/ImageExampleTooltip";
interface SelectFieldProps {
  name: string;
  label: string;
  options: string[];
  information?: string;
  imageExample?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  information,
  imageExample,
}) => {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        {...field}
        select
        error={isError}
        helperText={isError ? meta.error : ""}
        label={label}
        fullWidth
        variant="outlined"
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {information && <InformationTooltip information={information} />}
      {imageExample && <ImageExampleTooltip imageUrl={imageExample} />}
    </Box>
  );
};

export default SelectField;

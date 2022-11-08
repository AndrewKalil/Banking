import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import React, { FC } from "react";

interface InputNumberProps {
  name: string;
  value: number;
  label: string;
  handleChange: (e: any) => void;
}

const InputNumber: FC<InputNumberProps> = ({
  value,
  name,
  label,
  handleChange,
}) => {
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor="standard-adornment-amount">{label}</InputLabel>
      <Input
        id="standard-adornment-amount"
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </FormControl>
  );
};

export default InputNumber;

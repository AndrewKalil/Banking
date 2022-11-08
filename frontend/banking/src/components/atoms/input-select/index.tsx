import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { FC } from "react";
import { Dropdown } from "../../../core/models/dropdown.model";

interface SelectProps {
  label: string;
  value: string;
  list: Dropdown[];
  name: string;
  disabled: boolean;
  handleChange: (e: any) => void;
  color?: boolean;
}

const CustomSelect: FC<SelectProps> = ({
  label,
  list,
  name,
  value,
  disabled,
  handleChange,
  color = false,
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };
  return (
    <FormControl variant="standard" fullWidth disabled={disabled}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        name={name}
        label={label}
        onChange={(e) => handleChange(e)}
        MenuProps={MenuProps}
      >
        {list.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value} className="relative">
              {item.name}
              {color && (
                <span
                  className="w-3 h-3 rounded-full absolute right-7 top-2 "
                  style={{ backgroundColor: item.value }}
                ></span>
              )}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

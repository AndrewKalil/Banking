import React, { FC } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

interface DatePickerProps {
  value: Date;
  label: string;
  handleDate: (newDate: Date | null) => void;
}

const CustomDatePicker: FC<DatePickerProps> = ({
  value,
  label,
  handleDate,
}) => {
  return (
    <DatePicker
      label={label}
      openTo="year"
      views={["year", "month", "day"]}
      value={value}
      onChange={(newValue) => {
        handleDate(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default CustomDatePicker;

import { IconButton, SvgIconTypeMap, Tooltip } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FC, ReactElement } from "react";

interface ToolbarButtonProps {
  disabled?: boolean;
  label: string;
  color?: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  callback: () => void;
  children?: ReactElement;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  Icon,
  disabled = false,
  color,
  label,
  callback,
  children,
}) => {
  return disabled ? (
    <IconButton disabled={disabled} aria-label={label}>
      <Icon
        style={{
          color: disabled ? "lightgray" : color ? color : "currentcolor",
        }}
      />
    </IconButton>
  ) : (
    <Tooltip title={label} onClick={callback}>
      <IconButton
        disabled={disabled}
        aria-label={label}
        sx={{ position: "relative" }}
      >
        <Icon
          style={{
            color: disabled ? "lightgray" : color ? color : "currentcolor",
          }}
        />
        {children && children}
      </IconButton>
    </Tooltip>
  );
};

export default ToolbarButton;

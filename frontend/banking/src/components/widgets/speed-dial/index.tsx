import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { FC } from "react";
import { ButtonAction } from "../../../core/models/button-actions.model";
import "./style.scss";

interface SpeedDialComponents {
  actions: ButtonAction[];
}

const SpeedDialComponent: FC<SpeedDialComponents> = ({ actions }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      className="svg_selector"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      direction={"up"}
    >
      {actions.map((action) => (
        <SpeedDialAction
          onClick={action.action}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialComponent;

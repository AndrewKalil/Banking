import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import ToolbarButton from "../../atoms/toolbar-button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface CardContainerProps {
  id: number;
  name: string;
  description: string;
  balance: number;
  uIColor: string;
  handleEdit: (id: number) => void;
  handleView: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CardContainer: FC<CardContainerProps> = ({
  id,
  name,
  description,
  balance,
  uIColor,
  handleEdit,
  handleView,
  handleDelete,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Card
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: "flex",
        height: "200px",
        width: "100%",
        position: "relative",
      }}
      style={{
        backgroundColor: `${uIColor}`,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" color="GrayText">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500" }}
            color={balance >= 0 ? "green" : "red"}
            component="div"
          >
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "COP",
            }).format(balance)}
          </Typography>
        </CardContent>
      </Box>
      {hover && (
        <div
          className={`absolute w-full h-12 flex bottom-0 items-center justify-end gap-3 p-2`}
        >
          <ToolbarButton
            label="edit"
            Icon={ModeEditOutlinedIcon}
            callback={() => handleEdit(id)}
          ></ToolbarButton>
          <ToolbarButton
            label="view details"
            Icon={RemoveRedEyeIcon}
            callback={() => handleView(id)}
          ></ToolbarButton>
          <ToolbarButton
            label="delete"
            Icon={DeleteForeverIcon}
            callback={() => handleDelete(id)}
          ></ToolbarButton>
        </div>
      )}
    </Card>
  );
};

export default CardContainer;

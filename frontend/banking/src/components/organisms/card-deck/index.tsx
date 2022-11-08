import { Grid } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Account } from "../../../core/models/account.model";
import CardContainer from "../../molecules/card";
import CustomScrollbars from "../../widgets/scrollbar";

interface CardDeckProps {
  data: Account[];
  handleEdit: (id: number) => void;
  handleView: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CardDeck: FC<CardDeckProps> = ({
  data,
  handleEdit,
  handleView,
  handleDelete,
}) => {
  useEffect(() => {}, []);
  return (
    <div className="w-full h-full">
      <CustomScrollbars>
        <div className="w-full h-full p-1">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {data.map((account) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={account.id}>
                  <CardContainer
                    id={account.id}
                    uIColor={account.uIcolor}
                    name={account.name}
                    description={account.description || ""}
                    balance={account.balance}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleView={handleView}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </CustomScrollbars>
    </div>
  );
};

export default CardDeck;

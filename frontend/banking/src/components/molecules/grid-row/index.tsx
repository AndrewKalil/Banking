import React, { FC, useEffect, useState } from "react";
import { DateService } from "../../../core/services/date/date.services";
import "./style.scss";

interface RowProps {
  row: any;
  commonRowClasses: string;
  commonCellClasses: string;
  columns: { title: string; width: number }[];
  handleSelection: (id: number) => void;
  selectedRows: number[];
}

const GridRow: FC<RowProps> = ({
  row,
  commonRowClasses,
  commonCellClasses,
  columns,
  handleSelection,
  selectedRows,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedRows.includes(row.id)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedRows, row.id]);

  const convertValue = (value: any, col?: string) => {
    const dateService = new DateService();
    if (dateService.isoDateFormat.test(value)) {
      return new Date(value).toLocaleDateString();
    }

    if (col === "amount") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "COP",
      }).format(value);
    }

    switch (typeof value) {
      case "boolean":
        return value ? "yes" : "no";
      default:
        return value;
    }
  };

  return (
    <div
      onClick={() => handleSelection(row.id)}
      className={`bg-gradient-to-t hover:cursor-pointer relative z-0 rounded shadow-md ${commonRowClasses} ${
        row.isExpense
          ? "from-slate-200 to-transparent"
          : !row.isExpense
          ? "from-emerald-200 to-transparent"
          : ""
      } ${selected && "row-selected"}`}
      key={row.id}
    >
      {columns?.map((col) => {
        return (
          <div
            className={`h-full ${commonCellClasses} text-gray-500`}
            key={col.title}
            style={{ width: `${col.width}rem` }}
          >
            {convertValue(row[col.title], col.title)}
          </div>
        );
      })}
    </div>
  );
};

export default GridRow;

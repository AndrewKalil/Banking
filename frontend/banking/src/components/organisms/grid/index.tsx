import React, { useEffect, useState } from "react";
import { toSpaceSeparated } from "../../../core/services/utils/utils";
import GridRow from "../../molecules/grid-row";
import CustomScrollbars from "../../widgets/scrollbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import "./style.scss";
import ToolbarButton from "../../atoms/toolbar-button";
import { Filter } from "../../../core/models/filter.model";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { setASort } from "../../../data/features/asset/assetSlice";
import { DataType } from "../../../core/models/form.model";
import { AppColumn, Order } from "../../../core/models/column.model";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Skeleton } from "@mui/material";
import { useRouteSubscriber } from "../../../core/services/hooks/useRouteInfo";
import { setAcSort } from "../../../data/features/account/accountSlice";

interface GridProps {
  argColumns: AppColumn[];
  data: any[];
  deleteAction?: (id: number[]) => void;
  editAction?: (id: number) => void;
  openFiltersAction?: () => void;
  advFilters?: Filter[];
  dropdownFilters?: { component: JSX.Element }[];
  dataType?: DataType;
}

const Grid = ({
  argColumns,
  data,
  deleteAction,
  editAction,
  openFiltersAction,
  advFilters,
  dataType = "asset",
  dropdownFilters = [],
}: GridProps) => {
  const commonCellClasses = "h-full flex justify-start items-center pl-2";
  const commonRowClasses = "flex w-full gap-1";
  const routeSubscriber = useRouteSubscriber();
  const dispatch = useAppDispatch();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [columns, setColumns] = useState<AppColumn[]>([...argColumns]);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const appState = useAppSelector((state) => state);

  useEffect(() => {
    if (!multiSelect) {
      setSelectedRows([]);
    }
  }, [multiSelect]);

  useEffect(() => {
    const sortidx = columns.findIndex((c) => c.focus);
    if (sortidx !== -1) {
      const col = columns[sortidx];
      if (routeSubscriber.isDetailSpecific) {
        if (routeSubscriber.path === "accounts") {
          // dispatch(setAcSort(`${col.title} ${col.focus?.order}`));
          // leave sort as it is
        }
      } else {
        dispatch(setASort(`${col.title} ${col.focus?.order}`));
      }
    }
  }, [columns, dispatch]);

  const handleSelection = (id: number) => {
    if (!selectedRows.includes(id)) {
      if (!multiSelect) {
        setSelectedRows([id]);
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    } else {
      setSelectedRows([...selectedRows.filter((x) => x !== id)]);
    }
  };

  const handleSortIcon = (focus: {
    active: boolean;
    sort: boolean;
    order: Order;
  }) => {
    if (focus.active && focus.order) {
      if (focus.order === "asc") {
        return <ArrowDropUpIcon />;
      } else {
        return <ArrowDropDownIcon />;
      }
    }
    return <React.Fragment></React.Fragment>;
  };

  const handleColumnTitleClick = (id: number): AppColumn[] => {
    const activeCol = columns.findIndex((c) => c.focus && c.focus.active);
    if (activeCol === -1 || activeCol !== id) {
      return columns.map((c1: AppColumn) => {
        const defaultCol: AppColumn = {
          index: c1.index,
          title: c1.title,
          width: c1.width,
        };
        if (c1.index === id) {
          return {
            ...defaultCol,
            focus: { active: true, sort: true, order: "desc" },
          };
        }
        return defaultCol;
      });
    } else {
      return columns.map((c2: AppColumn) => {
        const defaultCol2: AppColumn = {
          index: c2.index,
          title: c2.title,
          width: c2.width,
        };
        if (c2.index === id) {
          return {
            ...c2,
            focus: {
              active: true,
              sort: true,
              order: c2.focus && c2.focus.order === "desc" ? "asc" : "desc",
            },
          };
        } else {
          return defaultCol2;
        }
      });
    }
  };

  const isLoading = () => {
    if (dataType === "category") {
      return appState.categories.loading;
    } else {
      return appState.assets.loading;
    }
  };

  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-row-reverse pt-2 pr-2 text-green-600 font-bold">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "COP",
          }).format(appState.accounts.totalBalance)}
        </div>
        <div className="grid_toolbar">
          <div className="buttons">
            <ToolbarButton
              callback={() => {
                if (deleteAction) {
                  deleteAction(selectedRows);
                }
              }}
              label="delete"
              disabled={selectedRows.length < 1}
              Icon={DeleteForeverIcon}
            />

            <ToolbarButton
              callback={() => {
                if (editAction) {
                  editAction(selectedRows[0]);
                }
              }}
              label="edit"
              disabled={selectedRows.length !== 1}
              Icon={ModeEditOutlinedIcon}
            />

            <ToolbarButton
              callback={() => {
                setMultiSelect(!multiSelect);
              }}
              label="mulit-select"
              Icon={LibraryAddCheckOutlinedIcon}
              color={multiSelect ? "rgb(106, 166, 226)" : "currentcolor"}
            />

            {!routeSubscriber.isDetailSpecific && (
              <ToolbarButton
                callback={() => {
                  if (openFiltersAction) {
                    openFiltersAction();
                  }
                }}
                label="advanced filters"
                Icon={FilterAltIcon}
              >
                {advFilters && advFilters.length > 0 ? (
                  <div className="absolute right-1 top-1 w-1/3 h-1/3 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs">
                    {advFilters.length}
                  </div>
                ) : undefined}
              </ToolbarButton>
            )}
          </div>
          <div className="search"></div>
        </div>
        <div
          style={{ minHeight: "2.5rem" }}
          className="flex w-full flex-wrap gap-3 items-center"
        >
          {dropdownFilters.map((object, idx) => {
            return (
              <React.Fragment key={idx}>{object.component}</React.Fragment>
            );
          })}
        </div>
        <CustomScrollbars>
          <div className="h-full grid grid_layout flex-1">
            <div className={`h-full ${commonRowClasses}`}>
              {columns &&
                columns.map((col) => {
                  return (
                    <div
                      className={`h-full ${commonCellClasses} text-gray-700 font-medium hover:cursor-pointer`}
                      key={col.index}
                      style={{ width: `${col.width}rem` }}
                      onClick={() =>
                        setColumns([...handleColumnTitleClick(col.index)])
                      }
                    >
                      {toSpaceSeparated(col.title)}
                      {col.focus && <span>{handleSortIcon(col.focus)}</span>}
                    </div>
                  );
                })}
            </div>
            <div className="h-full w-full grid_data_section overflow-y-auto">
              {isLoading()
                ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((x, idx) => {
                    return (
                      <Skeleton
                        key={idx}
                        sx={{ bgcolor: "grey.100" }}
                        className="rounded"
                        variant="rectangular"
                        width="100%"
                        height="100%"
                      />
                    );
                  })
                : data.map((row) => {
                    return (
                      <GridRow
                        key={row.id}
                        columns={columns}
                        commonCellClasses={commonCellClasses}
                        commonRowClasses={commonRowClasses}
                        row={row}
                        handleSelection={handleSelection}
                        selectedRows={selectedRows}
                      />
                    );
                  })}
            </div>
          </div>
        </CustomScrollbars>
      </div>
    </React.Fragment>
  );
};

export default Grid;

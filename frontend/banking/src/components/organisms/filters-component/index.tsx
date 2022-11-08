import React, { FC, useCallback, useEffect, useState } from "react";
import CustomScrollbars from "../../widgets/scrollbar";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { Button, DialogActions, IconButton, Tooltip } from "@mui/material";
import FilterLine from "../../molecules/filter-line";
import { Filter } from "../../../core/models/filter.model";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { setAdvAFilters } from "../../../data/features/asset/assetSlice";
import { setAdvCFilters } from "../../../data/features/category/categorySlice";
import { closeModal } from "../../../data/features/modal/modalSlice";

interface FilterComponentProps {
  handleClose: () => void;
}

const FiltersComponent: FC<FilterComponentProps> = ({ handleClose }) => {
  const [advFilters, setAdvFilters] = useState<Filter[]>([]);
  const dispatch = useAppDispatch();
  const modalSelector = useAppSelector((state) => state.modal);
  const assetSelector = useAppSelector((state) => state.assets);
  const categorySelector = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (modalSelector.dataType === "category") {
      setAdvFilters([...categorySelector.query.advFilters]);
    } else if (modalSelector.dataType === "asset") {
      setAdvFilters([...assetSelector.query.advFilters]);
    } else {
      setAdvFilters([]);
    }
  }, [categorySelector.query, assetSelector.query, modalSelector.dataType]);

  const setFilterValue = (id: string, name: string, value: string) => {
    const index = advFilters.findIndex((x) => x.id === id);
    if (index >= 0) {
      let temp = advFilters;
      temp[index] = { ...advFilters[index], [name]: value };
      setAdvFilters([...temp]);
    }
  };

  const removeFilter = (id: string) => {
    setAdvFilters([...advFilters.filter((f) => f.id !== id)]);
  };

  const applyFilters = () => {
    if (modalSelector.dataType === "category") {
      dispatch(setAdvCFilters(advFilters));
    } else {
      dispatch(setAdvAFilters(advFilters));
    }
    dispatch(closeModal());
  };

  return (
    <React.Fragment>
      <div
        className="grid"
        style={{ gridTemplateRows: "10% 90%", height: "19rem", width: "30rem" }}
      >
        <div className="flex items-center justify-end h-full w-full px-5">
          <Tooltip title="add filter">
            <IconButton
              onClick={() =>
                setAdvFilters([
                  ...advFilters,
                  {
                    id: uuid(),
                    property: "",
                    op: "",
                    type: "",
                    value: "",
                  },
                ])
              }
            >
              <PlaylistAddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="w-full h-full px-5">
          <CustomScrollbars>
            <div className="flex-1 grid grid-flow-row gap-2">
              {advFilters.map((item, idx) => {
                return (
                  <FilterLine
                    key={idx}
                    filter={item}
                    setFilterValue={setFilterValue}
                    removeFilter={removeFilter}
                  />
                );
              })}
            </div>
          </CustomScrollbars>
        </div>
      </div>
      <DialogActions>
        <Button sx={{ color: "GrayText" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ color: "green" }} onClick={applyFilters}>
          Apply
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default FiltersComponent;

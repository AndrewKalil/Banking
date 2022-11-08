import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import {
  Operation,
  Property,
  QueryBuilder,
} from "../../../core/services/query/query.services";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Filter } from "../../../core/models/filter.model";
import { useAppSelector } from "../../../data/store";

interface FilterLineProps {
  filter: Filter;
  setFilterValue: (id: string, name: string, value: string) => void;
  removeFilter: (id: string) => void;
}

const FilterLine: FC<FilterLineProps> = ({
  filter,
  setFilterValue,
  removeFilter,
}) => {
  const modalSelector = useAppSelector((state) => state.modal);
  const queryService = new QueryBuilder(modalSelector.dataType);
  const [properties, setProperties] = useState<Property[]>([]);
  const [ops, setOps] = useState<Operation[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const localProps = queryService._dictionary;
    setProperties([...localProps]);
  }, []);

  useEffect(() => {
    try {
      const localOps = queryService._dictionary.filter(
        (prop) => prop.name === filter.property
      )[0].ops;
      setOps([...localOps]);
    } catch (error) {
      setOps([]);
    }
  }, [filter.property]);

  useEffect(() => {
    try {
      const localTypes = queryService._dictionary
        .filter((p) => p.name === filter.property)[0]
        .ops.filter((o) => o.name === filter.op)[0].types;
      setTypes([...localTypes]);
    } catch (error) {
      setTypes([]);
    }
  }, [filter.op]);

  return (
    <div className="h-20 w-full flex justify-between items-center">
      <IconButton
        onClick={() => removeFilter(filter.id)}
        className="w-6 h-6 top-0"
      >
        <DeleteForeverIcon fontSize="small" color="disabled" />
      </IconButton>
      <div className="w-24 h-full flex items-center justify-center">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Property
          </InputLabel>
          <Select
            error={filter.property === ""}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="property"
            value={filter.property}
            onChange={(e) => {
              setFilterValue(filter.id, e.target.name, e.target.value);
              setFilterValue(filter.id, "op", "");
              setFilterValue(filter.id, "type", "");
              setFilterValue(filter.id, "value", "");
            }}
            label="Property"
          >
            {properties.length > 0 ? (
              properties.map((property) => {
                return (
                  <MenuItem key={property.name} value={property.name}>
                    {property.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={filter.property}>{filter.property}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className="w-24   h-full flex items-center justify-center">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Operator
          </InputLabel>
          <Select
            error={filter.op === ""}
            name="op"
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filter.op}
            onChange={(e) => {
              setFilterValue(filter.id, e.target.name, e.target.value);
              setFilterValue(filter.id, "type", "");
              setFilterValue(filter.id, "value", "");
            }}
            label="Operator"
          >
            {ops.length > 0 ? (
              ops.map((op) => {
                return (
                  <MenuItem value={op.name} key={op.name}>
                    {op.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={filter.op}>{filter.op}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className="w-24   h-full flex items-center justify-center">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select
            error={filter.type === ""}
            name="type"
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filter.type}
            onChange={(e) => {
              setFilterValue(filter.id, e.target.name, e.target.value);
              setFilterValue(filter.id, "value", "");
            }}
            label="Type"
          >
            {types.length > 0 ? (
              types.map((type) => {
                return (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={filter.type}>{filter.type}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className="w-24 h-full flex items-center justify-center">
        <FormControl variant="standard" fullWidth>
          <TextField
            // error={filter.value === ""}
            autoComplete="off"
            name="value"
            id="standard-basic"
            value={filter.value}
            label="Value"
            variant="standard"
            onChange={(e) =>
              setFilterValue(filter.id, e.target.name, e.target.value)
            }
          />
        </FormControl>
      </div>
    </div>
  );
};

export default FilterLine;

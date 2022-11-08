import {
  Button,
  DialogActions,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  createAsset,
  getAssets,
  updateAsset,
} from "../../../data/features/asset/assetSlice";
import {
  createCategory,
  updateCategory,
} from "../../../data/features/category/categorySlice";
import {
  openSnackbar,
  setDescription,
  setSeverity,
} from "../../../data/features/snackbar/snackbarSlice";
import { Asset } from "../../../core/models/asset.model";
import { Category } from "../../../core/models/category.model";
import { FormData, InputTypes } from "../../../core/models/form.model";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import CustomDatePicker from "../../atoms/input-datepicker";
import CustomSelect from "../../atoms/input-select";
import CustomScrollbars from "../../widgets/scrollbar";
import "./style.scss";
import { Dropdown } from "../../../core/models/dropdown.model";
import { TransferDto } from "../../../core/models/transfer.model";
import { createTransfer } from "../../../data/features/transfer/transferSlice";
import {
  createAccount,
  updateAccount,
} from "../../../data/features/account/accountSlice";
import { Account } from "../../../core/models/account.model";

interface FormProps {
  inputs: FormData;
  handleCLose: () => void;
}

function Form<T>({ inputs, handleCLose }: FormProps) {
  const [data, setData] = useState<any>(inputs.object);
  const modalSelector = useAppSelector((state) => state.modal);
  const assetSelector = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();

  useEffect(() => {}, [data]);

  // automatically change entry object when inputs change
  const handleChange = (event: any) => {
    let value = event.target.value;
    let name = event.target.name;

    setData((pre: any) => {
      try {
        return {
          ...pre,
          [name]: value,
        } as T;
      } catch (error) {
        console.log(error);
      }
    });
  };

  const notifyCreateSuccess = (name: string) => {
    dispatch(setDescription(`Entry (${name}) created successfully`));
    dispatch(setSeverity("success"));
    dispatch(openSnackbar());
  };

  const notifyEditSuccess = (name: string) => {
    dispatch(setDescription(`Entry (${name}) modified successfully`));
    dispatch(setSeverity("success"));
    dispatch(openSnackbar());
    // dispatch(getAssets(assetSelector.query));
  };

  const handleDropdown = (
    key: string,
    lists: { property: string; dropDown: Dropdown[] }[]
  ) => {
    let tempKey = key;
    if (key === "accountToId") {
      tempKey = "accountId";
    }
    let keyIndex = lists.findIndex((x) => x.property === tempKey);
    if (keyIndex !== -1) {
      return lists[keyIndex].dropDown;
    } else {
      return [];
    }
  };

  const save = useCallback(async () => {
    if (modalSelector.dataType === "category")
      if (modalSelector.contentType === "createForm") {
        await dispatch(createCategory(data))
          .then((success) => {
            notifyCreateSuccess((success.payload as Category).name);
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            handleCLose();
          });
      } else if (modalSelector.contentType === "editForm") {
        await dispatch(updateCategory({ id: data.id, data }))
          .then((success) => {
            notifyEditSuccess((success.payload as Category).name);
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            handleCLose();
          });
      }

    if (modalSelector.dataType === "account")
      if (modalSelector.contentType === "createForm") {
        await dispatch(createAccount(data))
          .then((success) => {
            notifyCreateSuccess((success.payload as Account).name);
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            handleCLose();
          });
      } else if (modalSelector.contentType === "editForm") {
        await dispatch(updateAccount({ id: data.id, data }))
          .then((success) => {
            notifyEditSuccess((success.payload as Account).name);
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            handleCLose();
          });
      }

    if (modalSelector.dataType === "asset")
      if (modalSelector.contentType === "createForm") {
        let dataDto = data;
        if (dataDto["isTransfer"] && dataDto["isTransfer"]) {
          let transferDto: TransferDto = {
            amount: dataDto["amount"],
            accountsIds: [
              parseInt(dataDto["accountId"]),
              parseInt(dataDto["accountToId"]),
            ],
            name: dataDto["name"],
            transactionDate: dataDto["expenseDate"],
            description: dataDto["description"],
          };
          if (
            dataDto["categoryId"] !== undefined ||
            dataDto["categoryId"] !== ""
          ) {
            transferDto.categoryId = parseInt(dataDto["categoryId"]);
          }
          await dispatch(createTransfer(transferDto))
            .then((success) => {
              notifyCreateSuccess((success.payload as Asset).name);
              dispatch(getAssets(assetSelector.query));
            })
            .catch((e) => {
              alert(e);
            })
            .finally(() => {
              handleCLose();
            });
        } else {
          await dispatch(createAsset(dataDto))
            .then((success) => {
              notifyCreateSuccess((success.payload as Asset).name);
            })
            .catch((e) => {
              alert(e);
            })
            .finally(() => {
              handleCLose();
            });
        }
      } else if (modalSelector.contentType === "editForm") {
        await dispatch(updateAsset({ id: data.id, data }))
          .then((success) => {
            console.log(success);
            notifyEditSuccess((success.payload as Asset).name);
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            handleCLose();
          });
      }
    // console.log(data);
  }, [dispatch, data]);

  const isDisabled = (key: string) => {
    let disabled = ["isExpense"];
    if (data["transferId"] > 0) {
      return true;
    }
    if (
      data["transferId"] === undefined &&
      key === "isTransfer" &&
      data["accountToId"] === undefined
    ) {
      return true;
    }
    if (
      key !== "isTransfer" &&
      data["isTransfer"] === true &&
      disabled.includes(key)
    ) {
      return true;
    }

    if (modalSelector.dataType === "account") {
      if (key === "isCredit" || key === "isSavings" || key === "balance") {
        return true;
      }
    }
    return false;
  };

  const renderInputs = (label: string, key: string, type: InputTypes) => {
    label = label.replace("Id", "").trim();
    switch (type) {
      case "number":
        if (
          modalSelector.dataType === "account" &&
          key === "creditAmount" &&
          (data["isSavings"] === true ||
            data["isCredit"] === false ||
            data["isCredit"] === undefined)
        ) {
          return undefined;
        }
        return (
          <FormControl fullWidth variant="standard" disabled={isDisabled(key)}>
            <InputLabel htmlFor="standard-adornment-amount">{label}</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={parseInt(data[key]) || 0}
              name={key}
              onChange={(e) => {
                setData({ ...data, [key]: parseInt(e.target.value) || 0 });
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        );
      case "check":
        return (
          <FormControlLabel
            control={
              <Switch
                disabled={isDisabled(key)}
                checked={data[key]}
                value={data[key]}
                name={key}
                onChange={(e, checked) => {
                  if (key === "isTransfer") {
                    setData({
                      ...data,
                      [key]: checked,
                      ["isExpense"]: false,
                      ["categoryId"]: "",
                    });
                  } else {
                    setData({ ...data, [key]: checked });
                  }
                }}
              />
            }
            label={label}
          />
        );
      case "text":
        return (
          <TextField
            disabled={isDisabled(key)}
            autoComplete={"false"}
            onChange={(e) => handleChange(e)}
            name={key}
            value={data[key] || ""}
            label={label}
            variant="standard"
          />
        );
      case "select":
        if (inputs.lists) {
          if (modalSelector.dataType === "asset") {
            if (
              (key === "accountToId" && data["isTransfer"] === false) ||
              (key === "accountToId" && data["isTransfer"] === undefined)
            ) {
              return undefined;
            }
            return (
              <CustomSelect
                disabled={isDisabled(key)}
                list={handleDropdown(key, inputs.lists)}
                label={label}
                name={key}
                value={data[key] !== 0 && data[key] ? data[key] : ""}
                handleChange={handleChange}
              />
            );
          }
          return (
            <CustomSelect
              disabled={isDisabled(key)}
              list={handleDropdown(key, inputs.lists)}
              label={label}
              name={key}
              value={data[key] !== 0 && data[key] ? data[key] : ""}
              handleChange={handleChange}
              color={key === "uIcolor" ? true : false}
            />
          );
        } else {
          break;
        }

      case "date":
        return (
          <CustomDatePicker
            label={label}
            value={data[key]}
            handleDate={(newDate: Date | null) => {
              setData({ ...data, [key]: newDate });
            }}
          />
        );
      default:
        return (
          <TextField
            onChange={(e) => handleChange(e)}
            name={key}
            value={data[key]}
            label={label}
            variant="standard"
          />
        );
    }
  };

  return (
    <div className="h-40 w-80 md_properties">
      <CustomScrollbars>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-full px-3"
          style={{ gridAutoRows: "4rem" }}
        >
          {inputs.controls.map(
            (item) =>
              renderInputs(item.label, item.key, item.type) && (
                <FormControl key={item.key}>
                  {renderInputs(item.label, item.key, item.type)}
                </FormControl>
              )
          )}
        </div>
      </CustomScrollbars>
      <DialogActions>
        <Button sx={{ color: "gray" }} onClick={handleCLose}>
          cancel
        </Button>
        <Button sx={{ color: "green" }} onClick={save}>
          save
        </Button>
      </DialogActions>
    </div>
  );
}

export default Form;

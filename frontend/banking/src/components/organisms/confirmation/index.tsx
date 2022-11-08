import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { FC } from "react";
import {
  deleteAsset,
  deleteAssets,
  getAssets,
} from "../../../data/features/asset/assetSlice";
import {
  deleteCategories,
  deleteCategory,
} from "../../../data/features/category/categorySlice";
import {
  openSnackbar,
  setDescription,
  setSeverity,
} from "../../../data/features/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";

interface ConfirmationProps {
  description: string;
  modalHandleClose: () => void;
}

const Confirmation: FC<ConfirmationProps> = ({
  description,
  modalHandleClose,
}) => {
  const modalSelector = useAppSelector((state) => state.modal);
  const assetSelector = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();

  const notifyDelete = () => {
    const ids = modalSelector.ids || [];
    const description =
      ids.length > 1
        ? `entries with ids ${ids.toString()} were deleted`
        : `entry with id ${ids[0]} was deleted`;
    dispatch(setDescription(description));
    dispatch(setSeverity("warning"));
    dispatch(openSnackbar());
  };

  const handleConfirm = () => {
    if (modalSelector.contentType === "confirmation") {
      if (modalSelector.dataType === "category" && modalSelector.ids) {
        if (modalSelector.ids.length === 1) {
          dispatch(deleteCategory(modalSelector.ids[0]))
            .then((success) => {
              notifyDelete();
            })
            .catch((error) => {})
            .finally(() => {
              modalHandleClose();
            });
        } else if (modalSelector.ids.length > 1) {
          dispatch(deleteCategories(modalSelector.ids))
            .then((success) => {
              notifyDelete();
            })
            .catch((error) => {})
            .finally(() => {
              modalHandleClose();
            });
        }
      } else if (modalSelector.dataType === "asset" && modalSelector.ids) {
        if (modalSelector.ids.length === 1) {
          dispatch(deleteAsset(modalSelector.ids[0]))
            .then((success) => {
              dispatch(getAssets(assetSelector.query));
              notifyDelete();
            })
            .catch((error) => {})
            .finally(() => {
              modalHandleClose();
            });
        } else if (modalSelector.ids.length > 1) {
          dispatch(deleteAssets(modalSelector.ids))
            .then((success) => {
              notifyDelete();
            })
            .catch((error) => {})
            .finally(() => {
              modalHandleClose();
            });
        }
      }
    }
  };

  return (
    <React.Fragment>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={modalHandleClose}>
          Cancel
        </Button>
        <Button color="success" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default Confirmation;

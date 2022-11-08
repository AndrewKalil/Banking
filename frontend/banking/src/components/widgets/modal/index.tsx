import { Dialog, DialogTitle, Slide } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { closeModal } from "../../../data/features/modal/modalSlice";
import { TransitionProps } from "@mui/material/transitions";
import Form from "../../organisms/form";
import { Asset } from "../../../core/models/asset.model";
import { Category } from "../../../core/models/category.model";
import Confirmation from "../../organisms/confirmation";
import FiltersComponent from "../../organisms/filters-component";
import { Account } from "../../../core/models/account.model";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ModalProps {}

const Modal = (props: ModalProps) => {
  const dispatch = useAppDispatch();
  const modalSelector = useAppSelector((state) => state.modal);

  // closes modal
  const handleClose = () => {
    dispatch(closeModal());
  };

  // renders a type of component based on content type property in state (Modal)
  const conditionalRender = () => {
    switch (modalSelector.contentType) {
      case "createForm":
      case "editForm":
        if (modalSelector.dataType === "category")
          return (
            <Form<Category>
              handleCLose={handleClose}
              inputs={modalSelector.formData}
            />
          );
        if (modalSelector.dataType === "account") {
          return (
            <Form<Account>
              handleCLose={handleClose}
              inputs={modalSelector.formData}
            />
          );
        }
        return (
          <Form<Asset>
            handleCLose={handleClose}
            inputs={modalSelector.formData}
          />
        );
      case "confirmation":
        return (
          <Confirmation
            modalHandleClose={handleClose}
            description={modalSelector.description || ""}
          />
        );
      case "filters":
        return <FiltersComponent handleClose={handleClose} />;
      case "default":
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  return (
    <Dialog
      maxWidth={modalSelector.width ? modalSelector.width : "xs"}
      sx={{ backgroundColor: "transparent" }}
      open={modalSelector.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">{modalSelector.title}</DialogTitle>
      {conditionalRender()}
    </Dialog>
  );
};

export default Modal;

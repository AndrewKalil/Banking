import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardDeck from "../../components/organisms/card-deck";
import SpeedDialComponent from "../../components/widgets/speed-dial";
import { Account, AccountDto } from "../../core/models/account.model";
import { Query } from "../../core/models/query.model";
import { accountDtoColumns } from "../../data/constants/account.constants";
import { colorsSelect } from "../../data/constants/styles";
import {
  getAccount,
  getAccounts,
} from "../../data/features/account/accountSlice";
import { setAssets } from "../../data/features/asset/assetSlice";
import {
  openModal,
  setContentType,
  setdataType,
  setFormData,
  setTitle,
  setWidth,
} from "../../data/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../data/store";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accountSelector = useAppSelector((state) => state.accounts);

  // Get initial accounts data
  const initApp = useCallback(async () => {
    dispatch(setAssets([]));
    await dispatch(getAccounts({} as Query));
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  const prepareModal = () => {
    dispatch(setWidth("xs"));
    dispatch(setdataType("account"));
  };

  const handleEdit = (id: number) => {
    dispatch(getAccount(id))
      .then((success) => {
        dispatch(
          setFormData({
            controls: accountDtoColumns,
            object: success.payload as Account,
            lists: [
              {
                property: "uIcolor",
                dropDown: colorsSelect,
              },
            ],
          })
        );
        dispatch(setTitle(`Edit ${(success.payload as AccountDto).name}`));
        dispatch(setContentType("editForm"));
        prepareModal();
        dispatch(openModal());
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleView = (id: number) => {
    navigate(id.toString());
  };

  const handleDelete = (id: number) => {};

  return (
    <div className="w-full h-full p-2">
      <CardDeck
        data={accountSelector.accounts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
      <SpeedDialComponent actions={[]} />
    </div>
  );
};

export default Accounts;

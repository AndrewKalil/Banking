import React, { useCallback, useEffect } from "react";
import Grid from "../../components/organisms/grid";
import SpeedDialComponent from "../../components/widgets/speed-dial";
import {
  assetColumns,
  assetDtoColumns,
  assetDtoInstance,
  categoryDtoColumns,
  categoryDtoInstance,
} from "../../data/constants/data";
import {
  getAsset,
  getAssets,
  setAFilters,
} from "../../data/features/asset/assetSlice";
import { getCategories } from "../../data/features/category/categorySlice";
import {
  openModal,
  setContentType,
  setdataType,
  setDescription,
  setFormData,
  setIds,
  setTitle,
  setWidth,
} from "../../data/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { ButtonAction } from "../../core/models/button-actions.model";
import { Dropdown } from "../../core/models/dropdown.model";
import { Asset, AssetDto } from "../../core/models/asset.model";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import IosShareIcon from "@mui/icons-material/IosShare";
import TableViewIcon from "@mui/icons-material/TableView";
import { getAccounts } from "../../data/features/account/accountSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { v4 as uuid } from "uuid";
import { Query } from "../../core/models/query.model";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const assetSelector = useAppSelector((state) => state.assets);
  const categorySelector = useAppSelector((state) => state.categories);
  const accountSelector = useAppSelector((state) => state.accounts);

  useEffect(() => {
    initApp();
  }, [assetSelector.query]);

  // fetches data
  const initApp = useCallback(async () => {
    await dispatch(getCategories(categorySelector.query));
    await dispatch(getAssets(assetSelector.query));
    await dispatch(getAccounts({} as Query));
  }, [dispatch, assetSelector.query, categorySelector.query]);

  // handles create
  const handleCreateClick = () => {
    dispatch(
      setFormData({
        controls: assetDtoColumns,
        object: assetDtoInstance,
        lists: getAssetDropdowns(),
      })
    );
    dispatch(setTitle("New Transaction"));
    dispatch(setContentType("createForm"));
    prepareModal();
    dispatch(openModal());
  };

  // TODO: Implement a function that exports the report and downloads it
  const handleExportClick = () => {
    alert("CSV generated");
  };

  // opens modal for creating a category
  const handleCreateCategoryClick = () => {
    dispatch(
      setFormData({
        controls: categoryDtoColumns,
        object: categoryDtoInstance,
      })
    );
    dispatch(setTitle("New Category"));
    dispatch(setContentType("createForm"));
    dispatch(setdataType("category"));
    dispatch(setWidth("xs"));
    dispatch(openModal());
  };

  //initialColumns
  const getInitalColumns = () => {
    const sort = {
      property: assetSelector.query.sort.split(" ")[0],
      order: assetSelector.query.sort.split(" ")[1],
    };
    const index = assetColumns.findIndex((x) => x.title === sort.property);
    let initColumns = [...assetColumns];
    if (index !== -1) {
      initColumns[index] = {
        ...initColumns[index],
        focus: {
          active: true,
          order: sort.order === "asc" ? "asc" : "desc",
          sort: true,
        },
      };
    }
    return initColumns;
  };

  // opens edit transaction modal
  const handleEditClick = (id: number) => {
    dispatch(getAsset(id))
      .then((success) => {
        dispatch(
          setFormData({
            controls: assetDtoColumns,
            object: success.payload as Asset,
            lists: getAssetDropdowns(),
          })
        );
        dispatch(setTitle(`Edit ${(success.payload as AssetDto).name}`));
        dispatch(setContentType("editForm"));
        prepareModal();
        dispatch(openModal());
      })
      .catch((e) => {
        alert(e);
      });
  };

  // opens delete confirmation
  const handleDelete = (ids: number[]) => {
    dispatch(setTitle("Delete Transaction"));
    dispatch(setWidth("xs"));
    dispatch(setContentType("confirmation"));
    dispatch(setdataType("asset"));
    dispatch(setIds(ids));
    dispatch(
      setDescription(
        `Are you sure you want to delete ${
          ids.length > 1 ? "transactions" : "transaction"
        } with ${ids.length > 1 ? `ids ${ids.toString()}` : `id ${ids[0]}`}`
      )
    );
    dispatch(openModal());
  };

  // opens filter modal
  const openFiltersAction = () => {
    dispatch(setTitle("Filters"));
    dispatch(setContentType("filters"));
    dispatch(setWidth("md"));
    dispatch(setdataType("asset"));
    dispatch(openModal());
  };

  const prepareModal = () => {
    dispatch(setWidth("xs"));
    dispatch(setdataType("asset"));
  };

  // gets the dropdown data for the assets create and edit forms
  const getAssetDropdowns = () => {
    let dropDowns = [
      {
        property: "categoryId",
        dropDown: categorySelector.categories.map((item) => {
          const choice: Dropdown = {
            name: item.name,
            value: item.id.toString(),
          };
          return choice;
        }),
      },
      {
        property: "accountId",
        dropDown: accountSelector.accounts.map((item) => {
          const choice: Dropdown = {
            name: item.name,
            value: item.id.toString(),
          };
          return choice;
        }),
      },
    ];
    return dropDowns;
  };

  // action buttons that will be available for the speed dial
  const actions: ButtonAction[] = [
    {
      name: "create transaction",
      icon: <LocalAtmIcon />,
      action: handleCreateClick,
    },
    {
      name: "generate report",
      icon: <IosShareIcon />,
      action: handleExportClick,
    },
    {
      name: "create category",
      icon: <TableViewIcon />,
      action: handleCreateCategoryClick,
    },
  ];

  // sets the Category filter value
  const setCatFilterValue = () => {
    const index = assetSelector.query.filters.findIndex(
      (x) => x.property === "categoryId"
    );
    if (index >= 0) {
      const idValue = parseInt(assetSelector.query.filters[index].value);
      const catIndex = categorySelector.categories.findIndex(
        (x) => x.id === idValue
      );
      if (catIndex >= 0) {
        return categorySelector.categories[catIndex].id.toString();
      }
    }
    return "";
  };

  // sets the Account filter value
  const setAccFilterValue = () => {
    const index = assetSelector.query.filters.findIndex(
      (x) => x.property === "accountId"
    );
    if (index >= 0) {
      const idValue = parseInt(assetSelector.query.filters[index].value);
      const catIndex = accountSelector.accounts.findIndex(
        (x) => x.id === idValue
      );
      if (catIndex >= 0) {
        return accountSelector.accounts[catIndex].id.toString();
      }
    }
    return "";
  };

  // sets the Is Expense filter value
  const setIsExpenseFilterValue = () => {
    const index = assetSelector.query.filters.findIndex(
      (x) => x.property === "isExpense"
    );
    if (index >= 0) {
      const value = assetSelector.query.filters[index].value;
      return value;
    }
    return "";
  };

  const dropdownFilters = [
    {
      component: (
        <FormControl className="w-52" variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={setCatFilterValue()}
            name="categoryId"
            label="Category"
            onChange={(e) =>
              dispatch(
                setAFilters([
                  ...assetSelector.query.filters.filter(
                    (x) => x.property !== "categoryId"
                  ),
                  {
                    id: uuid(),
                    op: "eq",
                    property: e.target.name,
                    type: "int",
                    value: e.target.value.toString(),
                  },
                ])
              )
            }
          >
            {[{ name: "All", id: "" }, ...categorySelector.categories].map(
              (item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      ),
    },
    {
      component: (
        <FormControl className="w-52" variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Account
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={setAccFilterValue()}
            name="accountId"
            label="Account"
            onChange={(e) =>
              dispatch(
                setAFilters([
                  ...assetSelector.query.filters.filter(
                    (x) => x.property !== "accountId"
                  ),
                  {
                    id: uuid(),
                    op: "eq",
                    property: e.target.name,
                    type: "int",
                    value: e.target.value.toString(),
                  },
                ])
              )
            }
          >
            {[{ name: "All", id: "" }, ...accountSelector.accounts].map(
              (item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      ),
    },
    {
      component: (
        <FormControl className="w-52" variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Is Expense
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={setIsExpenseFilterValue()}
            name="isExpense"
            label="Is Expense"
            onChange={(e) =>
              dispatch(
                setAFilters([
                  ...assetSelector.query.filters.filter(
                    (x) => x.property !== "isExpense"
                  ),
                  {
                    id: uuid(),
                    op: "is",
                    property: e.target.name,
                    type: "bool",
                    value: e.target.value,
                  },
                ])
              )
            }
          >
            {[
              { name: "All", id: "" },
              { name: "Yes", id: "true" },
              { name: "No", id: "false" },
            ].map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <div className="w-full h-full shadow p-2">
      <Grid
        data={assetSelector.assets.map((row) => {
          return {
            ...row,
            category: row.category?.name,
            account: row.account?.name,
          };
        })}
        argColumns={getInitalColumns()}
        deleteAction={handleDelete}
        editAction={handleEditClick}
        openFiltersAction={openFiltersAction}
        advFilters={assetSelector.query.advFilters}
        dropdownFilters={dropdownFilters}
      />
      <SpeedDialComponent actions={actions} />
    </div>
  );
};

export default Transactions;

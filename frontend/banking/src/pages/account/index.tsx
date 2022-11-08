import React, { useCallback, useEffect } from "react";
import SpeedDialComponent from "../../components/widgets/speed-dial";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import IosShareIcon from "@mui/icons-material/IosShare";
import TableViewIcon from "@mui/icons-material/TableView";
import { ButtonAction } from "../../core/models/button-actions.model";
import Grid from "../../components/organisms/grid";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { getCategories } from "../../data/features/category/categorySlice";
import { getAssets, setAssets } from "../../data/features/asset/assetSlice";
import {
  getAccounts,
  setAcFilters,
} from "../../data/features/account/accountSlice";
import { Query } from "../../core/models/query.model";
import { assetColumns } from "../../data/constants/data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouteSubscriber } from "../../core/services/hooks/useRouteInfo";

const Account = () => {
  const dispatch = useAppDispatch();
  const routeSubscriber = useRouteSubscriber();
  const assetSelector = useAppSelector((state) => state.assets);
  const categorySelector = useAppSelector((state) => state.categories);
  const accountSelector = useAppSelector((state) => state.accounts);

  useEffect(() => {
    initApp();
    return () => {
      setAssets([]);
    };
  }, [accountSelector.query]);

  const initApp = useCallback(async () => {
    await dispatch(getCategories({} as Query));
    /**
     * fetches data
     * Instead of using assetSlice queries we will use accountSlice query.
     * This is to avoid creating extra state properties in assetSlice.
     * We do not need to filter accounts anyways, since in future, users
     * will only be able to create up to 10 accounts anyways
     * */
    let query = accountSelector.query;
    query = {
      ...query,
      filters: [...query.filters.filter((x) => x.property !== "accountId")],
    };
    if (routeSubscriber.id && parseInt(routeSubscriber.id) > 0) {
      query.filters = [
        ...query.filters,
        {
          id: uuid(),
          property: "accountId",
          op: "eq",
          type: "int",
          value: routeSubscriber.id,
        },
      ];
    }
    await dispatch(getAssets(query));
    await dispatch(
      getAccounts({
        sort: "",
        filters: [
          {
            id: uuid(),
            property: "id",
            op: "eq",
            type: "int",
            value: `${
              routeSubscriber.isDetailSpecific
                ? parseInt(routeSubscriber.id) > 0
                  ? routeSubscriber.id
                  : ""
                : ""
            }`,
          },
        ],
        advFilters: [],
        detail: true,
      })
    );
  }, [dispatch, accountSelector.query, routeSubscriber]);

  // action buttons that will be available for the speed dial
  const actions: ButtonAction[] = [
    {
      name: "create transaction",
      icon: <LocalAtmIcon />,
      action: () => {},
    },
    {
      name: "generate report",
      icon: <IosShareIcon />,
      action: () => {},
    },
    {
      name: "create category",
      icon: <TableViewIcon />,
      action: () => {},
    },
  ];

  // TODO
  const handleDelete = () => {};

  // TODO
  const handleEdit = () => {};

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

  // sets the Category filter value
  const setCatFilterValue = () => {
    const index = accountSelector.query.filters.findIndex(
      (x) => x.property === "categoryId"
    );
    if (index >= 0) {
      const idValue = parseInt(accountSelector.query.filters[index].value);
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
    /** No need to handle the setter since the account
     * filter dropdown will be unavailable anyways
     */
    if (accountSelector.accounts.length > 0) {
      return routeSubscriber.id;
    }
    return "";
  };

  // sets the Is Expense filter value
  const setIsExpenseFilterValue = () => {
    const index = accountSelector.query.filters.findIndex(
      (x) => x.property === "isExpense"
    );
    if (index >= 0) {
      const value = accountSelector.query.filters[index].value;
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
                setAcFilters([
                  ...accountSelector.query.filters.filter(
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
        <FormControl className="w-52" variant="standard" disabled>
          <InputLabel id="demo-simple-select-standard-label">
            Account
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={setAccFilterValue()}
            name="accountId"
            label="Account"
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
                setAcFilters([
                  ...accountSelector.query.filters.filter(
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
        dropdownFilters={dropdownFilters}
        argColumns={getInitalColumns()}
        deleteAction={handleDelete}
        editAction={handleEdit}
      />
      <SpeedDialComponent actions={actions} />
    </div>
  );
};

export default Account;

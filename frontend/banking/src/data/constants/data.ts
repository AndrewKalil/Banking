import { toSpaceSeparated } from "../../core/services/utils/utils";
import { Asset, AssetDto } from "../../core/models/asset.model";
import { Category, CategoryDto } from "../../core/models/category.model";
import { AppColumn } from "../../core/models/column.model";
import { Control } from "../../core/models/form.model";
import { Account } from "../../core/models/account.model";

// Asset
export const assetInstance: Asset = {
  id: 0,
  amount: 0,
  expenseDate: new Date(),
  isExpense: false,
  name: "",
  categoryId: 0,
  createdDate: new Date(),
  description: "",
  updatedDate: new Date(),
  accountId: 0,
};

type AssetColType = Pick<
  Asset,
  | "id"
  | "name"
  | "amount"
  | "category"
  | "account"
  | "isExpense"
  | "expenseDate"
>;

const assetColTypeInstance: AssetColType = {
  id: 0,
  name: "",
  amount: 0,
  isExpense: false,
  category: {} as Category,
  expenseDate: new Date(),
  account: {} as Account,
};

export const assetColumns: AppColumn[] = Object.keys(assetColTypeInstance).map(
  (col, index) => {
    const column: AppColumn = { index, title: col, width: 16 };
    switch (col) {
      case "id":
        return { ...column, width: 4 };

      // case "expenseDate":
      //   return {
      //     ...column,
      //     focus: { active: true, sort: true, order: "desc" },
      //   };

      default:
        return column;
    }
  }
);

export const assetDtoInstance: AssetDto = {
  name: "",
  categoryId: 0,
  description: "",
  amount: 0,
  expenseDate: new Date().toISOString(),
  isExpense: false,
  isTransfer: false,
  accountId: 0,
  accountToId: 0,
};

export const assetDtoColumns: Control[] = Object.keys(assetDtoInstance).map(
  (col) => {
    const entry: Control = {
      label: toSpaceSeparated(col),
      key: col,
      type: "text",
    };
    switch (col) {
      case "categoryId":
      case "accountId":
      case "accountToId":
        return { ...entry, type: "select" };
      case "expenseDate":
        return { ...entry, type: "date" };
      case "amount":
        return { ...entry, type: "number" };
      case "isTransfer":
      case "isExpense":
        return { ...entry, type: "check" };
      default:
        return entry;
    }
  }
);

// Category
export const categoryInstance: Category = {
  id: 0,
  name: "",
  assets: [],
  createdDate: new Date(),
  updatedDate: new Date(),
  description: "",
};

export const categoryDtoInstance: CategoryDto = {
  name: "",
  description: "",
};

export const categoryDtoColumns: Control[] = Object.keys(
  categoryDtoInstance
).map((col) => {
  return {
    label: toSpaceSeparated(col),
    key: col,
    type: "text",
  };
});

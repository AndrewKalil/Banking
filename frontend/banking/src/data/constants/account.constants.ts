import { AccountDto } from "../../core/models/account.model";
import { Control } from "../../core/models/form.model";
import { toSpaceSeparated } from "../../core/services/utils/utils";

export const accountDtoInstance: AccountDto = {
  name: "",
  description: "",
  balance: 0,
  isSavings: false,
  uIcolor: "",
  isCredit: false,
  creditAmount: 0,
};

export const accountDtoColumns: Control[] = Object.keys(accountDtoInstance).map(
  (col) => {
    const entry: Control = {
      label: toSpaceSeparated(col),
      key: col,
      type: "text",
    };
    switch (col) {
      case "creditAmount":
      case "balance":
        return { ...entry, type: "number" };
      case "uIcolor":
        return { ...entry, type: "select" };
      case "isSavings":
      case "isCredit":
        return { ...entry, type: "check" };
      default:
        return entry;
    }
  }
);

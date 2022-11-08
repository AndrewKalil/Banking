import { Account } from "./account.model";
import { Base } from "./base.model";
import { Category } from "./category.model";
import { Transfer, TransferDto } from "./transfer.model";

export interface Asset extends Base {
  categoryId?: number;
  category?: Pick<Category, "id" | "name">;
  accountId?: number;
  account?: Account;
  amount: number;
  isExpense: Required<boolean>;
  isTransfer?: boolean;
  transferId?: number;
  transfer?: Transfer;
  expenseDate: Date;
}

export interface AssetDto
  extends Omit<
    Asset,
    | "id"
    | "createdDate"
    | "updatedDate"
    | "category"
    | "expenseDate"
    | "account"
    | "transfer"
  > {
  accountToId?: number;
  expenseDate: string;
}

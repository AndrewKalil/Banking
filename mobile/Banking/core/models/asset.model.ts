import { Account } from "./account.model";
import { Base } from "./base.model";
import { Category } from "./category.model";
import { Transfer, TransferDto } from "./transfer.model";

export interface Asset extends Base {
  categoryId?: number;
  category?: Pick<Category, "id" | "name">;
  accountId?: number;
  account?: Pick<Account, "uIcolor" | "name" | "balance">;
  amount: number;
  isExpense: Required<boolean>;
  isTransfer?: boolean;
  transferId?: number;
  // transfer?: Transfer;
  expenseDate: string;
}

export interface AssetDto extends Asset {
  accountToId?: number;
  accountTo?: Account;
}

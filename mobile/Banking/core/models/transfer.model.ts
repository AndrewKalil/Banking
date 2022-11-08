import { Account } from "./account.model";
import { Asset } from "./asset.model";
import { Base } from "./base.model";

export interface Transfer extends Base {
  accounts?: Account[];
  transactionDate: Date;
  amount: number;
  assets?: Asset[];
  categoryId?: number;
}

export interface TransferDto
  extends Omit<
    Transfer,
    | "id"
    | "createdDate"
    | "updatedDate"
    | "transactionDate"
    | "accounts"
    | "assets"
  > {
  accountsIds: number[];
  transactionDate: string;
}

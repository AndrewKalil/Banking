import { Asset } from "./asset.model";
import { Base } from "./base.model";
import { Transfer } from "./transfer.model";

export interface Account extends Base {
  balance: number;
  isSavings: boolean;
  isCredit?: boolean;
  creditAmount?: number;
  uIcolor: string;
  transfers: Transfer[];
  assets: Asset[];
}

export interface AccountDto
  extends Omit<
    Account,
    "id" | "createdDate" | "updatedDate" | "assets" | "transfers"
  > {}

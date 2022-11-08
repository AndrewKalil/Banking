import { Asset } from "./asset.model";
import { Base } from "./base.model";

export interface Category extends Base {
  assets?: Asset[];
}

export interface CategoryDto
  extends Omit<Category, "id" | "createdDate" | "updatedDate" | "assets"> {}

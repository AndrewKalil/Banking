import { Filter } from "./filter.model";

export interface Query {
  advFilters: Filter[];
  filters: Filter[];
  detail: boolean;
  sort: string;
}

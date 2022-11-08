export interface Filter {
  id: string;
  property: string;
  op: string;
  type: string;
  value: string;
}

type Op =
  | "in"
  | "="
  | "eq"
  | "<="
  | "lte"
  | ">="
  | "gte"
  | "!="
  | "neq"
  | "<"
  | "lt"
  | ">"
  | "gt"
  | "contains";
type dType = "list" | "int" | "ids" | "default" | "dates" | "date" | "string";

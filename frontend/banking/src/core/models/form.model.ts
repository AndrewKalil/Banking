import { Dropdown } from "./dropdown.model";

export interface FormData {
  controls: Control[];
  object: any;
  lists?: {
    property: string;
    dropDown: Dropdown[];
  }[];
}

export interface Control {
  label: string;
  key: string;
  type: InputTypes;
}

export type InputTypes =
  | "text"
  | "select"
  | "radio"
  | "check"
  | "date"
  | "number";

export type DataType = "category" | "asset" | "account" | "transfer";

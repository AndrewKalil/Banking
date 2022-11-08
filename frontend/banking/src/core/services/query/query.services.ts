import { assetInstance, categoryInstance } from "../../../data/constants/data";
import { Filter } from "../../models/filter.model";
import { DataType } from "../../models/form.model";

export interface Operation {
  name: string;
  types: string[];
}

export interface Property {
  name: string;
  ops: Operation[];
}

export class QueryBuilder {
  _dictionary: Property[] = [];
  _dataType: DataType;
  constructor(dataType?: DataType) {
    this._dataType = dataType || "asset";
    this.constructDictionary();
  }

  constructDictionary = () => {
    let properties;
    if (this._dataType === "category") {
      properties = categoryInstance;
    } else {
      properties = assetInstance;
    }
    const dict = Object.keys(properties).map((key) => {
      const property: Property = {
        name: key,
        ops: this.handleOpsAndTypes(key) as Operation[],
      };
      return property;
    });
    this._dictionary = dict;
  };

  interpretOp = (key: string) => {
    const opDictionary: any = {
      lt: "<",
      gt: ">",
      gte: ">=",
      lte: "<=",
      eq: "==",
      neq: "!=",
    };

    try {
      return opDictionary[key];
    } catch (error) {
      return "invalid";
    }
  };

  handleOpsAndTypes = (key: string): { name: string; types: string[] }[] => {
    const field = key.trim().toLowerCase();
    const intOps = ["in", "eq", "neq", "lte", "gte", "lt", "gt"];
    const dateOps = ["lte", "gte", "lt", "gt", "between"];
    const stringOps = ["in", "eq", "neq", "contains"];
    if (field.includes("id") || field.includes("amount")) {
      return intOps.map((op) => {
        if (op === "in") {
          return { name: op, types: ["list", "ids"] };
        }
        return { name: op, types: ["int"] };
      });
    } else if (field.includes("date")) {
      return dateOps.map((op) => {
        if (op === "between") {
          return { name: op, types: ["dates"] };
        }
        return { name: op, types: ["date"] };
      });
    } else if (field.startsWith("is")) {
      return [{ name: "is", types: ["bool"] }];
    } else {
      return stringOps.map((op) => {
        if (op === "in") {
          return { name: op, types: ["list"] };
        }
        if (op === "contains") {
          return { name: op, types: ["string"] };
        }
        return { name: op, types: ["string"] };
      });
    }
  };

  converToStringQuery = (filter: Filter): string | null => {
    if (
      filter.property === "" ||
      filter.op === "" ||
      filter.type === "" ||
      filter.value === ""
    ) {
      return null;
    }
    return `${filter.property} ${filter.op} ${filter.type}(${filter.value})`;
  };

  convertToUiFriendly = (filter: Filter): string => {
    const field = filter.property.trim().toLocaleLowerCase();
    if (field.includes("date") && filter.op === "between") {
      try {
        const dateSplit = filter.value.split(",");
        return `${field} between '${dateSplit[0]}' and '${dateSplit[1]}'`;
      } catch (error) {
        return "Invalid expression";
      }
    }
    if (filter.op === "in") {
      try {
        const list = filter.value.split(",");
        return `${field} in [${list.toString()}]`;
      } catch (error) {
        return "Invalid expression";
      }
    }

    if (field.includes("id") || field.includes("amount")) {
      return `${field} ${this.interpretOp(filter.op)} ${parseInt(
        filter.value
      )}`;
    }

    if (field.startsWith("is")) {
      return `${field} ${filter.op} ${filter.value}`;
    }

    if (filter.op === "contains") {
      return `${field} ${filter.op} '${filter.value}'`;
    }

    return `${field} ${this.interpretOp(filter.op)} '${filter.value}'`;
  };
}

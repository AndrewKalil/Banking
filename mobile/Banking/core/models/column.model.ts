export interface AppColumn {
  index: number;
  title: string;
  width: number;
  focus?: {
    active: boolean;
    sort: boolean;
    order: Order;
  };
}

export type Order = "desc" | "asc";

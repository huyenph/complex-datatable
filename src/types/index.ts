export interface HeadCell<T> {
  id: keyof T;
  disablePadding: boolean;
  label: string;
  align: "left" | "right" | "center";
  numeric: boolean;
}

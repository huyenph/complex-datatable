import { ReactNode } from "react";
import { HeadCell } from "../types";
interface ComplexTableProps<T> {
    defaultKey: string;
    dense?: boolean;
    headCells: HeadCell<T>[];
    rows: any[];
    isSelecting?: boolean;
    selected?: string[];
    setSelected?: (value: string[]) => void;
    renderRowCells: (row: T) => ReactNode;
    renderCollapseRow?: (row: T) => ReactNode;
    handleSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
    handleClick?: (event: React.MouseEvent<unknown>, name: string) => void | undefined;
    toolbarLabel?: string;
    toolbarAction?: ReactNode;
    enabledNavigate?: boolean;
}
export default function ComplexDataTable<T>(props: ComplexTableProps<T>): import("react").JSX.Element;
export {};

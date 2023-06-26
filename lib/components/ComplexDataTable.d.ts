import { ReactNode } from "react";
import { TableCellProps } from "@mui/material";
export declare const StyledTableCell: import("@emotion/styled").StyledComponent<TableCellProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const StyledTableBody: import("@emotion/styled").StyledComponent<{
    children?: ReactNode;
    classes?: Partial<import("@mui/material").TableBodyClasses> | undefined;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
    ref?: ((instance: HTMLTableSectionElement | null) => void) | import("react").RefObject<HTMLTableSectionElement> | null | undefined;
}, "children" | keyof import("@mui/material/OverridableComponent").CommonProps | "sx"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export interface HeadCell<T> {
    id: keyof T;
    disablePadding: boolean;
    label: string;
    align: "left" | "right" | "center";
    numeric: boolean;
}
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

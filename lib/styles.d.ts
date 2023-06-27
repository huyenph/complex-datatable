/// <reference types="react" />
import { TableCellProps } from "@mui/material";
declare const StyledTableCell: import("@emotion/styled").StyledComponent<TableCellProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
declare const StyledTableBody: import("@emotion/styled").StyledComponent<{
    children?: any;
    classes?: Partial<import("@mui/material").TableBodyClasses> | undefined;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
    ref?: ((instance: HTMLTableSectionElement | null) => void) | import("react").RefObject<HTMLTableSectionElement> | null | undefined;
}, "children" | keyof import("@mui/material/OverridableComponent").CommonProps | "sx"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export { StyledTableCell, StyledTableBody };

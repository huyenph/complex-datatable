import React, { ReactNode } from 'react';
import { SxProps } from '@mui/material/styles';
import { HeadCell } from './types';
interface ComplexTableProps<T> {
    defaultKey: string;
    dense?: boolean;
    headCells: HeadCell<T>[];
    headCellSx?: SxProps;
    rows: any[];
    isSelecting?: boolean;
    selected?: string[];
    setSelected?: (value: string[]) => void;
    rowCells: (row: T) => ReactNode;
    collapseTable?: (row: T) => ReactNode;
    collapseTableHeader?: () => ReactNode;
    handleRowClick?: (event: React.MouseEvent<unknown>, id: string) => void | undefined;
    toolbarLabel?: string;
    toolbarAction?: ReactNode;
    enabledNavigate?: boolean;
    sx?: SxProps;
    toolbarStyle?: SxProps;
    toolbarLabelStyle?: SxProps;
    collapseWrapperStyle?: SxProps;
    rowsPerPageOptions?: number[];
    stickyHeader?: boolean;
    tableContainerStyle?: SxProps;
}
export default function ComplexDataTable<T>(props: ComplexTableProps<T>): React.JSX.Element;
export {};

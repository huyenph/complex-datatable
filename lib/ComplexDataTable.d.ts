import React, { ReactNode } from 'react';
import { SxProps } from '@mui/material';
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
    sx?: SxProps;
    rowCells: (row: T) => ReactNode;
    collapseTable?: (row: T) => ReactNode;
    handleRowClick?: (event: React.MouseEvent<unknown>, id: string) => void | undefined;
    toolbarLabel?: string;
    toolbarAction?: ReactNode;
    enabledNavigate?: boolean;
    toolbarSx?: SxProps;
    toolbarLabelSx?: SxProps;
    rowsPerPageOptions?: number[];
    stickyHeader?: boolean;
    tableContainerSx?: SxProps;
}
export default function ComplexDataTable<T>(props: ComplexTableProps<T>): React.JSX.Element;
export {};

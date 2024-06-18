import React, { useState, useMemo, ReactNode, ChangeEvent, Fragment } from 'react';
import { alpha, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { visuallyHidden } from '@mui/utils';
import { HeadCell } from './types';
import { StyledTableBody, StyledTableCell, StyledCollapseTableCell } from './styles';

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (JSON.stringify(b[orderBy]) < JSON.stringify(a[orderBy])) {
    return -1;
  }
  if (JSON.stringify(b[orderBy]) > JSON.stringify(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: {
    [key in Key]: number | string;
  },
  b: {
    [key in Key]: number | string;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface ComplexTableHeadProps<T> {
  headCells: HeadCell<T>[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  order: Order;
  orderBy: string;
  rowCount: number;
  enableCollapse: boolean;
  headCellSx?: SxProps;
}

function ComplexTableHead<T>(props: ComplexTableHeadProps<T>) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    enableCollapse,
    headCellSx,
  } = props;
  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {onSelectAllClick !== undefined && (
          <StyledTableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </StyledTableCell>
        )}

        {enableCollapse && <StyledTableCell padding="checkbox" />}

        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id as string}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ ...headCellSx }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ComplexTableToolbarProps {
  numSelected: number;
  label?: string;
  action?: ReactNode;
  sx?: SxProps;
  labelSx?: SxProps;
}

function ComplexTableToolbar(props: ComplexTableToolbarProps) {
  const { numSelected, label, action, sx, labelSx } = props;

  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        ...sx,
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{
            flex: '1 1 100%',
            ...labelSx,
          }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : label !== undefined ? (
        <Typography
          sx={{
            flex: '1 1 100%',
            ...labelSx,
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {label}
        </Typography>
      ) : null}
      {action}
    </Toolbar>
  );
}

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

export default function ComplexDataTable<T>(props: ComplexTableProps<T>) {
  const {
    defaultKey,
    dense = false,
    headCells,
    headCellSx,
    rows,
    selected,
    setSelected,
    rowCells,
    collapseTable,
    collapseTableHeader,
    handleRowClick,
    toolbarLabel,
    toolbarAction,
    enabledNavigate = true,
    sx,
    toolbarStyle,
    toolbarLabelStyle,
    collapseWrapperStyle,
    tableContainerStyle,
    rowsPerPageOptions,
    stickyHeader = false,
  } = props;

  const [isOpenCollapse, setOpenCollapse] = useState<any>({});

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(defaultKey as keyof T);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    rowsPerPageOptions !== undefined ? rowsPerPageOptions[0] : 5
  );

  const enableSelected = selected !== undefined && setSelected !== undefined;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onHandleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    if (handleRowClick) {
      handleRowClick(event, id);
    }
  };

  const onHandleRowCheck = (event: ChangeEvent<HTMLElement>, id: string) => {
    if (enableSelected) {
      const selectedIndex = selected.indexOf(id);
      let newSelected: string[] = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onHandleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (enableSelected) {
      if (event.target.checked) {
        const newSelected = rows.map((n) => `${n.id}`);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    }
  };

  const isSelected = (name: string) => (selected ? selected.indexOf(name) !== -1 : false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <Card
      sx={{
        width: '100%',
        mb: collapseTable === undefined ? 0 : 20,
        boxShadow: collapseTable === undefined ? 0 : undefined,
        overflow: stickyHeader ? 'hidden' : undefined,
        ...sx,
      }}
    >
      {(toolbarLabel || (selected ? selected.length : 0) > 0) && (
        <ComplexTableToolbar
          numSelected={selected ? selected.length : 0}
          label={toolbarLabel}
          action={toolbarAction}
          sx={toolbarStyle}
          labelSx={toolbarLabelStyle}
        />
      )}
      <TableContainer sx={tableContainerStyle}>
        <Table
          sx={{
            minWidth: 750,
          }}
          stickyHeader={stickyHeader}
          aria-label="sticky table"
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <ComplexTableHead
            headCells={headCells}
            headCellSx={headCellSx}
            numSelected={selected ? selected.length : 0}
            order={order}
            orderBy={orderBy as string}
            onSelectAllClick={enableSelected ? onHandleSelectAllClick : undefined}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            enableCollapse={collapseTable !== undefined}
          />
          <StyledTableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(`${(row as any).id}`);
              const labelId = `Complex-table-checkbox-${index}`;

              return (
                <Fragment key={`root-${index}`}>
                  <TableRow
                    hover
                    onClick={(event) => onHandleRowClick(event, `${(row as any).id}`)}
                    role={enableSelected ? 'checkbox' : 'list'}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`${(row as any).id}`}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {enableSelected && (
                      <StyledTableCell key={`checkbox-${(row as any).id}`} padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={(event: ChangeEvent<HTMLElement>, _: boolean) =>
                            onHandleRowCheck(event, `${(row as any).id}`)
                          }
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </StyledTableCell>
                    )}
                    {collapseTable && (
                      <StyledTableCell key={`collapse-${(row as any).id}`}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenCollapse((prev: any[]) => ({
                              ...prev,
                              [(row as any).id]: !prev[(row as any).id],
                            }));
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            style={{
                              height: 14,
                              width: 14,
                              transform: isOpenCollapse[(row as any).id]
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                              transitionDuration: '300ms',
                              transitionTimingFunction: 'ease-in-out',
                              transitionProperty: 'transform',
                              pointerEvents: 'none',
                            }}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </IconButton>
                      </StyledTableCell>
                    )}
                    {rowCells(row as T)}
                  </TableRow>
                  {collapseTable && (
                    <TableRow>
                      {/* {enableSelected && (
                        <StyledCollapseTableCell
                          sx={{
                            padding: 0,
                          }}
                        />
                      )}
                      <StyledCollapseTableCell
                        sx={{
                          padding: 0,
                        }}
                      /> */}
                      <StyledCollapseTableCell
                        colSpan={headCells.length + 1 + (enableSelected ? 1 : 0)}
                      >
                        <Collapse in={isOpenCollapse[(row as any).id]} timeout="auto">
                          <Box
                            sx={{
                              padding: 4,
                              ...collapseWrapperStyle,
                            }}
                          >
                            {collapseTableHeader && collapseTableHeader()}
                            {collapseTable(row as T)}
                          </Box>
                        </Collapse>
                      </StyledCollapseTableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <StyledTableCell colSpan={rows.length} />
              </TableRow>
            )}
          </StyledTableBody>
        </Table>
      </TableContainer>
      {enabledNavigate && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions ?? [5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Card>
  );
}

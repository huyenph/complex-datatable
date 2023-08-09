import React, { useState, useMemo, ReactNode } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  Card,
  IconButton,
  Collapse,
  SxProps,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
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
}

function ComplexTableHead<T>(props: ComplexTableHeadProps<T>) {
  const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
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
}

function ComplexTableToolbar(props: ComplexTableToolbarProps) {
  const { numSelected, label, action } = props;

  return (
    <Toolbar
      sx={{
        pl: {
          sm: 2,
        },
        pr: {
          xs: 1,
          sm: 1,
        },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{
            flex: '1 1 100%',
          }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: '1 1 100%',
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {label}
        </Typography>
      )}
      {action}
    </Toolbar>
  );
}

interface ComplexTableProps<T> {
  defaultKey: string;
  dense?: boolean;
  headCells: HeadCell<T>[];
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
}

export default function ComplexDataTable<T>(props: ComplexTableProps<T>) {
  const {
    defaultKey,
    dense = false,
    headCells,
    rows,
    selected,
    setSelected,
    sx,
    rowCells,
    collapseTable,
    handleRowClick,
    toolbarLabel,
    toolbarAction,
    enabledNavigate = true,
  } = props;

  const [isOpenCollapse, setOpenCollapse] = useState<any>({});

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(defaultKey as keyof T);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const enableSelected = selected !== undefined && setSelected !== undefined;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onHandleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
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
    if (handleRowClick) {
      handleRowClick(event, id);
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
        mb: collapseTable === undefined ? 0 : 2,
        boxShadow: collapseTable === undefined ? 0 : undefined,
        ...sx,
      }}
    >
      {toolbarLabel && (
        <ComplexTableToolbar
          numSelected={selected ? selected.length : 0}
          label={toolbarLabel}
          action={toolbarAction}
        />
      )}
      <TableContainer>
        <Table
          sx={{
            minWidth: 750,
          }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <ComplexTableHead
            headCells={headCells}
            numSelected={selected ? selected.length : 0}
            order={order}
            orderBy={orderBy as string}
            onSelectAllClick={enableSelected ? onHandleSelectAllClick : undefined}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <StyledTableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(`${(row as any).id}`);
              const labelId = `Complex-table-checkbox-${index}`;

              return (
                <>
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
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
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
                          <KeyboardArrowDown
                            sx={{
                              transform: isOpenCollapse[(row as any).id]
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                              transitionDuration: '300ms',
                              transitionTimingFunction: 'ease-in-out',
                              transitionProperty: 'transform',
                              pointerEvents: 'none',
                            }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    )}

                    {rowCells(row as T)}
                  </TableRow>
                  {collapseTable && (
                    <TableRow>
                      <StyledCollapseTableCell colSpan={9}>
                        <Collapse in={isOpenCollapse[(row as any).id]} timeout="auto">
                          {collapseTable(row as T)}
                        </Collapse>
                      </StyledCollapseTableCell>
                    </TableRow>
                  )}
                </>
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
          rowsPerPageOptions={[5, 10, 25]}
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

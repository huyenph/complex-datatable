import { useState, useMemo, ReactNode } from "react";
import { alpha } from "@mui/material/styles";
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { HeadCell } from "./types";
import { StyledTableBody, StyledTableCell } from "./styles";
import React from "react";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
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
  onSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | undefined;
  order: Order;
  orderBy: string;
  rowCount: number;
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
  } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
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
                "aria-label": "select all desserts",
              }}
            />
          </StyledTableCell>
        )}

        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id as string}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
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
  renderRowCells: (row: T) => ReactNode;
  renderCollapseRow?: (row: T) => ReactNode;
  handleSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | undefined;
  handleClick?: (
    event: React.MouseEvent<unknown>,
    name: string
  ) => void | undefined;
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
    renderRowCells,
    renderCollapseRow,
    handleSelectAllClick,
    handleClick,
    toolbarLabel,
    toolbarAction,
    enabledNavigate = true,
  } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T>(defaultKey as keyof T);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const onHandleClick = (event: React.MouseEvent<unknown>, name: string) => {
    if (selected && setSelected) {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
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
    if (handleClick) {
      handleClick(event, name);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) =>
    selected ? selected.indexOf(name) !== -1 : false;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Card
      sx={{
        width: "100%",
        mb: renderCollapseRow === undefined ? 0 : 2,
        boxShadow: renderCollapseRow === undefined ? 0 : undefined,
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
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <ComplexTableHead
            headCells={headCells}
            numSelected={selected ? selected.length : 0}
            order={order}
            orderBy={orderBy as string}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <StyledTableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected((row as any).name);
              const labelId = `Complex-table-checkbox-${index}`;

              return (
                <>
                  <TableRow
                    hover
                    onClick={(event) => onHandleClick(event, (row as any).name)}
                    role={
                      handleSelectAllClick !== undefined ? "checkbox" : "list"
                    }
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={(row as any).name}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {handleSelectAllClick !== undefined && (
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </StyledTableCell>
                    )}
                    {renderRowCells(row as T)}
                  </TableRow>
                  {renderCollapseRow && renderCollapseRow(row as T)}
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

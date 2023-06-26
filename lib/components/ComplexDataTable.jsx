"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
var utils_1 = require("@mui/utils");
var styles_2 = require("../styles");
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? function (a, b) { return descendingComparator(a, b, orderBy); }
        : function (a, b) { return -descendingComparator(a, b, orderBy); };
}
function stableSort(array, comparator) {
    var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) { return el[0]; });
}
function ComplexTableHead(props) {
    var headCells = props.headCells, onSelectAllClick = props.onSelectAllClick, order = props.order, orderBy = props.orderBy, numSelected = props.numSelected, rowCount = props.rowCount, onRequestSort = props.onRequestSort;
    var createSortHandler = function (property) { return function (event) {
        onRequestSort(event, property);
    }; };
    return (<material_1.TableHead>
      <material_1.TableRow>
        {onSelectAllClick !== undefined && (<styles_2.StyledTableCell padding="checkbox">
            <material_1.Checkbox color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount} onChange={onSelectAllClick} inputProps={{
                "aria-label": "select all desserts",
            }}/>
          </styles_2.StyledTableCell>)}

        {headCells.map(function (headCell) { return (<styles_2.StyledTableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? order : false}>
            <material_1.TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (<material_1.Box component="span" sx={utils_1.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </material_1.Box>) : null}
            </material_1.TableSortLabel>
          </styles_2.StyledTableCell>); })}
      </material_1.TableRow>
    </material_1.TableHead>);
}
function ComplexTableToolbar(props) {
    var numSelected = props.numSelected, label = props.label, action = props.action;
    return (<material_1.Toolbar sx={__assign({ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }, (numSelected > 0 && {
            bgcolor: function (theme) {
                return (0, styles_1.alpha)(theme.palette.primary.main, theme.palette.action.activatedOpacity);
            },
        }))}>
      {numSelected > 0 ? (<material_1.Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </material_1.Typography>) : (<material_1.Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          {label}
        </material_1.Typography>)}
      {action}
    </material_1.Toolbar>);
}
function ComplexDataTable(props) {
    var defaultKey = props.defaultKey, _a = props.dense, dense = _a === void 0 ? false : _a, headCells = props.headCells, rows = props.rows, selected = props.selected, setSelected = props.setSelected, renderRowCells = props.renderRowCells, renderCollapseRow = props.renderCollapseRow, handleSelectAllClick = props.handleSelectAllClick, handleClick = props.handleClick, toolbarLabel = props.toolbarLabel, toolbarAction = props.toolbarAction, _b = props.enabledNavigate, enabledNavigate = _b === void 0 ? true : _b;
    var _c = (0, react_1.useState)("asc"), order = _c[0], setOrder = _c[1];
    var _d = (0, react_1.useState)(defaultKey), orderBy = _d[0], setOrderBy = _d[1];
    var _e = (0, react_1.useState)(0), page = _e[0], setPage = _e[1];
    var _f = (0, react_1.useState)(5), rowsPerPage = _f[0], setRowsPerPage = _f[1];
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    var onHandleClick = function (event, name) {
        if (selected && setSelected) {
            var selectedIndex = selected.indexOf(name);
            var newSelected = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            }
            else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            }
            else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            }
            else if (selectedIndex > 0) {
                newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            }
            setSelected(newSelected);
        }
        if (handleClick) {
            handleClick(event, name);
        }
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var isSelected = function (name) {
        return selected ? selected.indexOf(name) !== -1 : false;
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    var visibleRows = (0, react_1.useMemo)(function () {
        return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [order, orderBy, page, rowsPerPage]);
    return (<material_1.Card sx={{
            width: "100%",
            mb: renderCollapseRow === undefined ? 0 : 2,
            boxShadow: renderCollapseRow === undefined ? 0 : undefined,
        }}>
      {toolbarLabel && (<ComplexTableToolbar numSelected={selected ? selected.length : 0} label={toolbarLabel} action={toolbarAction}/>)}
      <material_1.TableContainer>
        <material_1.Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
          <ComplexTableHead headCells={headCells} numSelected={selected ? selected.length : 0} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length}/>
          <styles_2.StyledTableBody>
            {visibleRows.map(function (row, index) {
            var isItemSelected = isSelected(row.name);
            var labelId = "Complex-table-checkbox-".concat(index);
            return (<>
                  <material_1.TableRow hover onClick={function (event) { return onHandleClick(event, row.name); }} role={handleSelectAllClick !== undefined ? "checkbox" : "list"} aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected} sx={{ cursor: "pointer" }}>
                    {handleSelectAllClick !== undefined && (<styles_2.StyledTableCell padding="checkbox">
                        <material_1.Checkbox color="primary" checked={isItemSelected} inputProps={{
                        "aria-labelledby": labelId,
                    }}/>
                      </styles_2.StyledTableCell>)}
                    {renderRowCells(row)}
                  </material_1.TableRow>
                  {renderCollapseRow && renderCollapseRow(row)}
                </>);
        })}
            {emptyRows > 0 && (<material_1.TableRow style={{
                height: (dense ? 33 : 53) * emptyRows,
            }}>
                <styles_2.StyledTableCell colSpan={rows.length}/>
              </material_1.TableRow>)}
          </styles_2.StyledTableBody>
        </material_1.Table>
      </material_1.TableContainer>
      {enabledNavigate && (<material_1.TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>)}
    </material_1.Card>);
}
exports.default = ComplexDataTable;

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var Box_1 = __importDefault(require("@mui/material/Box"));
var Table_1 = __importDefault(require("@mui/material/Table"));
var TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
var TableHead_1 = __importDefault(require("@mui/material/TableHead"));
var TablePagination_1 = __importDefault(require("@mui/material/TablePagination"));
var TableRow_1 = __importDefault(require("@mui/material/TableRow"));
var TableSortLabel_1 = __importDefault(require("@mui/material/TableSortLabel"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
var Card_1 = __importDefault(require("@mui/material/Card"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var Collapse_1 = __importDefault(require("@mui/material/Collapse"));
var utils_1 = require("@mui/utils");
var styles_2 = require("./styles");
function descendingComparator(a, b, orderBy) {
    if (JSON.stringify(b[orderBy]) < JSON.stringify(a[orderBy])) {
        return -1;
    }
    if (JSON.stringify(b[orderBy]) > JSON.stringify(a[orderBy])) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
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
    var headCells = props.headCells, onSelectAllClick = props.onSelectAllClick, order = props.order, orderBy = props.orderBy, numSelected = props.numSelected, rowCount = props.rowCount, onRequestSort = props.onRequestSort, enableCollapse = props.enableCollapse, headCellSx = props.headCellSx;
    var createSortHandler = function (property) { return function (event) {
        onRequestSort(event, property);
    }; };
    return (react_1.default.createElement(TableHead_1.default, null,
        react_1.default.createElement(TableRow_1.default, null,
            onSelectAllClick !== undefined && (react_1.default.createElement(styles_2.StyledTableCell, { padding: "checkbox" },
                react_1.default.createElement(Checkbox_1.default, { color: "primary", indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: {
                        'aria-label': 'select all desserts',
                    } }))),
            enableCollapse && react_1.default.createElement(styles_2.StyledTableCell, { padding: "checkbox" }),
            headCells.map(function (headCell) { return (react_1.default.createElement(styles_2.StyledTableCell, { key: headCell.id, align: headCell.align, padding: headCell.disablePadding ? 'none' : 'normal', sortDirection: orderBy === headCell.id ? order : false },
                react_1.default.createElement(TableSortLabel_1.default, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : 'asc', onClick: createSortHandler(headCell.id), sx: __assign({}, headCellSx) },
                    headCell.label,
                    orderBy === headCell.id ? (react_1.default.createElement(Box_1.default, { component: "span", sx: utils_1.visuallyHidden }, order === 'desc' ? 'sorted descending' : 'sorted ascending')) : null))); }))));
}
function ComplexTableToolbar(props) {
    var numSelected = props.numSelected, label = props.label, action = props.action, sx = props.sx, labelSx = props.labelSx;
    return (react_1.default.createElement(Toolbar_1.default, { sx: __assign(__assign({}, (numSelected > 0 && {
            bgcolor: function (theme) {
                return (0, styles_1.alpha)(theme.palette.primary.main, theme.palette.action.activatedOpacity);
            },
        })), sx) },
        numSelected > 0 ? (react_1.default.createElement(Typography_1.default, { sx: __assign({ flex: '1 1 100%' }, labelSx), color: "inherit", variant: "subtitle1", component: "div" },
            numSelected,
            " selected")) : label !== undefined ? (react_1.default.createElement(Typography_1.default, { sx: __assign({ flex: '1 1 100%' }, labelSx), variant: "h6", id: "tableTitle", component: "div" }, label)) : null,
        action));
}
function ComplexDataTable(props) {
    var defaultKey = props.defaultKey, _a = props.dense, dense = _a === void 0 ? false : _a, headCells = props.headCells, headCellSx = props.headCellSx, rows = props.rows, selected = props.selected, setSelected = props.setSelected, rowCells = props.rowCells, collapseTable = props.collapseTable, collapseTableHeader = props.collapseTableHeader, handleRowClick = props.handleRowClick, toolbarLabel = props.toolbarLabel, toolbarAction = props.toolbarAction, _b = props.enabledNavigate, enabledNavigate = _b === void 0 ? true : _b, sx = props.sx, toolbarStyle = props.toolbarStyle, toolbarLabelStyle = props.toolbarLabelStyle, collapseWrapperStyle = props.collapseWrapperStyle, tableContainerStyle = props.tableContainerStyle, rowsPerPageOptions = props.rowsPerPageOptions, _c = props.stickyHeader, stickyHeader = _c === void 0 ? false : _c;
    var _d = (0, react_1.useState)({}), isOpenCollapse = _d[0], setOpenCollapse = _d[1];
    var _e = (0, react_1.useState)('asc'), order = _e[0], setOrder = _e[1];
    var _f = (0, react_1.useState)(defaultKey), orderBy = _f[0], setOrderBy = _f[1];
    var _g = (0, react_1.useState)(0), page = _g[0], setPage = _g[1];
    var _h = (0, react_1.useState)(rowsPerPageOptions !== undefined ? rowsPerPageOptions[0] : 5), rowsPerPage = _h[0], setRowsPerPage = _h[1];
    var enableSelected = selected !== undefined && setSelected !== undefined;
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    var onHandleRowClick = function (event, id) {
        if (handleRowClick) {
            handleRowClick(event, id);
        }
    };
    var onHandleRowCheck = function (event, id) {
        if (enableSelected) {
            var selectedIndex = selected.indexOf(id);
            var newSelected = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
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
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var onHandleSelectAllClick = function (event) {
        if (enableSelected) {
            if (event.target.checked) {
                var newSelected = rows.map(function (n) { return "".concat(n.id); });
                setSelected(newSelected);
                return;
            }
            setSelected([]);
        }
    };
    var isSelected = function (name) { return (selected ? selected.indexOf(name) !== -1 : false); };
    // Avoid a layout jump when reaching the last page with empty rows.
    var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    var visibleRows = (0, react_1.useMemo)(function () {
        return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [order, orderBy, page, rows, rowsPerPage]);
    return (react_1.default.createElement(Card_1.default, { sx: __assign({ width: '100%', mb: collapseTable === undefined ? 0 : 20, boxShadow: collapseTable === undefined ? 0 : undefined, overflow: stickyHeader ? 'hidden' : undefined }, sx) },
        (toolbarLabel || (selected ? selected.length : 0) > 0) && (react_1.default.createElement(ComplexTableToolbar, { numSelected: selected ? selected.length : 0, label: toolbarLabel, action: toolbarAction, sx: toolbarStyle, labelSx: toolbarLabelStyle })),
        react_1.default.createElement(TableContainer_1.default, { sx: tableContainerStyle },
            react_1.default.createElement(Table_1.default, { sx: {
                    minWidth: 750,
                }, stickyHeader: stickyHeader, "aria-label": "sticky table", "aria-labelledby": "tableTitle", size: dense ? 'small' : 'medium' },
                react_1.default.createElement(ComplexTableHead, { headCells: headCells, headCellSx: headCellSx, numSelected: selected ? selected.length : 0, order: order, orderBy: orderBy, onSelectAllClick: enableSelected ? onHandleSelectAllClick : undefined, onRequestSort: handleRequestSort, rowCount: rows.length, enableCollapse: collapseTable !== undefined }),
                react_1.default.createElement(styles_2.StyledTableBody, null,
                    visibleRows.map(function (row, index) {
                        var isItemSelected = isSelected("".concat(row.id));
                        var labelId = "Complex-table-checkbox-".concat(index);
                        return (react_1.default.createElement(react_1.Fragment, { key: "root-".concat(index) },
                            react_1.default.createElement(TableRow_1.default, { hover: true, onClick: function (event) { return onHandleRowClick(event, "".concat(row.id)); }, role: enableSelected ? 'checkbox' : 'list', "aria-checked": isItemSelected, tabIndex: -1, key: "".concat(row.id), selected: isItemSelected, sx: {
                                    cursor: 'pointer',
                                } },
                                enableSelected && (react_1.default.createElement(styles_2.StyledTableCell, { key: "checkbox-".concat(row.id), padding: "checkbox" },
                                    react_1.default.createElement(Checkbox_1.default, { color: "primary", checked: isItemSelected, onChange: function (event, _) {
                                            return onHandleRowCheck(event, "".concat(row.id));
                                        }, inputProps: {
                                            'aria-labelledby': labelId,
                                        } }))),
                                collapseTable && (react_1.default.createElement(styles_2.StyledTableCell, { key: "collapse-".concat(row.id) },
                                    react_1.default.createElement(IconButton_1.default, { onClick: function (e) {
                                            e.stopPropagation();
                                            setOpenCollapse(function (prev) {
                                                var _a;
                                                return (__assign(__assign({}, prev), (_a = {}, _a[row.id] = !prev[row.id], _a)));
                                            });
                                        } },
                                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", style: {
                                                height: 14,
                                                width: 14,
                                                transform: isOpenCollapse[row.id]
                                                    ? 'rotate(180deg)'
                                                    : 'rotate(0deg)',
                                                transitionDuration: '300ms',
                                                transitionTimingFunction: 'ease-in-out',
                                                transitionProperty: 'transform',
                                                pointerEvents: 'none',
                                            } },
                                            react_1.default.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }))))),
                                rowCells(row)),
                            collapseTable && (react_1.default.createElement(TableRow_1.default, null,
                                react_1.default.createElement(styles_2.StyledCollapseTableCell, { colSpan: headCells.length + 1 + (enableSelected ? 1 : 0) },
                                    react_1.default.createElement(Collapse_1.default, { in: isOpenCollapse[row.id], timeout: "auto" },
                                        react_1.default.createElement(Box_1.default, { sx: __assign({ padding: 4 }, collapseWrapperStyle) },
                                            collapseTableHeader && collapseTableHeader(),
                                            collapseTable(row))))))));
                    }),
                    emptyRows > 0 && (react_1.default.createElement(TableRow_1.default, { style: {
                            height: (dense ? 33 : 53) * emptyRows,
                        } },
                        react_1.default.createElement(styles_2.StyledTableCell, { colSpan: rows.length })))))),
        enabledNavigate && (react_1.default.createElement(TablePagination_1.default, { rowsPerPageOptions: rowsPerPageOptions !== null && rowsPerPageOptions !== void 0 ? rowsPerPageOptions : [5, 10, 25], component: "div", count: rows.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage }))));
}
exports.default = ComplexDataTable;
//# sourceMappingURL=ComplexDataTable.js.map
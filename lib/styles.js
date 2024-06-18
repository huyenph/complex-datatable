"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCollapseTableCell = exports.StyledTableBody = exports.StyledTableCell = void 0;
var TableBody_1 = __importDefault(require("@mui/material/TableBody"));
var TableCell_1 = __importDefault(require("@mui/material/TableCell"));
var styles_1 = require("@mui/material/styles");
exports.StyledTableCell = (0, styles_1.styled)(TableCell_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        textTransform: 'initial',
        color: theme.palette.common.black,
    });
});
exports.StyledTableBody = (0, styles_1.styled)(TableBody_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        textTransform: 'initial',
        '& .MuiTableCell-body': {
            color: theme.palette.grey[800],
        },
    });
});
exports.StyledCollapseTableCell = (0, styles_1.styled)(TableCell_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        textTransform: 'initial',
        color: theme.palette.common.black,
        '&.MuiTableCell-root:last-child': {
            padding: 0,
        },
        borderBottom: 'none',
    });
});
//# sourceMappingURL=styles.js.map
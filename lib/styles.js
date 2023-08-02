"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTableBody = exports.StyledTableCell = void 0;
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
exports.StyledTableCell = (0, styles_1.styled)(material_1.TableCell)(function (_a) {
    var theme = _a.theme;
    return ({
        textTransform: 'initial',
        color: theme.palette.common.black,
    });
});
exports.StyledTableBody = (0, styles_1.styled)(material_1.TableBody)(function (_a) {
    var theme = _a.theme;
    return ({
        textTransform: 'initial',
        '& .MuiTableCell-body': {
            color: theme.palette.grey[800],
        },
    });
});
//# sourceMappingURL=styles.js.map
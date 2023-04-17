"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Users_module_css_1 = require("./../../components/Users/Users.module.css");
var Paginator = function (_a) {
    var totalCount = _a.totalCount, pageSize = _a.pageSize, currentPage = _a.currentPage, onChanged = _a.onChanged, _b = _a.portionSize, portionSize = _b === void 0 ? 10 : _b;
    var pageCount = Math.ceil(totalCount / pageSize);
    var pages = [];
    for (var i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    var portionCount = Math.ceil(pageCount / portionSize);
    var _c = react_1.useState(1), portionNumber = _c[0], setPortionNumber = _c[1];
    var leftPortionPagesNumber = (portionNumber - 1) * portionSize + 1;
    var rightPortionPagesNumber = portionNumber * portionSize;
    return (react_1["default"].createElement("div", null,
        portionNumber > 1 &&
            react_1["default"].createElement("button", { onClick: function () { setPortionNumber(portionNumber - 1); } }, "PREV"),
        pages
            .filter(function (p) { return p >= leftPortionPagesNumber && p <= rightPortionPagesNumber; })
            .map(function (number) {
            return react_1["default"].createElement("span", { key: number, className: currentPage === number ? Users_module_css_1["default"].selected : Users_module_css_1["default"].pag, onClick: function () { onChanged(number); } }, number);
        }),
        portionCount > portionNumber &&
            react_1["default"].createElement("button", { onClick: function () { setPortionNumber(portionNumber + 1); } }, "NEXT")));
};
exports["default"] = Paginator;

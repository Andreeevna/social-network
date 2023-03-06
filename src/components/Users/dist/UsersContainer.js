"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var users_reducer_1 = require("../../redux/users-reducer");
var Users_1 = require("./Users");
var Preloader_1 = require("../../common/Preloader/Preloader");
var redux_1 = require("redux");
var withAuthNavigate_1 = require("../../hoc/withAuthNavigate");
var users_selectors_1 = require("../../redux/users-selectors");
var UsersContainerAPI = /** @class */ (function (_super) {
    __extends(UsersContainerAPI, _super);
    function UsersContainerAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChanged = function (number) {
            _this.props.getUsersT(_this.props.pageSize, number);
        };
        return _this;
    }
    UsersContainerAPI.prototype.componentDidMount = function () {
        this.props.getUsersT(this.props.pageSize, this.props.currentPage);
    };
    UsersContainerAPI.prototype.render = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h2", null, this.props.pageTitle),
            react_1["default"].createElement("div", null, this.props.isFetching ? react_1["default"].createElement(Preloader_1["default"], null) : null),
            react_1["default"].createElement(Users_1["default"], { totalCount: this.props.totalCount, pageSize: this.props.pageSize, currentPage: this.props.currentPage, onChanged: this.onChanged, users: this.props.users, followingInProgress: this.props.followingInProgress, followUsers: this.props.followUsers, unfollowUsers: this.props.unfollowUsers, portionSize: this.props.portionSize })));
    };
    return UsersContainerAPI;
}(react_1["default"].Component));
var mapStateToProps = function (state) {
    return {
        users: users_selectors_1.getUsersSelect(state),
        pageSize: users_selectors_1.getPageSize(state),
        totalCount: users_selectors_1.getTotalUsersCount(state),
        currentPage: users_selectors_1.getCurrentPage(state),
        isFetching: users_selectors_1.getIsFetching(state),
        followingInProgress: users_selectors_1.getFollowingInProgress(state),
        portionSize: users_selectors_1.getPortionSize(state)
    };
};
exports["default"] = redux_1.compose(withAuthNavigate_1.withAuthNavigate, 
// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
react_redux_1.connect(mapStateToProps, {
    getUsersT: users_reducer_1.getUsersT,
    followUsers: users_reducer_1.followUsers,
    unfollowUsers: users_reducer_1.unfollowUsers
}))(UsersContainerAPI);

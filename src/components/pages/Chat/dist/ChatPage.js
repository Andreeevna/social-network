"use strict";
exports.__esModule = true;
exports.MessageForm = exports.Message = exports.Messages = exports.Chat = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_redux_2 = require("react-redux");
var chat_reducer_1 = require("../../../redux/chat-reducer");
var ChatPage_module_css_1 = require("./ChatPage.module.css");
var ChatPage = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(exports.Chat, null)));
};
exports["default"] = ChatPage;
exports.Chat = function () {
    var dispatch = react_redux_2.useDispatch();
    var status = react_redux_1.useSelector(function (state) { return state.chat.status; });
    react_1.useEffect(function () {
        // @ts-ignore
        dispatch(chat_reducer_1.startMessagesListening());
        return function () {
            // @ts-ignore
            dispatch(chat_reducer_1.stopMessagesListening());
        };
    }, []);
    return (react_1["default"].createElement("div", null,
        status === "error" && react_1["default"].createElement("div", null, " Some error occured. Please refresh the page"),
        react_1["default"].createElement(exports.Messages, null),
        react_1["default"].createElement(exports.MessageForm, null)));
};
exports.Messages = function () {
    var messages = react_redux_1.useSelector(function (state) { return state.chat.messages; });
    var messagesAnchorRef = react_1["default"].useRef(null);
    var _a = react_1.useState(true), isAutoScroll = _a[0], setIsAutoScroll = _a[1];
    var scrollHandler = function (e) {
        var element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        }
        else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };
    react_1.useEffect(function () {
        if (messagesAnchorRef.current && isAutoScroll) {
            messagesAnchorRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
    }, [messages]);
    return (react_1["default"].createElement("div", { className: ChatPage_module_css_1["default"].messages__container, onScroll: scrollHandler },
        messages.map(function (m, index) { return (react_1["default"].createElement(exports.Message, { key: m.id, message: m })); }),
        react_1["default"].createElement("div", { ref: messagesAnchorRef })));
};
exports.Message = react_1["default"].memo(function (_a) {
    // console.log("<<<<<<message")
    var message = _a.message;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("img", { src: message.photo, className: ChatPage_module_css_1["default"].image }),
        react_1["default"].createElement("b", null, message.userName),
        react_1["default"].createElement("br", null),
        message.message,
        react_1["default"].createElement("br", null)));
});
exports.MessageForm = function () {
    var _a = react_1.useState(""), message = _a[0], setMessage = _a[1];
    var dispatch = react_redux_2.useDispatch();
    var status = react_redux_1.useSelector(function (state) { return state.chat.status; });
    var sendMessageHandler = function () {
        if (!message) {
            return;
        }
        //@ts-ignore
        dispatch(chat_reducer_1.sendMessageT(message));
        setMessage("");
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("textarea", { onChange: function (e) { return setMessage(e.currentTarget.value); }, value: message })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("button", { disabled: status !== "ready", onClick: sendMessageHandler }, "Send"))));
};

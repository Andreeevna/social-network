"use strict";
exports.__esModule = true;
exports.chatAPI = void 0;
var subscribers = {
    'message-recieved': [],
    'status-changed': []
};
var webS = null;
var closeHandler = function () {
    notifySubscribersAboutStatus("pending");
    setTimeout(createChannel, 3000);
};
var onMessageHandler = function (e) {
    var newMessages = JSON.parse(e.data);
    subscribers['message-recieved'].forEach(function (s) { return s(newMessages); });
};
var onOpenHandler = function () {
    notifySubscribersAboutStatus("ready");
};
var onErrorHandler = function () {
    notifySubscribersAboutStatus("error");
    console.error("RESTART PAGE");
};
var cleanUp = function () {
    if (webS) {
        webS.removeEventListener('close', closeHandler);
        webS.removeEventListener("message", onMessageHandler);
        webS.removeEventListener('open', onOpenHandler);
        webS.removeEventListener("eror", onErrorHandler);
        webS.close();
    }
};
var notifySubscribersAboutStatus = function (status) {
    subscribers['status-changed'].forEach(function (s) { return s(status); });
};
function createChannel() {
    cleanUp();
    webS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus("pending");
    webS.addEventListener("close", closeHandler);
    webS.addEventListener("message", onMessageHandler);
    webS.addEventListener("open", onOpenHandler);
    webS.addEventListener("eror", onErrorHandler);
}
exports.chatAPI = {
    start: function () {
        createChannel();
    },
    stop: function () {
        subscribers['message-recieved'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
    },
    subscribe: function (eventName, callback) {
        //@ts-ignore
        subscribers[eventName].push(callback);
        return function () {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(function (s) { return s !== callback; });
        };
    },
    unsubscribe: function (eventName, callback) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(function (s) { return s !== callback; });
    },
    senMessage: function (message) {
        if (webS) {
            webS.send(message);
        }
    }
};

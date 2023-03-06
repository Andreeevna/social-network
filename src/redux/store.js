
// import profileReducer from './profile-reducer';
// import dialogsReducer from './dialogs-reducer';
// import sidebarReducer from './sidebar-reducer';





// let store = {
//     _state: {
//         profilePage: {
//             posts: [
//                 { id: 1, message: 'Hi, how are you?', likesCount: 12 },
//                 { id: 2, message: 'It is my first post', likesCount: 11 }
//             ],
//             newPostText: 'it-samurai'
//         },

//         dialogsPage: {
//             dialogs: [
//                 { id: 1, name: 'Dima' },
//                 { id: 2, name: 'Andrey' },
//                 { id: 3, name: 'Sveta' },
//                 { id: 4, name: 'Sasha' },
//                 { id: 5, name: 'Valera' },
//                 { id: 6, name: 'Viktor' }
//             ],
//             messages: [
//                 { id: 1, message: 'Hi' },
//                 { id: 2, message: 'Whats your name?' },
//                 { id: 3, message: 'Yo' },
//                 { id: 4, message: 'Yo' },
//                 { id: 5, message: 'Yo' },
//                 { id: 6, message: 'Yo' }
//             ],
//             newMessageBody: ''
//         },
//         sidebar: {

//         }

//     },

//     getState() {
//         return this._state;
//     },
//     _callSubscriber() {
//         console.log("change add")
//     },


//     addMessage() {
//         let newMessage = {
//             id: 7,
//             message: this._state.dialogsPage.newTextMessage
//         }

//         this._state.dialogsPage.messages.push(newMessage);
//         this._state.dialogsPage.newTextMessage = '';
//         this._callSubscriber(this._state);
//     },

//     updateNewMessageText(newNessageText) {
//         this._state.dialogsPage.newTextMessage = newNessageText;
//         this._callSubscriber(this._state);
//     },

//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },

//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        
//         this._callSubscriber(this._state);

//     }
// }


// // window.store = store;

// export default store;
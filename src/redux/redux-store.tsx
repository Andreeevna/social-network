import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import newsReducer from './news-reducer';
import usersReducer from './users-reducer';
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import navReducer from "./nav-reducer";
import { reducer as formReducer } from 'redux-form'
import chatReducer from "./chat-reducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


let rootReducer = combineReducers({
  profilePage: profileReducer,
  sidebar: sidebarReducer,
  newsPage: newsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  appPage: appReducer,
  chat: chatReducer,
  nav: navReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profilePage']
}

type RootReducerType = typeof rootReducer; // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

type PropActionsTypes<T> = T extends { [key: string]: infer U } ? U : never;


export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropActionsTypes<T>>


const persistedReducer = persistReducer(persistConfig, rootReducer)
// @ts-ignore
let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store)

// @ts-ignore
window.store = store;

export default store;
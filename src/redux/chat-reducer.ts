import React from "react";
import { chatAPI, ChatMessageType, StatusType } from './../api/chat-api';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, AppStateType } from './redux-store';
import { Dispatch } from 'react';
import {v1} from "uuid"

const MESSAGES_RECEIVED = "chat/MESSAGES_RECEIVED";
const STATUS_CHANGED = "chat/STATUS_CHANGED";

export type ChatMessageWithIDType = ChatMessageType & {id: string}


type InitialStateType = {
  messages: ChatMessageWithIDType[],
  status: StatusType

}

let initialState: InitialStateType= {
  messages: [] as ChatMessageWithIDType[],
  status: "pending" as StatusType
};

type ActionType = InferActionsTypes<typeof actions>


const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map((m)=> ({...m, id:v1() }))].filter((m,index, array) => index >= array.length - 100)
      }

      case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status
      }

    default:
      return state;
  }
};


export const actions = {
  messagesReceived: (messages: ChatMessageType[])=> {
    return {
      type: MESSAGES_RECEIVED,
      payload: {messages}
    } as const 
  },
  statusChanged: (status: StatusType)=> {
    return {
      type: STATUS_CHANGED,
      payload: {status}
    } as const 
  }
}

let _newMessageHandlerCreator: ((messages: ChatMessageType[])=> void) | null = null;

const newMessageHandlerCreator = (dispatch: any) => {
  if (_newMessageHandlerCreator === null) {
    _newMessageHandlerCreator =  (messages)=> {
      dispatch(actions.messagesReceived(messages))
      }
  }
  return  _newMessageHandlerCreator
}

let _statusHandlerCreator: ((status: StatusType)=> void) | null = null;

const statusHandlerCreator = (dispatch: any) => {
  if (_statusHandlerCreator === null) {
    _statusHandlerCreator =  (status)=> {
      dispatch(actions.statusChanged(status))
      }
  }
  return  _statusHandlerCreator
}



export const startMessagesListening = ():ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-recieved', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusHandlerCreator(dispatch));
  }
}

export const stopMessagesListening = ():ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    chatAPI.unsubscribe('message-recieved',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed' ,newMessageHandlerCreator(dispatch))
    chatAPI.stop()
  }
}

export const sendMessageT = (message: string):ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    chatAPI.senMessage(message);
  }
}

export default chatReducer;

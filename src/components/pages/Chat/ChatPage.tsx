import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ChatMessageWithIDType, sendMessageT, startMessagesListening, stopMessagesListening } from "../../../redux/chat-reducer";
import { AppStateType } from "../../../redux/redux-store";
import s from "./ChatPage.module.css";

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type PropsType = {};

const ChatPage: React.FC<PropsType> = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export default ChatPage;

export const Chat: React.FC<PropsType> = () => {
  const dispatch = useDispatch();
  const status = useSelector((state:AppStateType)=> state.chat.status)


  useEffect(() => {
    // @ts-ignore
    dispatch(startMessagesListening());
    return () => {
          // @ts-ignore
      dispatch(stopMessagesListening())
    }

  }, [])
 



  return (
    <div>
      { status === "error" && <div> Some error occured. Please refresh the page</div>}

      <Messages/>
      <MessageForm /> 
    </div>
  );
};

export const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = React.useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);


  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;

    if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight)< 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }

  }

  useEffect (()=> {
    if(messagesAnchorRef.current && isAutoScroll) {
      messagesAnchorRef.current.scrollIntoView({ block: 'end', behavior: 'smooth'});
    }
  }, [messages])

  return (
    <div className={s.messages__container} onScroll={scrollHandler}>
      {messages.map((m: ChatMessageWithIDType, index: number) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

export const Message: React.FC<{ message: ChatMessageType }> = React.memo( ({
  message}) => {
    // console.log("<<<<<<message")

  return (
    <div>
      <img src={message.photo} className={s.image} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <br />
    </div>
  );
})

export const MessageForm: React.FC<{ }> = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()

  const status = useSelector((state:AppStateType)=> state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    //@ts-ignore
    dispatch(sendMessageT(message))
    setMessage("");
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button
        disabled={status !== "ready"}
          onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

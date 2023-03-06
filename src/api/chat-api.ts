const subscribers = {
  'message-recieved': [] as MessagesRecievedSubscriberType[],
  'status-changed':  [] as StatusChangedSubscriberType[]
}

var webS: WebSocket | null = null;

type EventsNamesType = 'message-recieved' | 'status-changed'

const closeHandler = () => {
  notifySubscribersAboutStatus("pending")
  setTimeout(createChannel, 3000);
  }

  const onMessageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['message-recieved'].forEach((s)=> s(newMessages))
  }
  
  const onOpenHandler = () => {
    notifySubscribersAboutStatus("ready")
  }


  const onErrorHandler = () => {
    notifySubscribersAboutStatus("error")
    console.error("RESTART PAGE")
  }

  const cleanUp = () => {
    if (webS) {
    webS.removeEventListener('close', closeHandler);
    webS.removeEventListener("message", onMessageHandler);
    webS.removeEventListener('open', onOpenHandler);
    webS.removeEventListener("eror", onErrorHandler);
    webS.close();
    }
  }


const notifySubscribersAboutStatus = (status: StatusType)=> {
  subscribers['status-changed'].forEach((s)=> s(status))
}

function createChannel() {
      cleanUp()
   
    webS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus("pending")
    webS.addEventListener("close", closeHandler);
    webS.addEventListener("message", onMessageHandler);
    webS.addEventListener("open", onOpenHandler);
    webS.addEventListener("eror", onErrorHandler);

  }

export const chatAPI = {
    start() {
      createChannel();
    },
    stop() {
      subscribers['message-recieved'] = [];
      subscribers['status-changed'] = [];

        cleanUp();
    },
    subscribe(eventName: EventsNamesType, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
      //@ts-ignore
        subscribers[eventName].push(callback);
        return () => {
      //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s)=> s!== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s)=> s!== callback)
    },
    senMessage(message: string) {
      if(webS) {
        webS.send(message)
      }
    }
}


type MessagesRecievedSubscriberType = (message: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void




export type StatusType =  "pending" | "ready" | "error";

export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
  };
  

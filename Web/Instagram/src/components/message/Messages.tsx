import { useEffect, useRef } from "react";
import { useSocketContext } from "../../context/SocketContext";
import HeaderMessages from "./HeaderMessages";
import { useAuthContext } from "../../context/AuthContext";
import MessageWithDays from "./MessagesWithDays";
import { changeMessageToMessageWithDay } from "../../utils";

export default function Messages({ conversation, messages, setMessages }) {
  const { socket } = useSocketContext();
  const { userId } = useAuthContext();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      setMessages(changeMessageToMessageWithDay(newMessage, messages));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);

  const lastMessageRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="w-full">
      <HeaderMessages conversation={conversation} />
      <div className="mb-[90px] flex flex-col">
        {messages.map((message) => {
          return (
            <MessageWithDays
              messageWithDays={message}
              lastMessageRef={lastMessageRef}
              userId={userId}
              conversation={conversation}
            />
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { useSocketContext } from "../../context/SocketContext";
import HeaderMessages from "./HeaderMessages";
import Message from "./Message";
import { useAuthContext } from "../../context/AuthContext";

export default function Messages({ conversation, messages, setMessages }) {
  const { socket } = useSocketContext();
  const { userId } = useAuthContext();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);

  const lastMessageRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef)
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="w-full">
      <HeaderMessages conversation={conversation} />
      <div className="mb-[90px] flex flex-col">
        {messages.map((message) => {
          return (
            <div className="w-full" ref={lastMessageRef}>
              <Message message={message} userId={userId} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

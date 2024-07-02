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
    }, 500);
  }, [messages, lastMessageRef]);
  useEffect(() => {
    messages.forEach((messageWithDays) => {
      messageWithDays.messages.forEach((message) => {
        const messageEle = document.getElementById(`message__${message._id}`);
        if (messageEle) {
          const image =
            messageEle.querySelectorAll("img")[
              messageEle.querySelectorAll("img")[1] ? 1 : 0
            ];
          if (image) {
            image.onload = function () {
              if (!image.naturalWidth) return;
              if (image.naturalHeight >= 300) {
                image.style.height = `${Math.floor(
                  image.naturalHeight * 0.6
                )}px`;
                image.style.width = "auto";
              } else {
                image.style.width = `${
                  image.naturalWidth >= 300
                    ? Math.floor(image.naturalWidth * 0.6)
                    : image.naturalWidth
                }px `;
                image.style.height = "auto";
              }
            };
          }
        }
      });
    });
  }, [messages]);
  return (
    <div id="messages">
      <HeaderMessages conversation={conversation} />
      <div className="flex flex-col">
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

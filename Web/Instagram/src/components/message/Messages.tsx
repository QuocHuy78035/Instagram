import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import HeaderMessages from "./HeaderMessages";
import { useAuthContext } from "../../context/AuthContext";
import MessageWithDays from "./MessagesWithDays";
import {
  changeMessageToMessageWithDay,
  concatTwoMessagesWithDay,
} from "../../utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { findByConversation } from "../../api";
import usePage from "../../zustand/usePage";

export default function Messages({
  conversation,
  messages,
  setMessages,
  param,
}) {
  const { socket } = useSocketContext();
  const { userId } = useAuthContext();
  const [hasMore, setHasMore] = useState(true);
  const { page, setPage } = usePage();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      setMessages(changeMessageToMessageWithDay(newMessage, messages));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);

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

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        if (!param.id) return;
        let messagesClone: Array<any> = [];
        for (let i = 1; i <= page; i++) {
          const dataMessages = await findByConversation(param.id, i);
          if (dataMessages.status === 200) {
            if (dataMessages.metadata.messages.length) {
              messagesClone = concatTwoMessagesWithDay(
                messagesClone,
                dataMessages.metadata.messages
              );
            } else {
              setHasMore(false);
              break;
            }
          }
        }
        setMessages(messagesClone);
      })();
    }, 500);
  }, [page]);

  const fetchMoreData = () => {
    if (!hasMore) return;
    setPage(page + 1);
    console.log("Loading!");
  };
  return (
    <div id="messages">
      {!hasMore ? <HeaderMessages conversation={conversation} /> : ""}
      <div className="flex flex-col">
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          inverse={true}
          hasMore={true}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          loader={
            hasMore ? (
              <div className="absolute top-[90px] w-full">
                <div className="loader mx-auto"></div>
              </div>
            ) : (
              ""
            )
          }
          scrollableTarget="scroll__messages"
          scrollThreshold={`${
            1200 - page * 200 >= 0 ? 1200 - page * 200 : 0
          }px`}
        >
          {messages.map((message) => {
            return (
              <MessageWithDays
                messageWithDays={message}
                userId={userId}
                conversation={conversation}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

import { useEffect } from "react";
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

export default function Messages(body: {
  conversation: any;
  messages: Array<any>;
  setMessages: (arr: Array<any>) => void;
  param: any;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}) {
  const { socket } = useSocketContext();
  const { userId } = useAuthContext();

  const { page, setPage } = usePage();
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      body.setMessages(
        changeMessageToMessageWithDay(newMessage, body.messages)
      );
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, body.setMessages, body.messages]);

  useEffect(() => {
    body.messages.forEach((messageWithDays) => {
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
  }, [body.messages]);

  useEffect(() => {
    (async () => {
      if (!body.param.id) return;
      if (page === 1) return;
      let messagesClone: Array<any> = [];
      const nextPageMessages = await findByConversation(
        body.param.id,
        page + 1
      );
      if (!nextPageMessages.metadata.messages.length) {
        body.setHasMore(false);
      }
      for (let i = 1; i <= page; i++) {
        const dataMessages = await findByConversation(body.param.id, i);
        if (dataMessages.status === 200) {
          if (dataMessages.metadata.messages.length) {
            messagesClone = concatTwoMessagesWithDay(
              messagesClone,
              dataMessages.metadata.messages
            );
          }
        }
      }
      body.setMessages([...messagesClone]);
    })();
    // }
  }, [page]);

  const fetchMoreData = () => {
    if (!body.hasMore) return;
    setPage(page + 1);
    console.log("Loading!");
  };
  return (
    <>
      <div id="messages">
        {!body.hasMore ? (
          <HeaderMessages conversation={body.conversation} />
        ) : (
          ""
        )}
        <div className="flex flex-col">
          <InfiniteScroll
            dataLength={body.messages.length}
            next={fetchMoreData}
            inverse={true}
            hasMore={body.hasMore}
            style={{ display: "flex", flexDirection: "column-reverse" }}
            loader={
              body.hasMore ? (
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
            {body.messages.map((message) => {
              return (
                <MessageWithDays
                  messageWithDays={message}
                  userId={userId}
                  conversation={body.conversation}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

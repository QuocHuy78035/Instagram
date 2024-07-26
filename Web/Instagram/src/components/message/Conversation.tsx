import { createRef, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { findByConversation, getConversation } from "../../api";
import HeaderConversation from "./HeaderConversation";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
import usePage from "../../zustand/usePage";
import useMessages from "../../zustand/useMessages";
import { concatTwoMessagesWithDay } from "../../utils";

export default function Conversation() {
  const param = useParams();
  const { conversation, setConversation } = useConversation();
  const [isLoading, setIsLoading] = useState(true);
  const { messages, setMessages } = useMessages();
  const [hasMore, setHasMore] = useState(true);
  const { setPage } = usePage();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!param.id) return;
      const [dataConversation, dataMessages] = await Promise.all([
        getConversation(param.id),
        findByConversation(param.id, 1),
      ]);
      if (dataConversation.status === 200) {
        setConversation(dataConversation.metadata.conversation);
      }
      if (dataMessages.status === 200) {
        if (dataMessages.metadata.messages.length) {
          setMessages(
            concatTwoMessagesWithDay([], dataMessages.metadata.messages)
          );
        } else {
          setHasMore(false);
        }
      }
      setIsLoading(false);
    })();

    // (async () => {
    //   if (!param.id) return;

    //   const dataConversation = await getConversation(param.id);
    //   if (dataConversation.status === 200) {
    //     setConversation(dataConversation.metadata.conversation);
    //   }
    // })();
  }, [setConversation, param.id]);
  useEffect(() => {
    setMessages([]);
    setPage(1);
  }, [param.id]);

  const conversationRef = createRef<any>();
  const useRefDimensions = (ref) => {
    const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
    useEffect(() => {
      if (ref.current) {
        const { current } = ref;
        const boundingRect = current.getBoundingClientRect();
        const { width, height } = boundingRect;
        setDimensions({ width: Math.round(width), height: Math.round(height) });
      }
    }, [ref]);
    return dimensions;
  };
  const dimensions = useRefDimensions(conversationRef);

  return (
    <>
      {!isLoading ? (
        <div
          id="conversation"
          className="relative flex-grow flex flex-col overflow-y-hidden h-full"
          ref={conversationRef}
        >
          <HeaderConversation conversation={conversation} />
          <div
            id="scroll__messages"
            className="flex flex-col-reverse w-full flex-grow overflow-y-auto mb-[70px]"
          >
            <Messages
              conversation={conversation}
              messages={messages}
              setMessages={setMessages}
              param={param}
              hasMore={hasMore}
              setHasMore={setHasMore}
            />
          </div>
          <MessageInput
            messages={messages}
            setMessages={setMessages}
            conversationRef={conversationRef}
            dimensions={dimensions}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

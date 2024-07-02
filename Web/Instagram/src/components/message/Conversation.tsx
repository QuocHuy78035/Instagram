import { createRef, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { getConversation } from "../../api";
import HeaderConversation from "./HeaderConversation";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import useConversation from "../../zustand/useConversation";

export default function Conversation() {
  const param = useParams();
  const { conversation, setConversation } = useConversation();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    (async () => {
      if (!param.id) return;
      setIsLoading(true);
      const data = await getConversation(param.id);
      if (data.status === 200) {
        setConversation(data.metadata.conversation);
        setMessages(data.metadata.conversation.messages);
        setIsLoading(false);
      }
    })();
  }, [setMessages, param.id]);
  useEffect(() => {
    if (isLoading) return;
    const scrollMessage = document.querySelector(".scroll__messages");
    const messagesEle = document.getElementById("messages");
    if (scrollMessage && messagesEle) {
      scrollMessage.scrollTo(0, messagesEle.scrollHeight);
    }
  }, [isLoading, messages]);
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
          className="flex-grow flex flex-col overflow-y-hidden h-full"
          ref={conversationRef}
        >
          <HeaderConversation conversation={conversation} />
          <div className="scroll__messages relative w-full flex-grow overflow-y-scroll mb-[70px]">
            <Messages
              conversation={conversation}
              messages={messages}
              setMessages={setMessages}
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

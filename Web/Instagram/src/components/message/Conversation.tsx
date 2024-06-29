import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { getConversation } from "../../api";
import HeaderConversation from "./HeaderConversation";
import Messages from "./Messages";
import { useParams } from "react-router-dom";

export default function Conversation() {
  const param = useParams();
  const [conversation, setConversation] = useState<any>(null);
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
    if (scrollMessage) {
      scrollMessage.scrollTo(0, scrollMessage.scrollHeight + 20);
    }
  }, [isLoading]);
  return (
    <>
      {!isLoading ? (
        <div className="flex-grow flex flex-col overflow-y-hidden h-full">
          <HeaderConversation conversation={conversation} />
          <div className="scroll__messages relative w-full flex-grow overflow-y-scroll">
            <Messages
              conversation={conversation}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
          <MessageInput messages={messages} setMessages={setMessages} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

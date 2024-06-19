import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { getConversation } from "../../api";
import HeaderConversation from "./HeaderConversation";
import Messages from "./Messages";

export default function Conversation({ conversationId }) {
  const [conversation, setConversation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getConversation(conversationId);
      if (data.status === 200) {
        setConversation(data.metadata.conversation);
        setIsLoading(false);
      }
    })();
  }, [conversationId]);
  return (
    <>
      {!isLoading ? (
        <div className="flex-grow flex flex-col">
          <HeaderConversation conversation={conversation} />
          <Messages conversation={conversation} />
          <MessageInput />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

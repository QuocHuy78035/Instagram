import Sidebar from "../components/message/Sidebar";
import Conversations from "../components/message/Conversations";
import NoConversation from "../components/message/NoConversation";
import { useState } from "react";
import Conversation from "../components/message/Conversation";

export default function PageMessage() {
  const [conversationId, setConversationId] = useState(null);

  return (
    <>
      <div className="bg-gray-50 flex h-screen">
        <Sidebar />
        {/* <!-- Main Content --> */}
        <div className="flex-grow flex flex-col">
          {/* <!-- Messages Container --> */}
          <div className="flex flex-1">
            <Conversations setConversationId={setConversationId} />
            {conversationId ? (
              <Conversation conversationId={conversationId} />
            ) : (
              <NoConversation />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

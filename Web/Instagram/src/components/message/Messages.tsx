import { useState } from "react";
import HeaderMessages from "./HeaderMessages";

export default function Messages({ conversation }) {
  const [messages, setMessages] = useState(conversation.messages);
  return (
    <div className="flex-grow overflow-y-scroll">
      <HeaderMessages conversation={conversation} />
      <div>
        {messages.map((message) => {
          return (
            <div>
              {message.senderId.username}: {message.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}

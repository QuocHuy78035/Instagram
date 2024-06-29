import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GrImage, GrMicrophone } from "react-icons/gr";
import { createMessage } from "../../api";
import { useParams } from "react-router-dom";
import { changeMessageToMessageWithDay } from "../../utils";

export default function MessageInput({ messages, setMessages }) {
  const param = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!param.id) return;
    if (message === "") return;
    setIsLoading(true);
    const data = await createMessage({
      conversation: param.id,
      message,
    });
    if (data.status === 201) {
      const message = data.metadata.message;
      setMessages(changeMessageToMessageWithDay(message, messages));
      setMessage("");
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* <!-- Message Input --> */}
      {/* border-t border-gray-200 */}
      <div
        className="fixed bottom-0 h-[70px] border-t border-gray-200 bg-white px-4 py-3 flex"
        style={{
          width: "70%",
        }}
      >
        <button className="mr-4 w-8 h-8 my-auto">
          <BsEmojiSmile className="w-6 h-6 mx-auto" />
        </button>
        <form className="grow relative my-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message..."
            className="border rounded-full px-4 py-[6px] text-[15px] w-full my-auto"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className={`absolute right-3 ${
              !isLoading ? "top-[2px]" : "top-[4px]"
            } text-[15px] font-semibold text-blue-600 py-1 px-3`}
          >
            {isLoading ? <div className="loader"></div> : "Send"}
          </button>
        </form>
        <button className="ml-4 w-8 h-8 my-auto">
          <GrMicrophone className="w-6 h-6 mx-auto" />
        </button>
        <button className="ml-4 w-8 h-8 my-auto">
          <GrImage className="w-6 h-6 mx-auto" />
        </button>
        <button className="ml-4 w-8 h-8 my-auto">
          <FiHeart className="w-6 h-6 mx-auto" />
        </button>
      </div>
    </>
  );
}

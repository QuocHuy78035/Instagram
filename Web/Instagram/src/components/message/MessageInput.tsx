import { useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GrImage, GrMicrophone } from "react-icons/gr";
import { createMessage } from "../../api";
import { useParams } from "react-router-dom";
import { changeMessageToMessageWithDay } from "../../utils";
import useOpenConversationInformation from "../../zustand/useOpenConversationInformation";
import { FaRegCircleXmark } from "react-icons/fa6";

export default function MessageInput({
  messages,
  setMessages,
  conversationRef,
  dimensions,
}) {
  const { isOpenConversationInformation } = useOpenConversationInformation();
  const param = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [images, setImages] = useState<Array<string | ArrayBuffer | null>>([]);
  async function sendMessage(body: {
    conversation: string;
    message?: string;
    file?: File;
  }) {
    const data = await createMessage({
      conversation: body.conversation,
      message: body.message,
      file: body.file,
    });
    if (data.status === 201) {
      const message = data.metadata.message;
      return message;
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!param.id) return;
    setIsLoading(true);
    if (message !== "") {
      const newMessage = await sendMessage({ conversation: param.id, message });
      setMessages(changeMessageToMessageWithDay(newMessage, messages));
      setMessage("");
    }
    if (files.length !== 0) {
      const newMessages = await Promise.all(
        files.map(async (file) => {
          if (!param.id) return;
          const message = await sendMessage({ conversation: param.id, file });
          return message;
        })
      );
      let messagesClone = messages;
      for (let i = 0; i < newMessages.length; i++) {
        messagesClone = changeMessageToMessageWithDay(
          newMessages[i],
          messagesClone
        );
      }
      console.log(messagesClone);
      setMessages([...messagesClone]);
      setFiles([]);
      setImages([]);
    }
    setIsLoading(false);
  };

  async function createHeartMessage() {
    if (!param.id) return;
    await sendMessage({ conversation: param.id, message: "❤️" });
  }
  useEffect(() => {
    const messageInput = document.getElementById("message__input");
    if (messageInput && conversationRef.current)
      messageInput.style.width = `${dimensions.width}px`;
  }, [isOpenConversationInformation, dimensions.width]);

  return (
    <>
      {/* <!-- Message Input --> */}
      {/* border-t border-gray-200 */}

      <div
        id="message__input"
        className="fixed bottom-0 border-t border-gray-200 bg-white px-4 py-3 "
        // style={{
        //   width: "70%",
        // }}
      >
        {images.length !== 0 ? (
          <div className="flex">
            {images.map((image, i) => {
              return (
                <div className="relative me-3">
                  <img
                    src={`${image}`}
                    alt="Image"
                    className="w-[60px] h-[60px] rounded-md"
                  />
                  <FaRegCircleXmark
                    className="absolute -top-[10px] right-[-9px] text-[20px]"
                    onClick={function () {
                      setImages([
                        ...images.slice(0, i),
                        ...images.slice(i + 1),
                      ]);
                      setFiles([...files.slice(0, i), ...files.slice(i + 1)]);
                    }}
                  />
                </div>
              );
            })}
            <input
              type="file"
              id="file2"
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
              onChange={function (e) {
                if (e.target.files) {
                  const filesArr = Array.from(e.target.files);
                  setFiles([...files, ...filesArr]);
                  for (let i = 0; i < filesArr.length; i++) {
                    const reader = new FileReader();
                    let image: string | ArrayBuffer | null = "";
                    reader.onload = function (e) {
                      if (!e.target) return;
                      image = reader.result;
                      console.log(image);
                      setImages([...images, image]);
                    };
                    reader.readAsDataURL(filesArr[i]);
                  }
                }
              }}
            />
            <label
              htmlFor="file2"
              className="flex flex-col justify-center w-[60px] h-[60px] bg-[#e1e3e5] z-10 rounded-md  me-3"
            >
              <GrImage className="w-6 h-6 mx-auto" />
            </label>
          </div>
        ) : (
          ""
        )}
        <div className="flex">
          <button className="mr-4 w-8 h-8 my-auto">
            <BsEmojiSmile className="w-6 h-6 mx-auto" />
          </button>
          <form className="grow my-auto me-1" onSubmit={handleSubmit}>
            <div className="relative">
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
            </div>
          </form>
          <button className="w-12 h-12 my-auto px-2 py-2">
            <GrMicrophone className="w-6 h-6 mx-auto" />
          </button>
          <button className="w-12 h-12 my-auto px-2 py-2">
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
              onChange={function (e) {
                if (e.target.files) {
                  const filesArr = Array.from(e.target.files);
                  setFiles([...files, ...filesArr]);
                  for (let i = 0; i < filesArr.length; i++) {
                    const reader = new FileReader();
                    let image: string | ArrayBuffer | null = "";
                    reader.onload = function (e) {
                      if (!e.target) return;
                      image = reader.result;
                      setImages([...images, image]);
                    };
                    reader.readAsDataURL(filesArr[i]);
                  }
                }
              }}
            />
            <label htmlFor="file">
              <GrImage className="w-6 h-6 mx-auto" />
            </label>
          </button>
          <button
            className="w-12 h-12 my-auto px-2 py-2"
            onClick={createHeartMessage}
          >
            <FiHeart className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </>
  );
}

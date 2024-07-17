import { useEffect, useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { GoReply } from "react-icons/go";
import { AiOutlineMore } from "react-icons/ai";
import useOpenNavigateMoreMessage from "../../zustand/useOpenNavigateMoreMessage";
import useReplyMessage from "../../zustand/useReplyMessage";

export default function Message({ message, userId, participants }) {
  const [rightUser, setRightUser] = useState(true);
  const [sender, setSender] = useState<any>({});
  const [isOpenBar, setIsOpenBar] = useState<boolean>(false);
  const {
    setIsOpenNavigateMoreMessage,
    setTop,
    setLeft,
    setRight,
    setSelectedMessage,
    selectedMessage,
    setIsRight,
  } = useOpenNavigateMoreMessage();
  const isOpenNavigateMoreMessage = useOpenNavigateMoreMessage(
    (state) => state.isOpenNavigateMoreMessage
  );
  const { setReplyMessage, setSenderReplyMessage } = useReplyMessage();
  const [replyMessageUser, setReplyMessageUser] = useState<any>();
  useEffect(() => {
    setRightUser(userId === message.senderId ? true : false);
  }, [userId, message]);
  useEffect(() => {
    setSender(participants.find((participant) => participant._id === userId));
    if (message.replyMessage)
      setReplyMessageUser(
        participants.find(
          (participant) => participant._id === message.replyMessage.senderId
        )
      );
  }, []);
  function reply() {
    setReplyMessage(message);
    setSenderReplyMessage(sender);
  }
  return (
    <div>
      <div
        className="text-[13px] flex mb-1"
        style={{
          flexDirection: `${rightUser ? "row-reverse" : "row"}`,
          marginRight: `${rightUser ? "12px" : "0px"}`,
          marginLeft: `${rightUser ? "0px" : "12px"}`,
        }}
      >
        {message.replyMessage && replyMessageUser
          ? `You replied to ${replyMessageUser?.name}`
          : ""}
      </div>
      {message.replyMessage ? (
        <div
          className="flex"
          style={{
            flexDirection: `${rightUser ? "row-reverse" : "row"}`,
            marginRight: `${rightUser ? "12px" : "0px"}`,
            marginLeft: `${rightUser ? "0px" : "12px"}`,
            borderRight: `${rightUser ? "4px" : "0px"} solid #6b7280`,
            borderLeft: `${rightUser ? "0px" : "4px"} solid #6b7280`,
          }}
        >
          <div
            className={`mx-3 text-[15px] py-2 px-[12px] my-auto bg-[rgb(239,239,239)] text-black rounded-lg max-w-[400px]`}
          >
            {message.replyMessage.message}
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        id={`message__${message._id}`}
        className={`flex relative w-full my-[5px]`}
        style={{
          flexDirection: `${rightUser ? "row-reverse" : "row"}`,
        }}
        onMouseOver={function () {
          setIsOpenBar(true);
        }}
        onMouseOut={function () {
          setIsOpenBar(false);
        }}
      >
        {!rightUser ? (
          <img
            src={sender.avatar}
            className="w-7 h-7 m-3 rounded-full my-auto"
          />
        ) : (
          ""
        )}
        {message.image ? (
          <img
            src={message.image}
            alt="Message Image"
            className="rounded-lg"
            style={{
              marginRight: rightUser ? "12px" : "0px",
            }}
          />
        ) : message.message === "❤️" ? (
          <div
            className="text-[60px]"
            style={{
              marginRight: rightUser ? "12px" : "0px",
            }}
          >
            ❤️
          </div>
        ) : (
          <div
            className={`text-[15px] py-2 px-[12px] my-auto ${
              rightUser
                ? "bg-blue-600 text-white"
                : "bg-[rgb(239,239,239)] text-black"
            } rounded-lg max-w-[400px]`}
            style={{
              marginRight: rightUser ? "12px" : "0px",
            }}
          >
            {message.message}
          </div>
        )}
        <div
          className={`flex ${rightUser ? "flex-row-reverse me-2" : "ms-2"} ${
            !isOpenBar ? "hidden" : ""
          } my-auto py-auto`}
        >
          <button className="flex flex-col justify-center w-[32px] h-[32px] hover:bg-[rgb(239,239,239)] rounded-full outline-none">
            <CiFaceSmile className="mx-auto text-[18px]" />
          </button>
          <button
            className="flex flex-col justify-center w-[32px] h-[32px] hover:bg-[rgb(239,239,239)] rounded-full outline-none"
            onClick={reply}
          >
            <GoReply className="mx-auto text-[18px]" />
          </button>
          <button
            id={`messageMore_${message._id}`}
            className={
              "flex flex-col justify-center w-[32px] h-[32px] hover:bg-[rgb(239,239,239)] rounded-full outline-none"
            }
            onClick={function (e) {
              if (selectedMessage?._id === message._id) {
                setIsOpenNavigateMoreMessage(!isOpenNavigateMoreMessage);
              } else {
                setTop(e.currentTarget.getBoundingClientRect().top);
                setLeft(e.currentTarget.getBoundingClientRect().left);
                setRight(e.currentTarget.getBoundingClientRect().right);
                setSelectedMessage(message);
                setIsOpenNavigateMoreMessage(true);
                setIsRight(rightUser);
              }
            }}
          >
            <AiOutlineMore className="mx-auto text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

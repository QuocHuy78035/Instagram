import { useEffect, useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { GoReply } from "react-icons/go";
import { AiOutlineMore } from "react-icons/ai";
import useOpenNavigateMoreMessage from "../../zustand/useOpenNavigateMoreMessage";
import useReplyMessage from "../../zustand/useReplyMessage";
import { IconType } from "react-icons";
function Button(body: { id?: string; onClick: (e) => void; Icon: IconType }) {
  return (
    <button
      className="flex flex-col justify-center w-[32px] h-[32px] hover:bg-[rgb(239,239,239)] rounded-full outline-none"
      onClick={body.onClick}
      id={body.id}
    >
      <body.Icon className="mx-auto text-[18px]" />
    </button>
  );
}
export default function Message(body:{ message: any, userId: string, participants: Array<any>}) {
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
    setRightUser(body.userId === body.message.senderId ? true : false);
  }, [body.userId, body.message]);
  useEffect(() => {
    setSender(
      body.participants.find((participant) => participant._id === body.userId)
    );
    if (body.message.replyMessage)
      setReplyMessageUser(
        body.participants.find(
          (participant) =>
            participant._id === body.message.replyMessage.senderId
        )
      );
  }, []);
  function reply() {
    setReplyMessage(body.message);
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
        {body.message.replyMessage && replyMessageUser
          ? `You replied to ${replyMessageUser?.name}`
          : ""}
      </div>
      {body.message.replyMessage ? (
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
            {body.message.replyMessage.message}
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        id={`message__${body.message._id}`}
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
        {body.message.image ? (
          <img
            src={body.message.image}
            alt="Message Image"
            className="rounded-lg"
            style={{
              marginRight: rightUser ? "12px" : "0px",
            }}
          />
        ) : body.message.message === "❤️" ? (
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
            {body.message.message}
          </div>
        )}
        <div
          className={`flex ${rightUser ? "flex-row-reverse me-2" : "ms-2"} ${
            !isOpenBar ? "hidden" : ""
          } my-auto py-auto`}
        >
          <Button onClick={function () {}} Icon={CiFaceSmile} />
          <Button onClick={reply} Icon={GoReply} />
          <Button
            id={`messageMore_${body.message._id}`}
            onClick={function (e) {
              if (selectedMessage?._id === body.message._id) {
                setIsOpenNavigateMoreMessage(!isOpenNavigateMoreMessage);
              } else {
                setTop(e.currentTarget.getBoundingClientRect().top);
                setLeft(e.currentTarget.getBoundingClientRect().left);
                setRight(e.currentTarget.getBoundingClientRect().right);
                setSelectedMessage(body.message);
                setIsOpenNavigateMoreMessage(true);
                setIsRight(rightUser);
              }
            }}
            Icon={AiOutlineMore}
          />
        </div>
      </div>
    </div>
  );
}

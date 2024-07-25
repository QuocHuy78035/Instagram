import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowForwardOutline } from "react-icons/ti";
import { changeDateToString, concatTwoMessagesWithDay } from "../../utils";
import { deleteMessage, findByConversation } from "../../api";
import usePage from "../../zustand/usePage";
import { useParams } from "react-router-dom";
import useMessages from "../../zustand/useMessages";
import useOpenNavigateMoreMessage from "../../zustand/useOpenNavigateMoreMessage";
import { GoReport } from "react-icons/go";
import { IconType } from "react-icons";

function Tab(body: {
  name: string;
  className?: string;
  onClick: (e) => void;
  Icon: IconType;
}) {
  return (
    <div
      className={`px-2 py-2 flex justify-between hover:bg-[rgb(239,239,239)] rounded-md ${body.className}`}
      onClick={body.onClick}
    >
      <div>{body.name}</div>
      <body.Icon className="my-auto text-[15px]" />
    </div>
  );
}

export default function NavigateMoreMessage({ className, style, message }) {
  const { setIsOpenNavigateMoreMessage, isRight } =
    useOpenNavigateMoreMessage();
  const { page } = usePage();
  const { setMessages } = useMessages();
  const param = useParams();
  async function unsend() {
    const data = await deleteMessage(message._id);
    if (data.status === 200) {
      (async () => {
        if (!param.id) return;
        let messagesClone: Array<any> = [];
        for (let i = 1; i <= page; i++) {
          const dataMessages = await findByConversation(param.id, i);
          if (dataMessages.status === 200) {
            if (dataMessages.metadata.messages.length) {
              messagesClone = concatTwoMessagesWithDay(
                messagesClone,
                dataMessages.metadata.messages
              );
            }
          }
        }
        setMessages(messagesClone);
        setIsOpenNavigateMoreMessage(false);
      })();
    }
  }
  if (!message) return;
  return (
    <div
      id="navigate__more__message"
      className={"px-2 py-1 text-[14px] " + className}
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", ...style }}
    >
      <div className="px-2 py-2">
        {changeDateToString(new Date(message.createdAt))}
      </div>
      <div className="py-2 border-t-[1px] border-b-[1px] border-gray-200">
        <Tab
          name="Forward"
          Icon={TiArrowForwardOutline}
          onClick={function () {}}
        />
        <Tab name="Copy" Icon={FaRegCopy} onClick={function () {}} />
      </div>
      {isRight ? (
        <Tab
          className="text-[red]"
          name="Unsend"
          Icon={RiDeleteBinLine}
          onClick={unsend}
        />
      ) : (
        <Tab
          className="text-[red]"
          name="Report"
          Icon={GoReport}
          onClick={function () {}}
        />
      )}
    </div>
  );
}

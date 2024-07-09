import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowForwardOutline } from "react-icons/ti";
import { changeDateToString, concatTwoMessagesWithDay } from "../../utils";
import { deleteMessage, findByConversation } from "../../api";
import usePage from "../../zustand/usePage";
import { useParams } from "react-router-dom";
import useMessages from "../../zustand/useMessages";
import useOpenNavigateMore from "../../zustand/useOpenNavigateMore";
import { GoReport } from "react-icons/go";

export default function NavigateMore({ className, style, message }) {
  const { setIsOpenNavigateMore, isRight } = useOpenNavigateMore();
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
        setIsOpenNavigateMore(false);
      })();
    }
  }
  if (!message) return;
  return (
    <div
      id="navigate__more"
      className={"px-2 py-1 text-[14px] " + className}
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", ...style }}
    >
      <div className="px-2 py-2">
        {changeDateToString(new Date(message.createdAt))}
      </div>
      <div className="py-2 border-t-[1px] border-b-[1px] border-gray-200">
        <div className="px-2 py-2 flex justify-between hover:bg-[rgb(239,239,239)] rounded-md ">
          <div>Forward</div>
          <TiArrowForwardOutline className="my-auto text-[15px]" />
        </div>
        <div className="px-2 py-2 flex justify-between hover:bg-[rgb(239,239,239)] rounded-md">
          <div>Copy</div>
          <FaRegCopy className="my-auto text-[15px]" />
        </div>
      </div>
      {isRight ? (
        <div
          className="my-2 px-2 py-2 flex justify-between text-[red] hover:bg-[rgb(239,239,239)] rounded-md"
          onClick={unsend}
        >
          <div>Unsend</div>
          <RiDeleteBinLine className="my-auto text-[15px]" />
        </div>
      ) : (
        <div
          className="my-2 px-2 py-2 flex justify-between text-[red] hover:bg-[rgb(239,239,239)] rounded-md"
          // onClick={unsend}
        >
          <div>Report</div>
          <GoReport className="my-auto text-[15px]" />
        </div>
      )}
    </div>
  );
}

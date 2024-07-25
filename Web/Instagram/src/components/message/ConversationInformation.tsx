import { PiBellRinging } from "react-icons/pi";
import { deleteConversation, getAllConversations } from "../../api";
import { useNavigate } from "react-router-dom";
import useConversations from "../../zustand/useConversations";
import useOpenConversationInformation from "../../zustand/useOpenConversationInformation";
import CheckBox from "../global/CheckBox";

export default function ConversationInformation(body: { conversation: any }) {
  const navigate = useNavigate();
  const { setConversations } = useConversations();
  const { setIsOpenConversationInformation } = useOpenConversationInformation();
  const deleteConversationClick = async () => {
    const data = await deleteConversation(body.conversation._id);
    if (data.status === 200) {
      (async () => {
        const data = await getAllConversations();
        if (data.status === 200) {
          setConversations(data.metadata.conversations);
        }
      })();
      setIsOpenConversationInformation(false);
      navigate("/direct/inbox");
    }
  };
  return (
    <div className="w-[380px] flex flex-col">
      <div
        className={`px-6 flex justify-between border-b border-l border-gray-200 h-[81px] ${
          body.conversation.participants.length >= 3 ? "py-2" : "py-4"
        }`}
      >
        <div className="my-auto text-[20px] font-semibold ">Details</div>
      </div>
      <div className="px-6 flex justify-between h-[70px] border-b border-gray-200">
        <div className="flex my-auto">
          <PiBellRinging className="text-[30px] my-auto" />
          <div className="mx-3 text-[16px] my-auto">Mute Messages</div>
        </div>
        <CheckBox onClick={function () {}} checked={false} />
      </div>
      <div className="py-6 h-[450px] overflow-y-scroll border-b border-gray-200">
        <div className="px-6 text-[16px] font-semibold">Members</div>
        <div className="mt-4 ">
          {body.conversation.participants.map((participant) => {
            return (
              <div className="flex items-center space-x-4 px-6 py-[6px] hover:bg-[rgb(239,239,239)]">
                <img
                  src={participant.avatar}
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-[14px]">
                    {participant.username}
                  </h4>
                  <p className="mt-[3px] text-gray-500 text-[13px]">
                    {participant.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-grow h-[160px] flex flex-col justify-between px-6 py-6 text-[red] text-[16px]">
        <div className="cursor-pointer">Report</div>
        <div className="cursor-pointer">Block</div>
        <div className="cursor-pointer" onClick={deleteConversationClick}>
          Delete Chat
        </div>
      </div>
    </div>
  );
}

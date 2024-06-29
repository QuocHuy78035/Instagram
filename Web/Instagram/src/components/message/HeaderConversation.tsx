import { ImInfo } from "react-icons/im";
import { RiVideoOnLine } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
import useHeaderConversation from "../../hooks/useHeaderConversation";

export default function HeaderConversation({ conversation }) {
  const { state, name, avatar1, avatar2 } = useHeaderConversation(conversation);

  return (
    <div className="top-0 px-4">
      <div
        className={`flex justify-between border-b border-gray-200 ${
          conversation.participants.length >= 3 ? "py-2" : "py-4"
        }`}
      >
        <div className="relative flex">
          {avatar1 ? (
            <img
              src={avatar1}
              alt="Profile Picture"
              className={`w-12 h-12 rounded-full z-10 ${
                conversation.participants.length >= 3 ? "mt-3 ml-3" : ""
              }`}
            />
          ) : (
            ""
          )}
          {avatar2 ? (
            <img
              src={avatar2}
              alt="Profile Picture"
              className={`absolute -left-1 w-12 h-12 rounded-full z-2`}
            />
          ) : (
            ""
          )}
          <div className="ms-[15px] my-auto">
            <div className="text-[16px] font-bold">{name}</div>
            <p className="text-[13px] text-gray-500">{state}</p>
          </div>
        </div>

        <div className="flex">
          <button className="mr-4 w-8 h-8 my-auto">
            <TbPhoneCall className="w-6 h-6 mx-auto" />
          </button>
          <button className="mr-4 w-8 h-8 my-auto">
            <RiVideoOnLine className="w-6 h-6 mx-auto font-bold" />
          </button>
          <button className="mr-4 w-8 h-8 my-auto">
            <ImInfo className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

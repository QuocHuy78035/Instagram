import { ImInfo } from "react-icons/im";
import { RiVideoOnLine } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";

export default function HeaderConversation({ conversation }) {
  return (
    <div className="px-4 overflow-y-auto ">
      <div className="flex justify-between border-b border-gray-200 py-4">
        <div className="flex">
          <img
            src={conversation ? conversation.participants[0].avatar : ""}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full"
          />
          <div className="ms-[10px] my-auto">
            <div className="text-[16px] font-bold">
              {conversation ? conversation.participants[0].name : ""}
            </div>
            <p className="text-[13px] text-gray-500">Active 4 hours ago</p>
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
        {/* <p className="mt-4 text-gray-500">Sat 12:15</p>
            <img
              src="https://images.unsplash.com/photo-1592189305845-42c5f8cd4f01"
              alt="Message Image"
              className="w-32 h-32 mt-4"
            /> */}
      </div>
    </div>
  );
}

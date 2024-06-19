import { BsEmojiSmile } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GrImage, GrMicrophone } from "react-icons/gr";

export default function MessageInput() {
  return (
    <>
      {/* <!-- Message Input --> */}
      <div className="h-[70px] border-t border-gray-200 px-4 py-3 flex">
        <button className="mr-4 w-8 h-8 my-auto">
          <BsEmojiSmile className="w-6 h-6 mx-auto" />
        </button>
        <input
          type="text"
          placeholder="Message..."
          className="grow border rounded-full px-4 py-[6px] text-sm"
        />
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

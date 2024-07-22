import { FaUserAltSlash } from "react-icons/fa";
import { FaRegCircleUser, FaRegComment } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdBlockFlipped } from "react-icons/md";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

export default function SidebarSetting() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 flex h-screen relative">
      <div className="flex flex-col w-[320px] h-full bg-white border-r border-gray-200 pt-7 px-8">
        <div className="flex justify-between ps-6 mb-3">
          <div className="flex py-2">
            <h2 className="font-bold text-[20px]">Settings</h2>
          </div>
        </div>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "edit" ? "rgb(239,239,239)" : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/edit");
          }}
        >
          <FaRegCircleUser className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Edit Profiles</div>
        </button>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "notifications" ? "rgb(239,239,239)" : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/notifications");
          }}
        >
          <IoMdNotificationsOutline className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Notifications</div>
        </button>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "privacy_setting" ? "rgb(239,239,239)" : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/privacy_setting");
          }}
        >
          <FiLock className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Account Privacy</div>
        </button>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "blocked_accounts" ? "rgb(239,239,239)" : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/blocked_accounts");
          }}
        >
          <MdBlockFlipped className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Blocked</div>
        </button>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "messages_and_story_replies"
                ? "rgb(239,239,239)"
                : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/messages_and_story_replies");
          }}
        >
          <TbMessageCircle2Filled className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Messages and story replies</div>
        </button>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "comments" ? "rgb(239,239,239)" : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/comments");
          }}
        >
          <FaRegComment className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Comments</div>
        </button>
        <button
          className="flex w-full h-[52px] hover:bg-[rgb(239,239,239)] rounded-lg outline-none px-3 text-[15px]"
          style={{
            backgroundColor: `${
              params.mode === "restricted_accounts"
                ? "rgb(239,239,239)"
                : "white"
            }`,
          }}
          onClick={function () {
            navigate("/accounts/restricted_accounts");
          }}
        >
          <FaUserAltSlash className="w-[26px] h-[26px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Restricted accounts</div>
        </button>
      </div>
    </div>
  );
}

import { CiLight } from "react-icons/ci";
import { FiBookmark } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { LuActivitySquare } from "react-icons/lu";
import { RiErrorWarningLine } from "react-icons/ri";
import { LogoutAPI } from "../api";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext";
import useOpenNavigateMore from "../zustand/useOpenNavigateMore";
import { useNavigate } from "react-router-dom";

export default function NavigateMore() {
  const navigate = useNavigate();
  const [__, setCookies] = useCookies(["jwt", "user"]);
  const { setIsOpenNavigateMore } = useOpenNavigateMore();
  const { setUser } = useAuthContext();
  async function logOutClick() {
    const data = await LogoutAPI();
    if (data.status === 200) {
      setCookies("jwt", "", { path: "/" });
      setCookies("user", "", { path: "/" });
      setIsOpenNavigateMore(false);
      setUser(null);
    }
  }
  return (
    <div
      id="navigate__more"
      className="absolute
        bottom-[79px] left-[16px] w-[240px] shadow rounded-[20px] bg-gray-100 space-y-2 font-normal overflow-hidden z-[999999]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <div className="px-2 py-2 bg-white">
        <button
          className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
          onClick={function () {
            navigate("/accounts/edit");
          }}
        >
          <IoSettingsSharp className="w-[24px] h-[24px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Settings</div>
        </button>
        <button className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none">
          <LuActivitySquare className="w-[24px] h-[24px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Your activity</div>
        </button>
        <button className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none">
          <FiBookmark className="w-[24px] h-[24px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Saved</div>
        </button>
        <button className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none">
          <CiLight className="w-[24px] h-[24px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Switch appearance</div>
        </button>
        <button className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none">
          <RiErrorWarningLine className="w-[24px] h-[24px] ms-[10px] my-auto" />
          <div className="ms-[10px] my-auto">Report a problem</div>
        </button>
      </div>
      <div className="px-2 py-2 bg-white">
        <button className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-t-md outline-none border-b-[1px] border-gray-200">
          <div className="ms-[10px] my-auto">Switch accounts</div>
        </button>
        <button
          className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-b-md outline-none border-t-[1px] border-gray-200"
          onClick={logOutClick}
        >
          <div className="ms-[10px] my-auto">Log out</div>
        </button>
      </div>
    </div>
  );
}

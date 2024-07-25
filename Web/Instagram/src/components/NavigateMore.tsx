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
import TabWithText from "./sidebar/TabWithText";

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
        <TabWithText
          onClick={function () {
            navigate("/accounts/edit");
          }}
          Icon={IoSettingsSharp}
          name="Settings"
        />
        <TabWithText
          onClick={function () {}}
          Icon={LuActivitySquare}
          name="Your activity"
        />
        <TabWithText onClick={function () {}} Icon={FiBookmark} name="Saved" />
        <TabWithText
          onClick={function () {}}
          Icon={CiLight}
          name="Switch appearance"
        />
        <TabWithText
          onClick={function () {}}
          Icon={RiErrorWarningLine}
          name="Report a problem"
        />
      </div>
      <div className="px-2 py-2 bg-white">
        <TabWithText
          onClick={function () {}}
          className="rounded-none rounded-t-md border-b-[1px] border-gray-200"
          name="Switch accounts"
        />
        <TabWithText
          onClick={logOutClick}
          className="rounded-none rounded-b-md border-t-[1px] border-gray-200"
          name="Log out"
        />
      </div>
    </div>
  );
}

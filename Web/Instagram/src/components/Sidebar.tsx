import { BiSolidMessageRounded } from "react-icons/bi";
import { FaInstagram, FaRegHeart } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { LuPlusSquare } from "react-icons/lu";
import { MdOutlineExplore, MdOutlineOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tooltip from "./sidebar/Tooltip";
import { useAuthContext } from "../context/AuthContext";
import useOpenSearch from "../zustand/useOpenSearch";
import useOpenNavigateMore from "../zustand/useOpenNavigateMore";
import NavigateMore from "./NavigateMore";
import Tab from "./sidebar/Tab";
import TabWithText from "./sidebar/TabWithText";
import ButtonMore from "./sidebar/ButtonMore";
import Avatar from "./sidebar/Avatar";

export default function Sidebar({ isFullContent }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { isOpenSearch, setIsOpenSearch } = useOpenSearch();
  const { isOpenNavigateMore } = useOpenNavigateMore();
  function direct(to: string) {
    return function goTo() {
      navigate(to);
      setIsOpenSearch(false);
    };
  }
  function goToSearch() {
    setIsOpenSearch(!isOpenSearch);
  }
  return (
    <>
      <div
        className={`relative bg-white border-r border-gray-200 flex flex-col justify-between items-center p-4`}
        style={{
          width: `${!isFullContent ? "80" : "240"}px`,
          minWidth: `${!isFullContent ? "80" : "240"}px`,
        }}
      >
        {!isFullContent ? (
          <Tab onClick={direct("/")} Icon={FaInstagram} />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            className="my-[13px] w-[70%] h-[48px] cursor-pointer"
            onClick={direct("/")}
          />
        )}

        <div className="w-full">
          {!isFullContent ? (
            <>
              <Tab message={"Home"} onClick={direct("/")} Icon={GoHome} />
              <Tab
                message={"Search"}
                style={{
                  border: `${
                    isOpenSearch ? "1px solid rgb(229,231,235)" : "0px"
                  }`,
                }}
                onClick={goToSearch}
                Icon={IoSearchOutline}
              />
              <Tab
                message="Explore"
                onClick={direct("/explore")}
                Icon={MdOutlineExplore}
              />
              <Tab
                message="Reels"
                onClick={direct("/reels")}
                Icon={MdOutlineOndemandVideo}
              />
              <Tab
                message="Messages"
                style={{
                  border: `${
                    window.location.href.split("/")[3] === "direct"
                      ? "1px solid rgb(229,231,235)"
                      : "0px"
                  }`,
                }}
                onClick={direct("/direct/inbox")}
                Icon={BiSolidMessageRounded}
              />
              <Tab
                message="Notifications"
                onClick={direct("/notifications")}
                Icon={FaRegHeart}
              />
              <Tab
                message="Create"
                onClick={direct("/create")}
                Icon={LuPlusSquare}
              />
              <Tab
                message="Profile"
                onClick={direct(
                  `/profile/${typeof user !== "string" ? user?.username : ""}`
                )}
                avatar={<Avatar hasText={false} />}
              />
            </>
          ) : (
            <div className="text-[16px] font-normal">
              <TabWithText
                name="Home"
                onClick={direct("/")}
                Icon={GoHome}
                to="home"
              />
              <TabWithText
                name="Search"
                style={{
                  fontWeight: `${isOpenSearch ? "700" : "400"}`,
                }}
                onClick={goToSearch}
                Icon={IoSearchOutline}
                to="search"
              />
              <TabWithText
                name="Explore"
                onClick={direct("/explore")}
                Icon={MdOutlineExplore}
                to="explore"
              />
              <TabWithText
                name="Reels"
                onClick={direct("/reels")}
                Icon={MdOutlineOndemandVideo}
                to="reels"
              />
              <TabWithText
                name={"Messages"}
                onClick={direct("/direct/inbox")}
                Icon={BiSolidMessageRounded}
                to="direct"
              />
              <TabWithText
                name="Notifications"
                onClick={direct("/notifications")}
                Icon={FaRegHeart}
                to="notifications"
              />
              <TabWithText
                name="Create"
                onClick={direct("/create")}
                Icon={LuPlusSquare}
                to="create"
              />
              <TabWithText
                name="Profile"
                onClick={direct(
                  `/profile/${typeof user !== "string" ? user?.username : ""}`
                )}
                avatar={<Avatar hasText={true} />}
                to="profile"
              />
            </div>
          )}
        </div>
        {!isFullContent ? (
          <Tooltip message="More">
            <ButtonMore hasText={false} />
          </Tooltip>
        ) : (
          <ButtonMore hasText={true} />
        )}
        {isOpenNavigateMore ? <NavigateMore /> : ""}
      </div>
    </>
  );
}

import { BiSolidMessageRounded } from "react-icons/bi";
import { FaInstagram, FaRegHeart } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { HiBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { LuPlusSquare } from "react-icons/lu";
import { MdOutlineExplore, MdOutlineOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { useAuthContext } from "../context/AuthContext";
import useOpenSearch from "../zustand/useOpenSearch";
import useOpenNavigateMore from "../zustand/useOpenNavigateMore";
import NavigateMore from "./NavigateMore";

export default function Sidebar({ isFullContent }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { isOpenSearch, setIsOpenSearch } = useOpenSearch();
  const { isOpenNavigateMore, setIsOpenNavigateMore } = useOpenNavigateMore();
  function goToHome() {
    navigate("/");
    setIsOpenSearch(false);
  }
  function goToSearch() {
    setIsOpenSearch(!isOpenSearch);
  }
  function goToExplore() {
    navigate("/explore");
    setIsOpenSearch(false);
  }
  function goToReels() {
    navigate("/reels");
    setIsOpenSearch(false);
  }
  function goToNotifications() {
    navigate("/notifications");
    setIsOpenSearch(false);
  }
  function goToMessage() {
    navigate("/direct/inbox");
    setIsOpenSearch(false);
  }
  function goToCreate() {
    navigate("/create");
    setIsOpenSearch(false);
  }

  return (
    <>
      <div
        className={`relative bg-white border-r border-gray-200 flex flex-col justify-between items-center p-4`}
        style={{
          width: `${!isFullContent ? "80" : "240"}px`,
        }}
      >
        {!isFullContent ? (
          <button
            className="my-[13px] w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
            onClick={goToHome}
          >
            <FaInstagram className="w-[24px] h-[24px] mx-auto" />
          </button>
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            className="my-[13px] w-[70%] h-[48px] cursor-pointer"
            onClick={goToHome}
          />
        )}

        <div className="w-full">
          {!isFullContent ? (
            <>
              <Tooltip message="Home">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToHome}
                >
                  <GoHome className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Search">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToSearch}
                >
                  <IoSearchOutline className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Explore">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToExplore}
                >
                  <MdOutlineExplore className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Reels">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToReels}
                >
                  <MdOutlineOndemandVideo className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Messages">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToMessage}
                >
                  <BiSolidMessageRounded className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Notifications">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToNotifications}
                >
                  <FaRegHeart className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Create">
                <button
                  className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                  onClick={goToCreate}
                >
                  <LuPlusSquare className="w-[24px] h-[24px] mx-auto" />
                </button>
              </Tooltip>
              <Tooltip message="Profile">
                <button className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none">
                  <img
                    src={user?.avatar}
                    className="w-[24px] h-[24px] mx-auto rounded-full"
                  />
                </button>
              </Tooltip>
            </>
          ) : (
            <div className="text-[16px] font-normal">
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToHome}
              >
                <GoHome className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Home</div>
              </button>
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToSearch}
              >
                <IoSearchOutline className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Search</div>
              </button>
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToExplore}
              >
                <MdOutlineExplore className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Explore</div>
              </button>
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToReels}
              >
                <MdOutlineOndemandVideo className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Reels</div>
              </button>
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToMessage}
              >
                <BiSolidMessageRounded className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Messages</div>
              </button>
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToNotifications}
              >
                <FaRegHeart className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Notifications</div>
              </button>
              <button
                className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
                onClick={goToCreate}
              >
                <LuPlusSquare className="w-[24px] h-[24px] ms-[10px] my-auto" />
                <div className="ms-[10px] my-auto">Create</div>
              </button>
              <button className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none">
                <img
                  src={user?.avatar}
                  className="w-[24px] h-[24px] ms-[10px] my-auto rounded-full"
                />
                <div className="ms-[10px] my-auto">Profile</div>
              </button>
            </div>
          )}
        </div>
        {!isFullContent ? (
          <Tooltip message="More">
            <button
              className="btn__more my-[13px] w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
              onClick={function () {
                setIsOpenNavigateMore(!isOpenNavigateMore);
              }}
              style={{
                fontWeight: `${isOpenNavigateMore ? "bold" : "normal"}`,
              }}
            >
              <HiBars3 className="w-[24px] h-[24px] mx-auto" />
            </button>
          </Tooltip>
        ) : (
          <button
            className="btn__more my-[13px] flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
            onClick={function () {
              setIsOpenNavigateMore(!isOpenNavigateMore);
            }}
            style={{
              fontWeight: `${isOpenNavigateMore ? "bold" : "normal"}`,
            }}
          >
            <HiBars3 className="w-[24px] h-[24px] ms-[10px] my-auto" />
            <div className="ms-[10px] my-auto">More</div>
          </button>
        )}
        {isOpenNavigateMore ? <NavigateMore /> : ""}
      </div>
    </>
  );
}

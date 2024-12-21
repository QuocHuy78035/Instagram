import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Search from "../components/search/Search";
import useOpenSearch from "../zustand/useOpenSearch";
import { useNavigate } from "react-router-dom";
import { followingUser, getSuggestedUsers, unfollowingUser } from "../api";
import Button from "../components/global/Button";

function User(body: { user: any }) {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  async function followingUserClick() {
    const data = await followingUser(body.user._id);
    if (data.status === 200) {
      setIsFollow(true);
    }
  }
  async function unfollowingUserClick() {
    const data = await unfollowingUser(body.user._id);
    if (data.status === 200) {
      setIsFollow(false);
    }
  }
  return (
    <div className="flex items-center justify-between ps-2 py-[7px]">
      <div className="flex items-center space-x-3">
        <img
          src={body.user.avatar}
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4
            className="font-medium text-[14px] cursor-pointer"
            onClick={function () {
              navigate(`/profile/${body.user.username}`);
            }}
          >
            {body.user.username}
          </h4>
          <p className="-mt-[1px] text-gray-500 text-[14px]">
            {body.user.name}
          </p>
          <p className="-mt-[1px] text-gray-500 text-[12px]">
            {"Suggested for you"}
          </p>
        </div>
      </div>
      {!isFollow ? (
        <Button
          onClick={followingUserClick}
          name={"Follow"}
          backgroundColor={"#0099e6"}
          hoverBackgroundColor={""}
          color={"white"}
        />
      ) : (
        <Button
          onClick={unfollowingUserClick}
          name={"Following"}
          backgroundColor={"rgb(239,239,239)"}
          hoverBackgroundColor={"rgb(220,220,220)"}
          color={"#000000"}
        />
      )}
    </div>
  );
}

export default function PageSuggestedUsers() {
  const { isOpenSearch } = useOpenSearch();
  const [isFullContent, setIsFullContent] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 30;
  useEffect(() => {
    setIsFullContent(!isOpenSearch);
  }, [isOpenSearch]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getSuggestedUsers(limit);
      if (data.status === 200) {
        setSuggestedUsers(data.metadata.users);
      }
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) return "";
  return (
    <div className="bg-gray-50 flex h-screen relative">
      <Sidebar isFullContent={isFullContent} />
      {isOpenSearch ? <Search /> : ""}
      <div className="flex-grow flex justify-center overflow-y-scroll">
        <div className="h-full w-[580px] py-[60px]">
          <div className="text-[16px] font-semibold ms-2 my-4">
            Suggested for you
          </div>
          {suggestedUsers.map((user) => (
            <User user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

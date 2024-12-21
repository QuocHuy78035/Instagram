import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { followingUser, getSuggestedUsers, unfollowingUser } from "../../api";
import { useNavigate } from "react-router-dom";

function User(body: { user: any; mode?: string }) {
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
    <div className="flex items-center justify-between ps-2 py-[7px] w-[280px]">
      <div className="flex items-center space-x-3">
        <img
          src={body.user.avatar}
          alt="Profile Picture"
          className="w-10 h-10 rounded-full"
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
          <p className="-mt-[1px] text-gray-500 text-[12px]">
            {!body.mode ? "Suggested for you" : body.user.name}
          </p>
        </div>
      </div>
      {body.mode !== "Switch" ? (
        <div
          className="text-[13px] text-[#0099e6] hover:text-blue-800 font-semibold cursor-pointer"
          onClick={!isFollow ? followingUserClick : unfollowingUserClick}
        >
          {!isFollow ? "Follow" : "Unfollow"}
        </div>
      ) : (
        <div
          className="text-[13px] text-[#0099e6] hover:text-blue-800 font-semibold cursor-pointer"
          onClick={function () {}}
        >
          {body.mode}
        </div>
      )}
    </div>
  );
}

export default function SuggestedUsers() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const limit = 5;
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getSuggestedUsers(limit);
      if (data.status === 200) {
        setSuggestedUsers(data.metadata.users);
      }
    })();
  }, []);
  return (
    <div className="w-[35%] px-2 py-6">
      <User mode="Switch" user={user} />
      <div className="flex justify-between items-center font-semibold w-[280px] my-2">
        <div className="text-[14px]">Suggested for you</div>
        <div
          className="text-[13px] hover:text-gray-500 cursor-pointer"
          onClick={function () {
            navigate("/explore/people");
          }}
        >
          See All
        </div>
      </div>
      {suggestedUsers.map((user: any) => (
        <User user={user} />
      ))}
    </div>
  );
}

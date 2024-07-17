import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { findRecentSearchByUser, searchUser } from "../../api";

export default function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<Array<any>>([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await searchUser(search);
      if (data.status === 200) {
        setUsers(data.metadata.users);
        // setInfor(null);
      } else {
        setUsers([]);
        // setInfor(data.message);
      }
    })();
  }, [search]);
  useEffect(() => {
    (async () => {
      const data = await findRecentSearchByUser();
      if (data.status === 200) {
        setSearchedUsers(data.recentSearch.searchUsers);
      }
    })();
  }, []);
  return (
    <div
      className="w-[400px] h-screen shadow rounded-r-[20px]"
      style={{
        boxShadow: "25px 0 20px -25px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="px-[30px] py-[30px] ">
        <div className="text-[23px] font-semibold mb-8">Search</div>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 outline-none flex-grow bg-gray-200 text-black w-full rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {!search ? (
        <div className="border-t-[1px] border-gray-200">
          <div className="flex justify-between font-semibold px-[30px] pt-[30px] pb-[20px]">
            <div>Recent</div>
            <div className="text-blue-500 hover:text-blue-800 cursor-pointer">
              Clear All
            </div>
          </div>
          {searchedUsers.map((user: any) => (
            <div
              className={`flex justify-between hover:bg-[rgb(239,239,239)] px-6 py-[10px]`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-[14px]">{user.name}</h4>
                  <p className="mt-[3px] text-gray-500 text-[13px]">
                    {user.username}
                  </p>
                </div>
                <div>
                  <HiMiniXMark className="ml-[160px] my-auto fill-black text-[25px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <div
              className={`flex justify-between hover:bg-[rgb(239,239,239)] px-6 py-[6px]`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-[14px]">{user.name}</h4>
                  <p className="mt-[3px] text-gray-500 text-[13px]">
                    {user.username}
                  </p>
                </div>
              </div>
              <label htmlFor={`${user._id}`} className="hidden"></label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

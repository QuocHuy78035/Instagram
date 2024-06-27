import { HiMiniXMark } from "react-icons/hi2";
import useOpenConversation from "../../zustand/useOpenConversation";
import { useEffect, useState } from "react";
import { createConversation, searchUser } from "../../api";
import useConversations from "../../zustand/useConversations";

export default function FormCreateConversation() {
  const { setIsOpenConversation } = useOpenConversation();
  const { conversations, setConversations } = useConversations();
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<Array<any>>([]);
  const [infor, setInfor] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);
  useEffect(() => {
    (async () => {
      const data = await searchUser(search);
      if (data.status === 200) {
        setUsers(data.metadata.users);
        setInfor(null);
      } else {
        setUsers([]);
        setInfor(data.message);
      }
    })();
  }, [search]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await createConversation(
      selectedUsers.map((user) => user._id)
    );
    if (data.status === 200) {
      setConversations([...conversations, data.metadata.conversation]);
      setIsOpenConversation(false);
    }
  }
  return (
    <>
      <div className="absolute backdrop-brightness-[0.7] w-full h-full z-[1000] flex flex-col justify-center">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col mx-auto w-[550px] h-[450px] bg-[white] rounded-2xl"
        >
          <HiMiniXMark
            className="absolute right-5 top-[16px] text-[25px]"
            onClick={function () {
              setIsOpenConversation(false);
            }}
          />
          <div className="text-center text-black border-b-[1px] border-gray-200 py-4 font-[600]">
            New message
          </div>
          <div className="flex flex-wrap px-4 py-2 border-b-[1px] border-gray-200">
            <span className="my-auto me-1">To:</span>
            {selectedUsers.map((selectedUser) => (
              <div className="flex justify-center bg-[#e0f1ff] rounded-md mx-1 mb-1 px-2 py-[1px] border-[1px] border-[#0099e6] text-[#0099e6]">
                <div className="me-1 my-auto font-[600]">
                  {selectedUser.name}
                </div>
                <HiMiniXMark
                  className="my-auto fill-[#0099e6] text-[22px]"
                  onClick={function () {
                    setSelectedUsers(
                      selectedUsers.filter(
                        (user) => user._id !== selectedUser._id
                      )
                    );
                  }}
                />
              </div>
            ))}
            <input
              type="text"
              placeholder="Search..."
              className="ms-[16px] outline-none flex-grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-grow w-full h-[250px] overflow-y-scroll">
            <div className="px-4 py-2 text-[14px]">{infor ? infor : ""}</div>
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
                  <input
                    id={`${user._id}`}
                    checked={Boolean(
                      selectedUsers.find(
                        (selectedUser) => selectedUser._id === user._id
                      )
                    )}
                    type="checkbox"
                    className="w-6 h-6 my-auto"
                    name={user._id}
                    value={user._id}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedUsers([
                          ...selectedUsers,
                          { _id: user._id, name: user.name },
                        ]);
                      else {
                        let ind = -1;
                        for (let i = 0; i < selectedUsers.length; i++) {
                          if (selectedUsers[i]._id === user._id) {
                            ind = i;
                            break;
                          }
                        }
                        setSelectedUsers([
                          ...selectedUsers.slice(0, ind),
                          ...selectedUsers.slice(ind + 1),
                        ]);
                      }
                      setSearch("");
                    }}
                  />
                  <label htmlFor={`${user._id}`} className="hidden"></label>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-4">
            <button
              className={`px-3 py-3 bg-[#0099e6] text-white font-medium transition duration-200 text-[14px] rounded-md w-full ${
                selectedUsers.length === 0 ? "opacity-50" : ""
              }`}
              onClick={handleSubmit}
              disabled={selectedUsers.length === 0}
            >
              Chat
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

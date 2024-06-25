import { HiMiniXMark } from "react-icons/hi2";
import useOpenConversation from "../../zustand/useOpenConversation";
import { useEffect, useState } from "react";
import { searchUser } from "../../api";

export default function FormCreateConversation() {
  const { setIsOpenConversation } = useOpenConversation();
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [infor, setInfor] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const data = await searchUser(search);
      if (data.status === 200) {
        console.log(data.users);
        setUsers(data.users);
      } else {
        setInfor(data.message);
      }
    })();
  }, [search]);
  return (
    <>
      <div className="absolute backdrop-brightness-[0.7] w-full h-full z-[1000] flex flex-col justify-center">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col mx-auto w-[550px] h-[450px] bg-[white] rounded-2xl"
        >
          <HiMiniXMark
            className="absolute right-5 top-[16px] text-[25px]"
            onClick={function (e) {
              setIsOpenConversation(false);
            }}
          />
          <div className="text-center text-black border-b-[1px] border-gray-200 py-4 font-[600]">
            New message
          </div>
          <div className="flex px-4 py-2 border-b-[1px] border-gray-200">
            <span>To:</span>
            <input
              type="text"
              placeholder="Search..."
              className="ms-[16px] outline-none flex-grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-grow w-full">
            <div className="px-4 py-2">{infor ? infor : ""}</div>
          </div>
        </form>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { IoMdGrid, IoMdSettings } from "react-icons/io";
import { LuUserSquare2 } from "react-icons/lu";
import Sidebar from "../components/Sidebar";
import useOpenSearch from "../zustand/useOpenSearch";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../api";
import Button from "../components/profile/Button";
import Tab from "../components/profile/Tab";
import Search from "../components/search/Search";

export default function PageProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const { isOpenSearch } = useOpenSearch();
  const [isFullContent, setIsFullContent] = useState(true);
  const [mode, setMode] = useState("Posts");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading]  = useState(true);
  const { user } = useAuthContext();
  useEffect(() => {
    setIsFullContent(!isOpenSearch);
  }, [isOpenSearch]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getProfile(params.username as string);
      if (data.status === 200) {
        setUserProfile(data.metadata.user);
      }
      setIsLoading(false);
    })();
  }, [params.username]);

  if (isLoading) return "";
  return (
    <div className="bg-gray-50 flex h-screen relative">
      <Sidebar isFullContent={isFullContent} />
      {isOpenSearch ? <Search /> : ""}
      <div className="flex-grow px-[160px] overflow-y-scroll">
        <div className="h-[100%] w-[100%]">
          <div className="h-[400px] w-[100%]">
            <div className="h-[50%] flex justify-center space-x-20">
              <img
                src={userProfile?.avatar}
                className={`my-auto rounded-full z-10 w-[140px] h-[140px]`}
                alt="Profile"
              />

              <div className="mt-3">
                <div className="flex space-x-3 mt-5 mb-5">
                  <div className="text-[21px] my-auto">
                    {userProfile?.username}
                  </div>
                  {typeof user !== "string" &&
                  user &&
                  user._id === userProfile?._id ? (
                    <>
                      <Button
                        onClick={function () {
                          navigate("/accounts/edit");
                        }}
                        name={"Edit profile"}
                      />
                      <Button onClick={function () {}} name={"View archive"} />
                      <IoMdSettings className="text-[28px] my-auto cursor-pointer" />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex space-x-10 text-[17px]">
                  <div>
                    <span className="font-semibold">0</span> posts
                  </div>
                  <div>
                    <span className="font-semibold">
                      {userProfile?.followers.length}
                    </span>{" "}
                    follower
                  </div>
                  <div>
                    <span className="font-semibold">
                      {userProfile?.following.length}
                    </span>{" "}
                    following
                  </div>
                </div>
                <div className="mt-3 text-[17px] font-semibold">
                  {userProfile?.name}
                </div>
              </div>
            </div>
            <div className="h-[50%] px-[50px] py-[30px]">
              <div className="w-[85px]">
                <button className="flex justify-center w-[85px] h-[85px] rounded-full border-[1px] border-gray-200 outline-none cursor-pointer">
                  <AiOutlinePlus className="text-[50px] my-auto text-gray-300" />
                </button>
                <div className="text-[13px] font-[500] text-center mt-1">
                  New
                </div>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-[100%] border-t-[1px] border-gray-200">
            <ul className="flex justify-center space-x-12 mx-auto text-[15px]">
              <Tab
                mode={mode}
                setMode={setMode}
                icon={<IoMdGrid className="my-auto" />}
                name="Posts"
              />
              <Tab
                mode={mode}
                setMode={setMode}
                icon={<CiBookmark className="my-auto" />}
                name="Saved"
              />
              <Tab
                mode={mode}
                setMode={setMode}
                icon={<LuUserSquare2 className="my-auto" />}
                name="Tagged"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

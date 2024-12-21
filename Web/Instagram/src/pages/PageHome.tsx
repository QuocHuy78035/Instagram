import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Sidebar from "../components/Sidebar";
import useOpenSearch from "../zustand/useOpenSearch";
import SuggestedUsers from "../components/home/SuggestedUsers";
import Posts from "../components/home/Posts";

export default function PageHome() {
  const { isOpenSearch } = useOpenSearch();
  const [isFullContent, setIsFullContent] = useState(true);
  useEffect(() => {
    setIsFullContent(!isOpenSearch);
  }, [isOpenSearch]);
  return (
    <>
      <div className="bg-gray-50 flex h-screen relative">
        <Sidebar isFullContent={isFullContent} />
        {isOpenSearch ? <Search /> : ""}
        <div className="flex flex-grow">
          <Posts />
          <SuggestedUsers />
        </div>
      </div>
    </>
  );
}

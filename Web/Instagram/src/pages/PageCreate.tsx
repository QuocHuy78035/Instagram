import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import Sidebar from "../components/Sidebar";
import useOpenSearch from "../zustand/useOpenSearch";

export default function PageCreate() {
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
      </div>
    </>
  );
}

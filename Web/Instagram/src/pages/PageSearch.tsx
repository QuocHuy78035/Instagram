import Search from "../components/search/Search";
import Sidebar from "../components/Sidebar";

export default function PageSearch() {
  return (
    <>
      <div className="bg-gray-50 flex h-screen relative">
        <Sidebar isFullContent={false} />
        <Search />
      </div>
    </>
  );
}

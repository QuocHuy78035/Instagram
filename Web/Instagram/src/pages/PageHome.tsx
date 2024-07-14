import Sidebar from "../components/Sidebar";

export default function PageHome() {
  return (
    <>
      <div className="bg-gray-50 flex h-screen relative">
        <Sidebar isFullContent={true} />
      </div>
    </>
  );
}

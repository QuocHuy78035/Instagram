import Sidebar from "../components/Sidebar";

export default function PageCreate() {
    return (
      <>
        <div className="bg-gray-50 flex h-screen relative">
          <Sidebar isFullContent={true} />
        </div>
      </>
    );
}
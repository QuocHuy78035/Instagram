import Sidebar from "../components/message/Sidebar";
import Conversations from "../components/message/Conversations";

export default function PageMessage({ children }) {
  return (
    <>
      <div className="bg-gray-50 flex h-screen">
        <Sidebar />
        {/* <!-- Main Content --> */}
        <div className="flex-grow flex flex-col overflow-hidden h-full">
          {/* <!-- Messages Container --> */}
          <div className="flex flex-1 h-full">
            <Conversations />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

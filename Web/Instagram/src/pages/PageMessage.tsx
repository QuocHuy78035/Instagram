import Sidebar from "../components/message/Sidebar";
import Conversations from "../components/message/Conversations";
import useOpenConversation from "../zustand/useOpenConversation";
import FormCreateConversation from "../components/message/FormCreateConversation";

export default function PageMessage({ children }) {
  const { isOpenConversation } = useOpenConversation();
  return (
    <>
      <div className="bg-gray-50 flex h-screen">
        <Sidebar />
        {isOpenConversation ? <FormCreateConversation /> : ""}
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

import Sidebar from "../components/message/Sidebar";
import Conversations from "../components/message/Conversations";
import useOpenConversation from "../zustand/useOpenConversation";
import FormCreateConversation from "../components/message/FormCreateConversation";
import ConversationInformation from "../components/message/ConversationInformation";
import useOpenConversationInformation from "../zustand/useOpenConversationInformation";
import useConversation from "../zustand/useConversation";

export default function PageMessage({ children }) {
  const { isOpenConversation } = useOpenConversation();
  const { isOpenConversationInformation } = useOpenConversationInformation();
  const { conversation } = useConversation();
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
        {isOpenConversationInformation ? (
          <ConversationInformation conversation={conversation} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

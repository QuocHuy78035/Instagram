import Sidebar from "../components/Sidebar";
import Conversations from "../components/message/Conversations";
import useOpenConversation from "../zustand/useOpenConversation";
import FormCreateConversation from "../components/message/FormCreateConversation";
import ConversationInformation from "../components/message/ConversationInformation";
import useOpenConversationInformation from "../zustand/useOpenConversationInformation";
import useConversation from "../zustand/useConversation";
import NavigateMore from "../components/message/NavigateMoreMessage";
import useOpenNavigateMoreMessage from "../zustand/useOpenNavigateMoreMessage";
import { useEffect } from "react";
import useOpenSearch from "../zustand/useOpenSearch";
import Search from "../components/search/Search";

export default function PageMessage({ children }) {
  const { isOpenConversation } = useOpenConversation();
  const { isOpenConversationInformation } = useOpenConversationInformation();
  const { conversation } = useConversation();
  const {
    isOpenNavigateMoreMessage,
    setIsOpenNavigateMoreMessage,
    top,
    left,
    selectedMessage,
    isRight,
  } = useOpenNavigateMoreMessage();
  const { isOpenSearch } = useOpenSearch();
  useEffect(() => {
    function handleClickOutside(event) {
      const messageMore = document.getElementById(
        `messageMore_${selectedMessage?._id}`
      );
      const navigateMoreMessage = document.getElementById(
        "navigate__more__message"
      );
      if (
        navigateMoreMessage &&
        !navigateMoreMessage.contains(event.target) &&
        messageMore &&
        !messageMore.contains(event.target)
      ) {
        setIsOpenNavigateMoreMessage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMessage, setIsOpenNavigateMoreMessage]);

  useEffect(() => {
    window.addEventListener("wheel", () => setIsOpenNavigateMoreMessage(false));
  }, []);
  return (
    <>
      <div className="bg-gray-50 flex h-screen relative">
        <Sidebar isFullContent={false} />
        {isOpenSearch ? <Search /> : ""}
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

        <NavigateMore
          className={`absolute ${
            !isOpenNavigateMoreMessage ? "hidden" : ""
          } w-[200px] bg-white rounded-lg`}
          style={{
            top: `${Math.floor(top - 200)}px`,
            left: `${Math.floor(left) - (isRight ? 200 - 32 : 0)}px`,
          }}
          message={selectedMessage}
        />
      </div>
    </>
  );
}

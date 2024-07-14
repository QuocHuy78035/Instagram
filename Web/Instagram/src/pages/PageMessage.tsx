import Sidebar from "../components/Sidebar";
import Conversations from "../components/message/Conversations";
import useOpenConversation from "../zustand/useOpenConversation";
import FormCreateConversation from "../components/message/FormCreateConversation";
import ConversationInformation from "../components/message/ConversationInformation";
import useOpenConversationInformation from "../zustand/useOpenConversationInformation";
import useConversation from "../zustand/useConversation";
import NavigateMore from "../components/message/NavigateMore";
import useOpenNavigateMore from "../zustand/useOpenNavigateMore";
import { useEffect } from "react";

export default function PageMessage({ children }) {
  const { isOpenConversation } = useOpenConversation();
  const { isOpenConversationInformation } = useOpenConversationInformation();
  const { conversation } = useConversation();
  const {
    isOpenNavigateMore,
    setIsOpenNavigateMore,
    top,
    left,
    selectedMessage,
    isRight,
  } = useOpenNavigateMore();
  useEffect(() => {
    function handleClickOutside(event) {
      const messageMore = document.getElementById(
        `messageMore_${selectedMessage?._id}`
      );
      const navigateMore = document.getElementById("navigate__more");
      if (
        navigateMore &&
        !navigateMore.contains(event.target) &&
        messageMore &&
        !messageMore.contains(event.target)
      ) {
        setIsOpenNavigateMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMessage, setIsOpenNavigateMore]);


  useEffect(() => {
    window.addEventListener("wheel", () => setIsOpenNavigateMore(false));
  }, []); 
  return (
    <>
      <div className="bg-gray-50 flex h-screen relative">
        <Sidebar isFullContent={false} />
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
            !isOpenNavigateMore ? "hidden" : ""
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

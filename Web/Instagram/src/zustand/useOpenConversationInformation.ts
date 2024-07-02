import { create } from "zustand";

const useOpenConversationInformation = create<{
  isOpenConversationInformation: boolean;
  setIsOpenConversationInformation: (isOpenConversation: boolean) => void;
}>((set) => ({
  isOpenConversationInformation: false,
  setIsOpenConversationInformation: (isOpenConversationInformation: boolean) =>
    set({ isOpenConversationInformation }),
}));

export default useOpenConversationInformation;

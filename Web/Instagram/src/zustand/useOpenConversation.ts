import { create } from "zustand";

const useOpenConversation = create<{
  isOpenConversation: boolean;
  setIsOpenConversation: (isOpenConversation: boolean) => void;
}>((set) => ({
  isOpenConversation: false,
  setIsOpenConversation: (isOpenConversation: boolean) =>
    set({ isOpenConversation }),
}));

export default useOpenConversation;

import { create } from "zustand";

const useOpenConversation = create((set) => ({
  isOpenConversation: false,
  setIsOpenConversation: (isOpenConversation: boolean) =>
    set({ isOpenConversation }),
}));

export default useOpenConversation;

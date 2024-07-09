import { create } from "zustand";

const useMessages = create<{
  messages: Array<any>;
  setMessages: (messages: any) => void;
}>((set) => ({
  messages: [],
  setMessages: (messages: any) => set({ messages }),
}));

export default useMessages;

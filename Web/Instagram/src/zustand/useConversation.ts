import { create } from "zustand";

const useConversation = create<{
  conversation: any;
  setConversation: (conversation: any) => void;
}>((set) => ({
  conversation: null,
  setConversation: (conversation: any) => set({ conversation }),
}));

export default useConversation;

import { create } from "zustand";

const useConversations = create<{
  conversations: Array<any>;
  setConversations: (conversations: any) => void;
}>((set) => ({
  conversations: [],
  setConversations: (conversations: any) => set({ conversations }),
}));

export default useConversations;

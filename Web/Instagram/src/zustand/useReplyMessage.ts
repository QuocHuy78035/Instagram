import { create } from "zustand";

const useReplyMessage = create<{
  replyMessage: any;
  setReplyMessage: (replyMessage: any) => void;
  senderReplyMessage: any;
  setSenderReplyMessage: (senderReplyMessage: any) => void;
}>((set) => ({
  replyMessage: undefined,
  setReplyMessage: (replyMessage: any) => set({ replyMessage }),
  senderReplyMessage: null,
  setSenderReplyMessage: (senderReplyMessage: any) =>
    set({ senderReplyMessage }),
}));

export default useReplyMessage;

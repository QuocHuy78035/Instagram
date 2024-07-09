import { create } from "zustand";

const useOpenNavigateMore = create<{
  isOpenNavigateMore: boolean;
  setIsOpenNavigateMore: (isOpenNavigateMore: boolean) => void;
  selectedMessage: any;
  setSelectedMessage: (selectedMessage: any) => void;
  top: number;
  setTop: (top: number) => void;
  left: number;
  setLeft: (left: number) => void;
  right: number;
  setRight: (right: number) => void;
  isRight: boolean;
  setIsRight: (isRight: boolean) => void;
}>((set) => ({
  isOpenNavigateMore: false,
  setIsOpenNavigateMore: (isOpenNavigateMore: boolean) =>
    set(() => ({ isOpenNavigateMore })),
  selectedMessage: undefined,
  setSelectedMessage: (selectedMessage: any) =>
    set(() => ({ selectedMessage })),
  top: 0,
  setTop: (top: number) => set({ top }),
  left: 0,
  setLeft: (left: number) => set({ left }),
  right: 0,
  setRight: (right: number) => set({ right }),
  isRight: false,
  setIsRight: (isRight: boolean) => set({ isRight }),
}));

export default useOpenNavigateMore;

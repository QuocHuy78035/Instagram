import { create } from "zustand";

const useOpenNavigateMore = create<{
  isOpenNavigateMore: boolean;
  setIsOpenNavigateMore: (isOpenNavigateMore: boolean) => void;
}>((set) => ({
  isOpenNavigateMore: false,
  setIsOpenNavigateMore: (isOpenNavigateMore: boolean) =>
    set(() => ({ isOpenNavigateMore })),
}));

export default useOpenNavigateMore;

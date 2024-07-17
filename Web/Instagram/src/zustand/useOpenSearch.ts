import { create } from "zustand";

const useOpenSearch = create<{
  isOpenSearch: boolean;
  setIsOpenSearch: (isOpenSearch: boolean) => void;
}>((set) => ({
  isOpenSearch: false,
  setIsOpenSearch: (isOpenSearch: boolean) =>
    set(() => ({ isOpenSearch })),
}));

export default useOpenSearch;

import { create } from "zustand";

const usePage = create<{
  page: number;
  setPage: (page: any) => void;
}>((set) => ({
  page: 1,
  setPage: (page: any) => set({ page }),
}));

export default usePage;

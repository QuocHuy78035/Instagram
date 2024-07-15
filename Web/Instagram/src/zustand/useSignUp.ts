import { create } from "zustand";

const useSignUp = create<{
  mobile?: string;
  setMobile: (mobile: string) => void;
  email?: string;
  setEmail: (mobile: string) => void;
  name: string;
  setName: (name: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
}>((set) => ({
  mobile: undefined,
  setMobile: (mobile: string) => set({ mobile }),
  email: undefined,
  setEmail: (email: string) => set({ email }),
  name: "",
  setName: (name: string) => set({ name }),
  username: "",
  setUsername: (username: string) => set({ username }),
  password: "",
  setPassword: (password: string) => set({ password }),
}));

export default useSignUp;

import User from "./user.interface";

export default interface AuthContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null | string;
  setUser: React.Dispatch<React.SetStateAction<User | null | string>>;
}

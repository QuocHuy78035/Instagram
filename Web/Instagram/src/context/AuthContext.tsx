import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContextProps from "../interfaces/authcontextprops.interface";
import { getCookie } from "../utils";
import User from "../interfaces/user.interface";
import { getUser } from "../api";

export const AuthContext = createContext<AuthContextProps>({
  userId: null,
  setUserId: () => null,
  user: null,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactNode => {
  const [userId, setUserId] = useState<string | null>(getCookie("user"));
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const data = await getUser();
      if (data.status === 200) {
        setUser(data.metadata.user);
      }
    })();
  }, [userId]);
  return (
    <AuthContext.Provider value={{ userId, setUserId, user }}>
      {children}
    </AuthContext.Provider>
  );
};

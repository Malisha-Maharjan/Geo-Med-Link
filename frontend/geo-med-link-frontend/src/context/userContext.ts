import { createContext, useContext } from "react";
import { UserData } from "~/hooks/user/useUser";

const UserContext = createContext<UserData>({
  setUsername: () => {},
  setToken: () => {},
  setUserType: () => {},
});

export const UserContextProvider = UserContext.Provider;

export const useUserContext = () => useContext(UserContext);

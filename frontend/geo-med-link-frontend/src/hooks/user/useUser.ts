import { useState } from "react";

export type UserData = {
  username?: string | undefined;
  setUsername: (user: string | undefined) => void;
  token?: string | undefined;
  setToken: (user: string | undefined) => void;
  userType?: number | undefined;
  setUserType: (user: number | undefined) => void;
};

export const useUser = (): UserData => {
  const [username, setUsername] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [userType, setUserType] = useState<number | undefined>();
  return {
    username,
    setUsername,
    token,
    setToken,
    userType,
    setUserType,
  };
};

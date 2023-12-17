import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserContext } from "~/context/userContext";
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useFetchUser = () => {
  console.log("This is fetching user");
  const { username } = useUserContext();
  console.log({ username });
  return useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      console.log(`${BASEURL}/api/user/user1`);
      const data = await fetch(`${BASEURL}/api/user/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("fetfaf");
      // console.log(data);
      const response = await data.json();
      // console.log(response);
      return response;
    },
  });
};

type userLoginParams = {
  username: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, password }: userLoginParams) => {
      const data = await fetch(`${BASEURL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password: password }),
      });
      const response = await data.json();
      console.log({ response });
      return response;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useFetchUser = () => {
  console.log("This is fetching user");
  return useQuery({
    queryKey: ["user", ""],
    queryFn: async () => {
      const data = await fetch(`${BASEURL}/api/user/user1`, {
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

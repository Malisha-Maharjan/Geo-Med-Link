import { useQuery } from "@tanstack/react-query";
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useSearchFetch = (value: string) => {
  return useQuery({
    queryKey: ["search", value],
    queryFn: async () => {
      console.log(`i am searching${value}`);
      const data = await fetch(
        `http://192.168.101.17:3000/api/search/${value}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ searchValue: value }),
        }
      );
      const response = await data.json();
      // console.log({ response });
      console.log(response);
      if (data.status !== 200) throw Error(response.error.message);
      return response;
    },
  });
};

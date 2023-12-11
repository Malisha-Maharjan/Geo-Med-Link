import { useQuery } from "@tanstack/react-query";

export const useFetchPost = () => {
  console.log("This is fetching apo");
  return useQuery({
    queryKey: ["post", "username"],
    queryFn: async () => {
      const data = await fetch(`http://192.168.1.71:3000/api/post/all`, {
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

export const useFetchUserPost = () => {
  console.log("This is fetching apo");
  return useQuery({
    queryKey: ["post", "username"],
    queryFn: async () => {
      const data = await fetch(`http://192.168.1.71:3000/api/post/user1`, {
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

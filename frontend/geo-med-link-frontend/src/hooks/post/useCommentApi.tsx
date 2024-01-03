import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { useUserContext } from "~/context/userContext";

const BASEURL = process.env.EXPO_PUBLIC_API_URL;
const queryClient = new QueryClient();
type PostCommentParams = {
  comment: string;
  postId: number;
};

export const usePostComment = () => {
  const { username } = useUserContext();
  return useMutation({
    mutationFn: async ({ comment, postId }: PostCommentParams) => {
      const data = await fetch(`${BASEURL}/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, userName: username, postId }),
      });
      const response = await data.json();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
};

export const useFetchComment = (postId: number) => {
  console.log("fetching comment");
  return useInfiniteQuery({
    queryKey: ["comment", postId],
    queryFn: async () => {
      const data = await fetch(`${BASEURL}/api/comment/${postId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await data.json();
      // console.log({ response });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, res) => {
      return lastPage?.data?.next_page;
    },
    select: (data) => {
      return data;
    },
  });
};

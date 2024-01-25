import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useUserContext } from "~/context/userContext";

const BASEURL = process.env.EXPO_PUBLIC_API_URL;

type PostCommentParams = {
  comment: string;
  postId: number;
};

export const usePostComment = () => {
  const { username } = useUserContext();
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  console.log("this is posting");
  console.log({ username });
  return useMutation({
    mutationFn: async ({ comment, postId }: PostCommentParams) => {
      const data = await fetch(`${BASEURL}/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, userName: username, postId }),
      });
      setId(postId);
      const response = await data.json();
      return response;
    },
    // onMutate: async({ comment, postId }: PostCommentParams)=> {
    //   await queryClient.cancelQueries({ queryKey: ['comment', id] })
    //   const previousComments = queryClient.getQueryData(['comment', id])
    //   queryClient.setQueryData(['comment', id], (old:any) => { return {...old, data:[...old.data, {id:}]}})
    // },
    // onError: ()=> {},
    // onSettled: ()=> {}
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
    },
  });
};

export const useFetchComment = (postId: number) => {
  // console.log("fetching comment");
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "~/context/userContext";
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useDeletePost = () => {
  const { username } = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: number) => {
      const data = await fetch(`${BASEURL}/api/post/delete/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const response = await data.json();
      if (data.status !== 200) throw new Error(response.error.message[0]);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all post"] });
      queryClient.invalidateQueries({ queryKey: ["post", username] });
    },
  });
};

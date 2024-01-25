import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "~/context/userContext";
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { username } = useUserContext();
  return useMutation({
    mutationFn: async (postId: number) => {
      const data = await fetch(
        `${BASEURL}/api/post/like/${postId}/${username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
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

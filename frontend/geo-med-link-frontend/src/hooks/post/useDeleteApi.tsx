import { QueryClient, useMutation } from "@tanstack/react-query";
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

const queryClient = new QueryClient();
export const useDeletePost = () => {
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
    },
  });
};

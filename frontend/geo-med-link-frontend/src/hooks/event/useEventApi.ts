import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export type CreateEvent = {
  eventName: string;
  description: string;
  hour: string;
  minute: string;
  selectedImage: string;
  date: Date | undefined;
  longitude: string;
  latitude: string;
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventName,
      description,
      hour,
      minute,
      selectedImage,
      date,
      longitude,
      latitude,
    }: CreateEvent) => {
      const data = await fetch(`${BASEURL}/api/event/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          description,
          hour,
          minute,
          photo: selectedImage,
          date,
          longitude,
          latitude,
        }),
      });
      const response = await data.json();
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
  });
};

export const useFetchEvent = () => {
  return useInfiniteQuery({
    queryKey: ["event"],
    queryFn: async ({ pageParam }) => {
      const data = await fetch(
        `${BASEURL}/api/event/all?pageNumber=${pageParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
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

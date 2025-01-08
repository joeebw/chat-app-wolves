import { getUserChats } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { useQuery } from "@tanstack/react-query";

const useGetCurrentUserChats = () => {
  const currentUser = useStore((state) => state.currentUser);

  return useQuery({
    queryKey: ["currentUser Chats"],
    queryFn: () => getUserChats(currentUser!.uid),
    refetchInterval: 3 * 60 * 1000,
    refetchIntervalInBackground: true,
    enabled: !!currentUser,
  });
};

export default useGetCurrentUserChats;

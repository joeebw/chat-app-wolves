import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/firebase";
import { useStore } from "@/store/useStore";

const useGetUserInfoCurrentChat = () => {
  const selectedUserId = useStore((state) => state.selectedUserId);

  return useQuery({
    queryKey: ["current chat", selectedUserId],
    queryFn: () => getUserData(selectedUserId!),
    enabled: !!selectedUserId,
  });
};

export default useGetUserInfoCurrentChat;

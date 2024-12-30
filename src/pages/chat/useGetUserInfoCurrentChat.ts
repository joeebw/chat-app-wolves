import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import useGetCurrentUserChats from "@/pages/chat/useGetCurrentUserChats";

const useGetUserInfoCurrentChat = () => {
  const selectedUserId = useStore((state) => state.selectedUserId);
  const setSelectedUserId = useStore((state) => state.setSelectedUserId);

  const { data: chats } = useGetCurrentUserChats();

  const isUserInChats = chats?.some((chat) =>
    chat.participants.includes(selectedUserId!)
  );

  useEffect(() => {
    if (!isUserInChats) {
      setSelectedUserId(null);
    }
  }, [isUserInChats]);

  return useQuery({
    queryKey: ["current chat", selectedUserId],
    queryFn: () => getUserData(selectedUserId!),
    enabled: !!selectedUserId && isUserInChats,
  });
};

export default useGetUserInfoCurrentChat;

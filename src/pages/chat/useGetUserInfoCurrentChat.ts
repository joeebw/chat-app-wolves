import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import useGetCurrentUserChats from "@/pages/chat/useGetCurrentUserChats";

const useGetUserInfoCurrentChat = () => {
  const selectedUserId = useStore((state) => state.selectedUserId);
  const setSelectedUserId = useStore((state) => state.setSelectedUserId);

  const { data: chats } = useGetCurrentUserChats();

  const isUserInChats = chats
    ? chats.some((chat) => chat.participants.includes(selectedUserId!))
    : true;

  const shouldEnableQuery =
    !!selectedUserId &&
    (chats
      ? chats.some((chat) => chat.participants.includes(selectedUserId))
      : false);

  useEffect(() => {
    if (chats && !isUserInChats) {
      console.log("User is not in chats 🎈");
      setSelectedUserId(null);
    }
  }, [isUserInChats, chats]);

  return useQuery({
    queryKey: ["current chat", selectedUserId],
    queryFn: () => getUserData(selectedUserId!),
    enabled: !!selectedUserId && shouldEnableQuery,
  });
};

export default useGetUserInfoCurrentChat;

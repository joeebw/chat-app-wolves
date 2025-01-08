import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputSearchUser from "./InputSearchUser";
import UserListChats from "./userListChats/UserListChats";
import { useStore } from "@/store/useStore";
import AddUserChatModal from "@/pages/chat/AddUserChatModal";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Chat } from "@/ts/types";
import useGetCurrentUserChats from "@/pages/chat/useGetCurrentUserChats";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = () => {
  const [chatList, setChatList] = useState<Chat[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useStore((state) => state.currentUser);

  const { data: chats } = useGetCurrentUserChats();

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getUserData(currentUser!.uid),
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (chats) {
      setChatList(chats);
      setIsLoading(false);
    }
  }, [chats]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="flex items-center px-6 pt-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src={data?.photoURL} />
            <AvatarFallback>Doe</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium line-clamp-1">
            {data?.displayName}
          </h3>
        </div>
      </div>

      {/* Search User and user to char */}
      <div className="flex items-center justify-between px-6 mt-8 gap-7">
        <InputSearchUser setChatList={setChatList} chats={chats} />

        <AddUserChatModal />
      </div>

      {/* Chat lists */}
      <div className="flex-1 min-h-0 overflow-y-auto mt-9">
        {isLoading && (
          <div className="flex flex-col gap-0.5">
            <Skeleton className="w-full h-[85px] bg-gray-500 border-b" />
            <Skeleton className="w-full h-[85px] bg-gray-500 border-b" />
            <Skeleton className="w-full h-[85px] bg-gray-500 border-b" />
          </div>
        )}

        <UserListChats chatList={chatList} />
      </div>
    </div>
  );
};

export default Sidebar;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import InputSearchUser from "./InputSearchUser";
import UserListChats from "./userListChats/UserListChats";
import { useStore } from "@/store/useStore";
import AddUserChatModal from "@/pages/chat/AddUserChatModal";
import { useQuery } from "@tanstack/react-query";
import { getUserChats, getUserData } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Chat } from "@/ts/types";
import useGetCurrentUserChats from "@/pages/chat/useGetCurrentUserChats";

const Sidebar = () => {
  const [chatList, setChatList] = useState<Chat[] | undefined>();
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
    }
  }, [chats]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src={data?.photoURL} />
            <AvatarFallback>Doe</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium line-clamp-1">
            {data?.displayName}
          </h3>
        </div>
        <Button size={"icon"} variant="ghost">
          <SlOptions />
        </Button>
      </div>

      {/* Search User and user to char */}
      <div className="flex items-center justify-between px-6 mt-8 gap-7">
        <InputSearchUser setChatList={setChatList} chats={chats} />

        <AddUserChatModal />
      </div>

      {/* Chat lists */}
      <div className="flex-1 min-h-0 overflow-y-auto mt-9">
        <UserListChats chatList={chatList} />
      </div>
    </div>
  );
};

export default Sidebar;

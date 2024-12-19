import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Chat } from "@/ts/types";
import { useEffect, useState } from "react";

type Props = {
  chats: Chat[] | undefined;
  setChatList: (chat: Chat[] | undefined) => void;
};

const InputSearchUser = ({ chats, setChatList }: Props) => {
  const [search, setSearch] = useState("");

  const searchChat = () => {
    const newChatList = chats?.filter((chat) => {
      return chat.user.displayName.toLowerCase().includes(search.toLowerCase());
    });
    setChatList(newChatList);
  };

  useEffect(() => {
    searchChat();
  }, [search]);

  return (
    <div className="relative flex-1">
      <Input
        type="text"
        className="pl-10 bg-input-background"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <IoSearch className="absolute text-xl top-2 left-2" />
    </div>
  );
};

export default InputSearchUser;

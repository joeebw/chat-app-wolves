import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useBlockStatus from "@/hooks/useBlockStatus";
import useGetUserInfoCurrentChat from "@/pages/chat/useGetUserInfoCurrentChat";
import { useStore } from "@/store/useStore";
import BlockedUserImg from "@/assets/blocked-user.png";

import clsx from "clsx";
import { IoIosInformationCircle } from "react-icons/io";

const ChatUserInfo = () => {
  const selectedUserId = useStore((state) => state.selectedUserId);
  const { isLoading, data: userData } = useGetUserInfoCurrentChat();
  const currentUserId = useStore((state) => state.currentUser?.uid);
  const selectedChatId = useStore((state) => state.selectedChatId);

  const { isBlocked } = useBlockStatus(
    currentUserId!,
    selectedUserId!,
    selectedChatId!
  );

  const avatarImage = isBlocked ? BlockedUserImg : userData?.photoURL;

  if (isLoading) {
    return (
      <div className="flex items-center p-4 space-x-5 border-b">
        <Skeleton className="w-12 h-12 rounded-full bg-muted-foreground" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-muted-foreground" />
          <Skeleton className="h-4 w-[200px] bg-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className={clsx("flex gap-4 items-center")}>
        <Avatar className="w-14 h-14">
          <AvatarImage src={avatarImage} />
          <AvatarFallback>
            <Avatar className="w-14 h-14">
              <AvatarImage src={"https://avatar.iran.liara.run/public"} />
            </Avatar>
          </AvatarFallback>
        </Avatar>
        <div>
          {selectedUserId ? (
            <>
              <h4 className="text-lg font-medium">{userData?.displayName}</h4>
              <span className="text-gray-300">{userData?.status}</span>
            </>
          ) : (
            <span className="text-muted">No chat has been selected 😄</span>
          )}
        </div>
      </div>

      <IoIosInformationCircle className="text-3xl cursor-not-allowed" />
    </div>
  );
};

export default ChatUserInfo;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/useStore";
import useGetUserInfoCurrentChat from "@/pages/chat/useGetUserInfoCurrentChat";
import { Skeleton } from "@/components/ui/skeleton";
import SharedPhotos from "@/pages/chat/SharedPhotos";
import useBlockStatus from "@/hooks/useBlockStatus";
import BlockedUserImg from "@/assets/blocked-user.png";

const ChatUserDetails = () => {
  const queryClient = useQueryClient();
  const resetStore = useStore((state) => state.resetStore);
  const currentUserId = useStore((state) => state.currentUser?.uid);
  const selectedUserId = useStore((state) => state.selectedUserId);
  const selectedChatId = useStore((state) => state.selectedChatId);

  const { data: userData, isLoading } = useGetUserInfoCurrentChat();
  const { isBlocked, blockedByMe, blockedByOther, toggleBlock } =
    useBlockStatus(currentUserId!, selectedUserId!, selectedChatId!);

  const avatarImage = isBlocked ? BlockedUserImg : userData?.photoURL;

  console.log("isBlocked: ", isBlocked);
  console.log("blockedByMe: ", blockedByMe);
  console.log("blockedByOther: ", blockedByOther);

  const handleLogout = async () => {
    await signOut();
    resetStore();
    queryClient.clear();
  };

  return (
    <div className="flex flex-col h-full">
      {/* User details */}
      <div className="flex flex-col items-center gap-3 p-8 border-b shrink-0">
        <Avatar className="w-28 h-28">
          <AvatarImage src={avatarImage} />
          <AvatarFallback>
            <Avatar className="w-28 h-28">
              <AvatarImage src={"https://avatar.iran.liara.run/public"} />
            </Avatar>
          </AvatarFallback>
        </Avatar>

        {!isLoading && userData && (
          <>
            <h3 className="text-2xl font-medium">{userData.displayName}</h3>
            <p className="line-clamp-2">{userData.status}</p>
          </>
        )}

        {isLoading && (
          <>
            <Skeleton className="h-10 w-52 bg-muted-foreground" />
            <Skeleton className="w-full h-5 bg-muted-foreground" />
          </>
        )}
      </div>

      {isBlocked && (
        <div className="flex items-center justify-center flex-1 text-secondary">
          {blockedByMe
            ? "You have blocked this user"
            : "You have been blocked by this user"}
        </div>
      )}

      {/* Accordion section */}
      {isBlocked ? null : <SharedPhotos />}

      {/* Footer buttons */}
      <div className="flex flex-col gap-5 p-6 shrink-0">
        <Button
          variant={blockedByMe ? "secondary" : "destructive"}
          onClick={toggleBlock}
        >
          {blockedByMe ? "Unblock User" : "Block User"}
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};
export default ChatUserDetails;

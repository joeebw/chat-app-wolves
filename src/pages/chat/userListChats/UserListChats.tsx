import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useMultipleBlockStatus } from "@/hooks/useMultipleBlockStatus";
import { useStore } from "@/store/useStore";
import { Chat } from "@/ts/types";
import BlockedUserImg from "@/assets/blocked-user.png";
import DropdownChat from "@/pages/chat/userListChats/DropdownChat";
import ModalConfirmRemoveChat from "@/pages/chat/userListChats/ModalConfirmRemoveChat";
import clsx from "clsx";

type Props = {
  chatList: Chat[] | undefined;
};

const UserListChats = ({ chatList }: Props) => {
  const setSelectedChatId = useStore((state) => state.setSelectedChatId);
  const setSelectedUserId = useStore((state) => state.setSelectedUserId);
  const currentUserId = useStore((state) => state.currentUser?.uid);
  const selectedUserId = useStore((state) => state.selectedUserId);

  const blockStatuses = useMultipleBlockStatus(chatList, currentUserId!);

  const handleSelectUserIdAndChatId = (chatId: string, userId: string) => {
    setSelectedChatId(chatId);
    setSelectedUserId(userId);
  };

  return (
    <>
      <ModalConfirmRemoveChat />
      {chatList?.map(
        ({ id, user: { displayName, photoURL, uid }, lastMessage }) => {
          const isBlocked = blockStatuses[id];

          return (
            <div key={id} onClick={() => handleSelectUserIdAndChatId(id, uid)}>
              <div
                className={clsx(
                  "flex items-center justify-between px-6 py-4 transition-all cursor-pointer hover:bg-gray-500",
                  selectedUserId === uid && "bg-gray-500"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={isBlocked ? BlockedUserImg : photoURL} />
                    <AvatarFallback>{displayName}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-medium line-clamp-1">{displayName}</h4>
                    {/* Last message */}
                    <p className="text-sm line-clamp-1">
                      {lastMessage?.content ? (
                        lastMessage.content === "Image" ? (
                          "Image 📷"
                        ) : (
                          lastMessage.content
                        )
                      ) : (
                        <span className="text-gray-400">
                          There are no messages yet...
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <DropdownChat />
              </div>
              <Separator />
            </div>
          );
        }
      )}
    </>
  );
};

export default UserListChats;

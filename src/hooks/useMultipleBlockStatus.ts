import { subscribeToBlockStatus } from "@/lib/firebase";
import { Chat } from "@/ts/types";
import { useState, useEffect } from "react";

export const useMultipleBlockStatus = (
  chats: Chat[] | undefined,
  currentUserId: string
) => {
  const [blockStatuses, setBlockStatuses] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!chats || !currentUserId) return;

    const unsubscribers = chats.map((chat) => {
      return subscribeToBlockStatus(
        chat.id,
        currentUserId,
        chat.user.uid,
        (blockedByMe, blockedByOther) => {
          setBlockStatuses((prev) => ({
            ...prev,
            [chat.id]: blockedByMe || blockedByOther,
          }));
        }
      );
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [chats, currentUserId]);

  return blockStatuses;
};

import { subscribeToBlockStatus, toggleBlockUser } from "@/lib/firebase";
import { useState, useEffect } from "react";

const useBlockStatus = (
  currentUserId: string,
  selectedUserId: string,
  chatId: string
) => {
  const [blockedByMe, setBlockedByMe] = useState(false);
  const [blockedByOther, setBlockedByOther] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId || !currentUserId || !selectedUserId) return;

    const unsubscribe = subscribeToBlockStatus(
      chatId,
      currentUserId,
      selectedUserId,
      (byMe, byOther) => {
        setBlockedByMe(byMe);
        setBlockedByOther(byOther);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatId, currentUserId, selectedUserId]);

  const toggleBlock = async () => {
    if (!chatId || !currentUserId || !selectedUserId) return;
    await toggleBlockUser(currentUserId, chatId);
  };

  return {
    isBlocked: blockedByMe || blockedByOther,
    blockedByMe,
    blockedByOther,
    loading,
    toggleBlock,
  };
};

export default useBlockStatus;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatMessages } from "@/lib/firebase";
import { useEffect } from "react";
import { Message } from "@/ts/types";

export const useMessages = (chatId: string | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!chatId) return;
    const unsubscribe = getChatMessages(chatId, (newMessages) => {
      queryClient.setQueryData(["messages", chatId], newMessages);
      queryClient.invalidateQueries({ queryKey: ["sharedPhotos", chatId] });
    });
    return () => unsubscribe();
  }, [chatId, queryClient]);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () =>
      new Promise<Message[]>((resolve) => {
        getChatMessages(chatId!, (initialMessages) => {
          resolve(initialMessages);
        });
      }),
    enabled: !!chatId,
    staleTime: Infinity,
  });

  return {
    messages: messages || [],
    loading: isLoading,
  };
};

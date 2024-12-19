import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import formatMessageTime from "@/lib/formatMessageTime";
import { useMessages } from "@/pages/chat/useMessages";
import { useStore } from "@/store/useStore";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";

const ChatMessages = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const selectedChatId = useStore((state) => state.selectedChatId);
  const currentUser = useStore((state) => state.currentUser);
  const { messages, loading } = useMessages(selectedChatId);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // * Make scroll to the end
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedChatId) {
    return (
      <div className="flex items-center justify-center flex-1">
        <span className="text-muted">
          Select a chat to start your conversation
        </span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <BeatLoader color={"hsl(var(--secondary))"} />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">
        <span className="text-muted">There are no messages yet</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-8 p-5 overflow-y-auto">
      {messages.map((message) => {
        const isSender = message.senderId === currentUser?.uid;

        if (isSender) {
          return (
            <div key={message.id} className="self-end max-w-[50%]">
              <Card className="border-none">
                <CardContent className="p-3">
                  {message.type === "image" ? (
                    <img
                      src={message.content}
                      alt="shared"
                      className="w-full rounded-2xl"
                    />
                  ) : (
                    message.content
                  )}
                </CardContent>
              </Card>
              <span className="text-sm text-gray-300">
                {formatMessageTime(message?.timestamp)}
              </span>
            </div>
          );
        }

        return (
          <div
            key={message.id}
            className={`flex gap-3 max-w-[${
              message.type === "image" ? "70%" : "50%"
            }]`}
          >
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={
                  message.senderPhotoURL ||
                  "https://avatar.iran.liara.run/public"
                }
              />
              <AvatarFallback>{message.senderName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              {message.type === "image" ? (
                <img
                  src={message.content}
                  alt="shared"
                  className="w-full rounded-2xl"
                />
              ) : (
                <Card className="self-start border-none bg-card-secondary">
                  <CardContent className="p-3">{message.content}</CardContent>
                </Card>
              )}
              <span className="text-sm text-gray-300">
                {formatMessageTime(message.timestamp)}
              </span>
            </div>
          </div>
        );
      })}

      {/* Scroll to this point */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

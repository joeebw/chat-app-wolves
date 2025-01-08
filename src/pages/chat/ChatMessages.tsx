import ReceiverMessage from "@/pages/chat/ReceiverMessage";
import SenderMessage from "@/pages/chat/SenderMessage";
import { useMessages } from "@/pages/chat/useMessages";
import { useStore } from "@/store/useStore";
import { useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";

const ChatMessages = () => {
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
          return <SenderMessage message={message} key={message.id} />;
        }

        return <ReceiverMessage message={message} key={message.id} />;
      })}

      {/* Scroll to this point */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

import InputChat from "./InputChat";
import ChatMessages from "./ChatMessages";
import ChatUserInfo from "@/pages/chat/ChatUserInfo";

const ChatScreen = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat user info */}
      <ChatUserInfo />

      {/* Chat  */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat messages */}
        <ChatMessages />

        {/* Input chat */}
        <InputChat />
      </div>
    </div>
  );
};

export default ChatScreen;

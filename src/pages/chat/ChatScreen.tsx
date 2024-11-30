import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosInformationCircle } from "react-icons/io";
import InputChat from "./InputChat";
import ChatMessages from "./ChatMessages";

const ChatScreen = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat user info */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://avatar.iran.liara.run/public" />
            <AvatarFallback>Doe</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-medium">Maria Nelson</h4>
            <span className="text-gray-300">
              Greateful for every sunrise and sunset 🎈
            </span>
          </div>
        </div>

        <IoIosInformationCircle className="text-3xl cursor-not-allowed" />
      </div>

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

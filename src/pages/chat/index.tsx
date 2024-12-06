import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import ChatUserDetails from "./ChatUserDetails";
import { useStore } from "@/store/useStore";

const Chat = () => {
  const currentUser = useStore((state) => state.currentUser);

  console.log("currentUser: ", currentUser);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-[#3c4d5d9a] w-[80vw] h-[90vh] backdrop-blur-xl rounded-2xl shadow-xl grid grid-cols-4 overflow-hidden">
        <div className="min-h-full col-span-1">
          <Sidebar />
        </div>

        <div className="min-h-full col-span-2 border-x">
          <ChatScreen />
        </div>
        <div className="min-h-full col-span-1">
          <ChatUserDetails />
        </div>
      </div>
    </div>
  );
};

export default Chat;

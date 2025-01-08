import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import ChatUserDetails from "./ChatUserDetails";

const Chat = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-[#3c4d5d9a] w-[99vw] xl:w-[97vw] 2xl:w-[85vw] h-[90vh] backdrop-blur-xl rounded-2xl shadow-xl grid grid-cols-4 overflow-hidden">
        <div className="min-h-full col-span-1">
          <Sidebar />
        </div>

        <div className="min-h-full col-span-3 border-l xl:col-span-2 xl:border-x">
          <ChatScreen />
        </div>

        <div className="hidden min-h-full col-span-1 xl:block">
          <ChatUserDetails />
        </div>
      </div>
    </div>
  );
};

export default Chat;

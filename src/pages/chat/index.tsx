import Background from "@/assets/background-image.jpg";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import ChatUserDetails from "./ChatUserDetails";

const Chat = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
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

import "./background.css";
import Background from "@/assets/background-image.jpg";
import Sidebar from "./Sidebar";

const Chat = () => {
  return (
    <div
      className="flex items-center justify-center w-full min-h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="bg-[#3c4d5d9a] w-[80vw] h-[90vh] backdrop-blur-xl rounded-2xl shadow-xl grid grid-cols-4">
        <div className="h-full col-span-1">
          <Sidebar />
        </div>
        <div className="h-full col-span-2 bg-red-800"></div>
        <div className="h-full col-span-1 bg-red-700"> </div>
      </div>
    </div>
  );
};

export default Chat;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
import InputSearchUser from "./InputSearchUser";
import UserListChats from "./UserListChats";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://avatar.iran.liara.run/public" />
            <AvatarFallback>Doe</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">John Smith</h3>
        </div>
        <Button size={"icon"} variant="ghost">
          <SlOptions />
        </Button>
      </div>

      {/* Search User and user to char */}
      <div className="flex items-center justify-between px-6 mt-8 gap-7">
        <InputSearchUser />

        <Button size="icon">
          <FaPlus />
        </Button>
      </div>

      {/* Chat lists */}
      <div className="flex-1 min-h-0 overflow-y-auto mt-9">
        <UserListChats />
      </div>
    </div>
  );
};

export default Sidebar;

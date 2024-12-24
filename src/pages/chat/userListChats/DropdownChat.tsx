import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/store/useStore";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const DropdownChat = () => {
  const setOpenModalConfirmRemoveChat = useStore(
    (state) => state.setOpenModalConfirmRemoveChat
  );

  const handleOpenModalConfirmRemoveChat = () => {
    setOpenModalConfirmRemoveChat(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2.5 rounded-lg hover:bg-gray-700">
          <PiDotsThreeOutlineVerticalFill className="text-base" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="text-red-600"
          onClick={handleOpenModalConfirmRemoveChat}
        >
          Delete Chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownChat;

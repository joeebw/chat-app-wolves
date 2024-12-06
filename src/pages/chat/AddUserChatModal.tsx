import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa6";

const AddUserChatModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon">
          <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Add new user
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-3">
          <Input
            className="bg-secondary text-primary"
            placeholder="Type new user"
            type="text"
          />
          <Button variant="secondary">Search</Button>
        </div>

        {/* Show users to add */}
        <div className="flex flex-col gap-5 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://avatar.iran.liara.run/public" />
                <AvatarFallback>Doe</AvatarFallback>
              </Avatar>
              <span className="font-medium">Ashley Branson</span>
            </div>

            <Button variant="secondary">Add User</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserChatModal;

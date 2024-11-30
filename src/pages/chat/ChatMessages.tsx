import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const ChatMessages = () => {
  return (
    <div className="flex flex-col flex-1 gap-8 p-5 overflow-y-auto">
      {/* Message Sender */}
      <div className="self-end max-w-[50%]">
        <Card className="border-none">
          <CardContent className="p-3">
            Hello Bitches como estan papasitos!
          </CardContent>
        </Card>
        <span className="text-sm text-gray-300">24 minutes ago</span>
      </div>

      {/* Message receiver */}
      <div className="flex gap-3 max-w-[50%]">
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>Doe</AvatarFallback>
        </Avatar>
        <div>
          <Card className="self-start border-none bg-card-secondary">
            <CardContent className="p-3">Tu perro loco!</CardContent>
          </Card>
          <span className="text-sm text-gray-300">24 minutes ago</span>
        </div>
      </div>

      {/* Image Message receiver*/}
      <div className="flex gap-3 max-w-[70%]">
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>Doe</AvatarFallback>
        </Avatar>
        <div>
          <img
            src="https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="landscape"
            className="w-full rounded-2xl"
          />
          <span className="text-sm text-gray-300">24 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;

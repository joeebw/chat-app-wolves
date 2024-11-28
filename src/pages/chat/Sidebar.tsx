import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  return (
    <div>
      {/* Header Info */}
      <div className="flex justify-between">
        <div>
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public" />
            <AvatarFallback>Doe</AvatarFallback>
          </Avatar>
          <h3>John Smith</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

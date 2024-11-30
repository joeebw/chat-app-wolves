import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const InputSearchUser = () => {
  return (
    <div className="relative flex-1">
      <Input className="pl-10 bg-input-background" placeholder="Search" />
      <IoSearch className="absolute text-xl top-2 left-2" />
    </div>
  );
};

export default InputSearchUser;

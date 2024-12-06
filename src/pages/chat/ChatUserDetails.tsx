import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdDownload } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { signOut } from "@/lib/firebase";

const ChatUserDetails = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col h-full">
      {/* User details */}
      <div className="flex flex-col items-center gap-3 p-8 border-b shrink-0">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>Doe</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-medium">John Smith</h3>
        <p className="line-clamp-2">This is awesome I want to be the best.</p>
      </div>

      {/* Accordion section */}
      <div className="flex flex-col flex-1 min-h-0 p-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between py-2 text-base font-medium transition-colors shrink-0 hover:text-gray-200"
        >
          Shared Photos
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 1 }}
              className="flex-1 min-h-0 overflow-hidden"
            >
              <div className="h-full pr-4 overflow-y-auto">
                <div className="flex flex-col gap-5 py-4">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="landscape"
                          className="object-cover w-10 h-10 rounded-sm"
                        />
                        <span className="text-sm">Landscape.png</span>
                      </div>
                      <Button size="icon" className="rounded-full">
                        <IoMdDownload className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer buttons */}
      <div className="flex flex-col gap-5 p-6 shrink-0">
        <Button variant="destructive">Block User</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};
export default ChatUserDetails;

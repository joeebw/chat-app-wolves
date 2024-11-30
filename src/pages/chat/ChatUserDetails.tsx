import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ChatUserDetails = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center gap-3 p-8 border-b">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>Doe</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-medium">John Smith</h3>
        <p className="line-clamp-2">This is awesome I want to be the best.</p>
      </div>

      <div className="p-6">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-base">
              Shared Photos
            </AccordionTrigger>
            <AccordionContent>gg</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ChatUserDetails;

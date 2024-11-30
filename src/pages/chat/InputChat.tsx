import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";

const InputChat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onEmojiClick = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        buttonRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-4 p-5 border-t">
      <Button variant="ghost" size="icon" className="p-5">
        <FaImage className="transform scale-[1.3]" />
      </Button>
      <Input
        className="!text-base bg-input-background h-12"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="p-5"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <BsEmojiSmile className="transform scale-[1.3]" />
      </Button>
      {showEmojiPicker && (
        <div ref={pickerRef} className="absolute right-0 mb-2 bottom-20">
          <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
        </div>
      )}

      <Button variant="secondary">Send</Button>
    </div>
  );
};
export default InputChat;

import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { sendMessage, uploadImageMessage } from "@/lib/firebase";
import { SendMessageParams } from "@/ts/types";
import { useStore } from "@/store/useStore";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const InputChat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedChatId = useStore((state) => state.selectedChatId);
  const currentUser = useStore((state) => state.currentUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message: SendMessageParams = {
      chatId: selectedChatId!,
      content: inputValue,
      senderId: currentUser!.uid,
      type: "text",
    };
    await sendMessage(message);
    setInputValue("");
  };

  const handleUploadImage = async (image: File) => {
    if (!image) return;
    try {
      setIsUploadingImage(true);
      await uploadImageMessage(image, selectedChatId!, currentUser!.uid);
      queryClient.invalidateQueries({
        queryKey: ["sharedPhotos", selectedChatId!],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploadingImage(false);
    }
  };

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
    <form
      className="relative flex items-center gap-4 p-5 border-t"
      onSubmit={handleSendMessage}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          handleUploadImage(file);
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        className="p-5"
        type="button"
        disabled={isUploadingImage}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploadingImage ? (
          <Loader2 className="animate-spin" />
        ) : (
          <FaImage className="transform scale-[1.3]" />
        )}
      </Button>

      <Input
        className="!text-base bg-input-background h-12"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />
      <Button
        type="button"
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

      <Button variant="secondary" type="submit">
        Send
      </Button>
    </form>
  );
};
export default InputChat;

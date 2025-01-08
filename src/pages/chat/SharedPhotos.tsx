import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdDownload } from "react-icons/io";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useQuery } from "@tanstack/react-query";
import { getSharedPhotos } from "@/lib/firebase";
import { SharedPhoto } from "@/ts/types";
import { downloadImage } from "@/lib/utils";

const SharedPhotos = () => {
  const [isOpen, setIsOpen] = useState(true);
  const selectedChatId = useStore((state) => state.selectedChatId);
  const { data: photos } = useQuery({
    queryKey: ["sharedPhotos", selectedChatId],
    queryFn: () => getSharedPhotos(selectedChatId!),
    enabled: !!selectedChatId,
  });

  const handleDownload = (photo: SharedPhoto) => {
    downloadImage(photo.imageUrl, photo.fileName);
  };

  return (
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
                {photos?.map((photo) => (
                  <div
                    key={photo.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={photo.imageUrl}
                        alt="image file"
                        className="object-cover w-10 h-10 rounded-sm"
                      />
                      <span className="text-sm truncate">{photo.fileName}</span>
                    </div>
                    <Button
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleDownload(photo)}
                    >
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
  );
};

export default SharedPhotos;

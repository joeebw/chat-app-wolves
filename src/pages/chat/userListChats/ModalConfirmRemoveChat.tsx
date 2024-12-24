import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteChat } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { useQueryClient } from "@tanstack/react-query";

const ModalConfirmRemoveChat = () => {
  const openModalConfirmRemoveChat = useStore(
    (state) => state.openModalConfirmRemoveChat
  );
  const setOpenModalConfirmRemoveChat = useStore(
    (state) => state.setOpenModalConfirmRemoveChat
  );
  const selectedChatId = useStore((state) => state.selectedChatId);
  const selectedUserId = useStore((state) => state.selectedUserId);
  const currentUser = useStore((state) => state.currentUser);
  const setSelectedChatId = useStore((state) => state.setSelectedChatId);
  const setSelectedUserId = useStore((state) => state.setSelectedUserId);
  const queryClient = useQueryClient();

  const handleCloseDialog = (bool: boolean) => {
    setOpenModalConfirmRemoveChat(bool);
  };

  const handleDeleteChat = async () => {
    if (!selectedChatId || !currentUser?.uid || !selectedUserId) return;

    try {
      await deleteChat(selectedChatId, [currentUser.uid, selectedUserId]);
      queryClient.invalidateQueries({ queryKey: ["currentUser Chats"] });
      setSelectedChatId(null);
      setSelectedUserId(null);
      setOpenModalConfirmRemoveChat(false);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <AlertDialog
      open={openModalConfirmRemoveChat}
      onOpenChange={handleCloseDialog}
    >
      <AlertDialogContent className="border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Chat</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-100">
            Are you sure you want to delete this chat? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpenModalConfirmRemoveChat(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteChat}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirmRemoveChat;

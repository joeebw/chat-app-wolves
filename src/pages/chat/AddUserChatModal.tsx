import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa6";
import { useStore } from "@/store/useStore";
import { createChat, fetchExistingChats, searchUsers } from "@/lib/firebase";
import { User } from "@/ts/types";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const AddUserChatModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAddUser, setLoadingAddUser] = useState(false);
  const [error, setError] = useState("");
  const [existingChats, setExistingChats] = useState<string[]>([]);
  const currentUser = useStore((state) => state.currentUser);
  const queryClient = useQueryClient();

  const resetStates = () => {
    setSearchTerm("");
    setUsers([]);
    setError("");
    setLoading(false);
    setUsers(null);
    setLoadingAddUser(false);
  };

  const handleCloseModal = (isOpen: boolean) => {
    if (isOpen) {
      resetStates();
    }
  };

  const handleSearch = async () => {
    if (searchTerm.length < 3) {
      setError("Please enter at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      const results = await searchUsers(searchTerm.toLowerCase());
      // Filtrar el usuario actual de los resultados
      const filteredUsers = results.filter(
        (user) => user.uid !== currentUser?.uid
      );
      setUsers(filteredUsers);
      setError("");
    } catch (error) {
      setError("Error searching for users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userToAdd: User) => {
    if (!currentUser) return;

    setLoadingAddUser(true);

    try {
      await createChat([currentUser.uid, userToAdd.uid]);

      setExistingChats((prev) => [...prev, userToAdd.uid]);
      setSearchTerm("");
      setError("");
      queryClient.invalidateQueries({ queryKey: ["currentUser Chats"] });
    } catch (err) {
      setError("Error adding user");
      console.error(err);
    } finally {
      setLoadingAddUser(false);
    }
  };

  useEffect(() => {
    const getExistingChats = async () => {
      const existingChats = await fetchExistingChats(currentUser!.uid);
      setExistingChats(existingChats);
    };
    getExistingChats();
  }, [currentUser]);

  return (
    <Dialog onOpenChange={(open) => handleCloseModal(open)}>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button variant="secondary" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        {/* Show users to add */}
        <div className="flex flex-col gap-5 mt-8">
          {users?.map((user) => (
            <div key={user.uid} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.photoURL} />
                  <AvatarFallback>Doe</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.displayName}</span>
                  {user.status && (
                    <span className="text-sm text-gray-500">{user.status}</span>
                  )}
                </div>
              </div>
              {existingChats.includes(user.uid) ? (
                <Button variant="secondary" disabled>
                  Already Added
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => handleAddUser(user)}
                  disabled={loadingAddUser}
                >
                  {loadingAddUser && <Loader2 className="animate-spin" />}
                  Add User
                </Button>
              )}
            </div>
          ))}

          {users && users.length === 0 && !loading && !error && (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserChatModal;

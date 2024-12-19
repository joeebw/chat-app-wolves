import { CurrentUser } from "@/ts/types";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  isSignIn: boolean;
  currentUser: null | CurrentUser;
  selectedChatId: null | string;
  selectedUserId: null | string;
  setIsSignIn: () => void;
  setCurrentUser: (user: CurrentUser | null) => void;
  setSelectedChatId: (chadtId: null | string) => void;
  setSelectedUserId: (userId: null | string) => void;

  resetStore: () => void;
};

const INITIAL_STORE_STATE = {
  isSignIn: true,
  currentUser: null,
  selectedChatId: null,
  selectedUserId: null,
};

const createAuthSlice: StateCreator<Store> = (set) => ({
  ...INITIAL_STORE_STATE,
  setIsSignIn: () => set((state) => ({ isSignIn: !state.isSignIn })),
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  resetStore: () => set(INITIAL_STORE_STATE),
});

export const useStore = create<Store>()(
  persist(
    (...arg) => ({
      ...createAuthSlice(...arg),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);

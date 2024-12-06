import { CurrentUser } from "@/ts/types";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  isSignIn: boolean;
  currentUser: null | CurrentUser;
  setIsSignIn: () => void;
  setCurrentUser: (user: CurrentUser | null) => void;
  resetStore: () => void;
};

const INITIAL_STORE_STATE = {
  isSignIn: true,
  currentUser: null,
};

const createAuthSlice: StateCreator<Store> = (set) => ({
  ...INITIAL_STORE_STATE,
  setIsSignIn: () => set((state) => ({ isSignIn: !state.isSignIn })),
  setCurrentUser: (user) => set({ currentUser: user }),
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

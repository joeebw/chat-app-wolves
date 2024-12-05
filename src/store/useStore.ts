import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  isSignIn: boolean;
  setIsSignIn: () => void;
};

export const createAuthSlice: StateCreator<Store> = (set) => ({
  isSignIn: false,
  setIsSignIn: () => set((state) => ({ isSignIn: !state.isSignIn })),
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

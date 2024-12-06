import { auth } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { CurrentUser } from "@/ts/types";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserFormatted: CurrentUser = {
          uid: user.uid,
          displayName: user.displayName as string,
          photoUrl: user.photoURL as string,
        };
        setCurrentUser(currentUserFormatted);
      } else {
        setCurrentUser(null);
      }

      if (isLoading) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoading };
};

export default useAuth;

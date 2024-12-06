import { useStore } from "@/store/useStore";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactNode;
  redirectTo?: string;
}

const RedirectIfAuthenticated = ({ children, redirectTo = "/chat" }: Props) => {
  const isAuthenticated = useStore((state) => state.currentUser);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;

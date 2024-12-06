import { useStore } from "@/store/useStore";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useStore((state) => state.currentUser);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

import { Route, Routes } from "react-router";
import Chat from "./pages/chat";
import LoginPage from "@/pages/login";
import useAuth from "@/hooks/useAuth";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFoundPage from "@/components/NotFoundPage";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

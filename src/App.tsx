import { Route, Routes } from "react-router";
import Chat from "./pages/chat";
import LoginPage from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router";
import Chat from "./pages/chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Login page</div>} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
}

export default App;

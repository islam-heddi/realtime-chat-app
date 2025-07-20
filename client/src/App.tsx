import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dasboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import ChatPageFr from "./pages/ChatPageFr";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/chat/:friendId" element={<ChatPage />} />
          <Route path="/chat/" element={<ChatPageFr />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;

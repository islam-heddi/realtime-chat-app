import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dasboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import ChatPageFr from "./pages/ChatPageFr";
import FriendRequestPage from "./pages/FriendsRequests";
import { SocketProvider } from "./context/SocketContext";
import { Toaster } from "sonner";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/chat/:friendId" element={<ChatPage />} />
          <Route path="/chat/" element={<ChatPageFr />} />
          <Route path="/friendRequest/" element={<FriendRequestPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </SocketProvider>
  );
}

export default App;

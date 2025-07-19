import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dasboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      {/* Wrapping the application with BrowserRouter to enable routing */}
      {/* The Routes component defines the different routes in the application */}
      {/* Each Route component specifies a path and the component to render for that path */}
      {/* Home component is rendered at the root path */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/chat/:friendId" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
      {/* Dasboard component is rendered at the /dashboard path */}
    </SocketProvider>
  );
}

export default App;

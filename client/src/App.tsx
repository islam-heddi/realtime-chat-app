import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dasboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/chat/:friendId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

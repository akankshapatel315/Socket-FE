import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat } from "./Components/Chat/Chat";
import Login from "./Components/user/Login";
import { BsWechat } from "react-icons/bs";
function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand mx-4">
        <BsWechat size={35} color="#33938b"/>Chat
        </a>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import Login from "./components/Login";
import Linkroom from "./components/Linkroom";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Room from "./components/Room";

function App() {
  return (
    <>
      <Linkroom />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </>
  );
}

export default App;

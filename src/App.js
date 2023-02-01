import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Linkroom from "./components/Linkroom";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Linkroom />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

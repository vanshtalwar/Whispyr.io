import {Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <div>
     <Toaster position="top-center" reverseOrder={false} />
    <Routes>
    {/* Default route */}
    <Route path="/" element={<Navigate to="/signup" />} />
    
    {/* Auth routes */}
    <Route path="/home" element={<Home/>} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    
    </Routes>
    </div>
  );
}

export default App;

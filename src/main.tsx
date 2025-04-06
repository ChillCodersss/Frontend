import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Recruitment from "./pages/Recruitment";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/recruitment" element={<Recruitment></Recruitment>}/>
        <Route path="/Signup" element={<Signup></Signup>} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

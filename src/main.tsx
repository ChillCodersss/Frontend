import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Signup from "./pages/SignUp";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup></Signup>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

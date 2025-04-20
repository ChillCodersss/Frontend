import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Recruitment from "./pages/Recruitment";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import FPGetEmail from "./pages/ForgotPassword/FPGetEmail";
import FPGetVerificationCode from "./pages/ForgotPassword/FPGetVerificationCode";
import FPGetNewPassword from "./pages/ForgotPassword/FPGetNewPassword";
import CounselorProfile from "./pages/CounselorProfile";
import Sidebar from "./components/Sidebar/Sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/recruitment" element={<Recruitment></Recruitment>}/>
        <Route path="/Signup" element={<Signup></Signup>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/forgot-password" element={<FPGetEmail />} />
        <Route path="/verification-code" element={<FPGetVerificationCode />} />
        <Route path="/set-new-password" element={<FPGetNewPassword />} />
        <Route path="/CounselorProfile" element={<CounselorProfile></CounselorProfile>} />
        <Route path="/sidebar" element={<Sidebar/>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);

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
import OurCounselor from "./pages/OurCounselor";
import CounselorDisplay from "./pages/CounselorDisplay";
import Sidebar from "./components/Sidebar/Sidebar";
import Landing from "./pages/Landing";
import StudentDisplayPopup from "./components/StudentDisplay/StudentDisplay";
import StudentList from "./pages/CounselorRequests";
import Payments from "./pages/Payments/Payments";
import ChangePassword from "./components/Header/ChangePassword";

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/recruitment" element={<Recruitment />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<FPGetEmail />} />
      <Route path="/verification-code" element={<FPGetVerificationCode />} />
      <Route path="/set-new-password" element={<FPGetNewPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/CounselorProfile" element={<CounselorProfile />} />
      <Route path="/OurCounselor" element={<OurCounselor />} />
      <Route path="/CounselorDisplay" element={<CounselorDisplay />} />
      <Route
        path="/OurCounselor/CounselorPage/:id"
        element={<CounselorDisplay />}
      />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/Landing" element={<Landing></Landing>} />
      <Route path="/StudentDisplayPopup" element={<StudentDisplayPopup />} />
      <Route path="/Landing" element={<Landing></Landing>} />
      <Route path="/Payments" element={<Payments />} />
      <Route path="/dashboard" element={<StudentList></StudentList>} />
    </Routes>
  </BrowserRouter>
  //</StrictMode>
);

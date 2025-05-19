// import { StrictMode } from "react";
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
// import Sidebar from "./components/Sidebar/Sidebar";
import Landing from "./pages/Landing/Landing";
import ScrollToTop from "./components/ScrollToTop";
// import StudentDisplayPopup from "./components/StudentDisplay/StudentDisplay";
import StudentList from "./pages/CounselorRequests";
import Payments from "./pages/Payments/Payments";
import ChangePassword from "./components/Header/ChangePassword";
import StudentProfile from "./pages/StudentProfile";
import Students from "./pages/CounselorStudents";
import StudentsCounselors from "./pages/StudentsCounselors";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/recruitment" element={<Recruitment />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<FPGetEmail />} />
      <Route path="/verification-code" element={<FPGetVerificationCode />} />
      <Route path="/set-new-password" element={<FPGetNewPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/CounselorProfile" element={<CounselorProfile />} />
      <Route path="/StudentProfile" element={<StudentProfile />} />
      <Route path="/OurCounselor" element={<OurCounselor />} />
      <Route path="/CounselorDisplay" element={<CounselorDisplay />} />
      <Route path="/OurCounselor/CounselorPage/:id" element={<CounselorDisplay />} />
      <Route path="/" element={<Landing />} />
      {/* <Route path="/StudentDisplayPopup" element={<StudentDisplayPopup studentId={""} />} /> */}
      
      {/* Dashboard route with nested routes for both roles */}
      <Route
        path="/dashboard"
      >
        {/* Counselor-specific routes */}
        <Route path="counselorrequests" element={<StudentList />} />
        <Route path="students" element={<Students />} />
        <Route path="chat-student" element={<div>Chat with Student</div>} />
        <Route path="counseling-files" element={<div>Counseling Stats</div>} />
        <Route path="incoms" element={<div>Counseling Stats</div>} />

        {/* Student-specific routes */}
        <Route path="studentscounselors" element={<StudentsCounselors />} />
        <Route path="chat-counselor" element={<div>Chat with Counselor</div>} />
        <Route path="payments" element={<Payments />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
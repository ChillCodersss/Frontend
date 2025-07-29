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
// import StudentList from "./pages/CounselorRequests";
import Payments from "./pages/Payments/Payments";
import ChangePassword from "./components/Header/ChangePassword";
import StudentProfile from "./pages/StudentProfile";
import Students from "./pages/CounselorStudents";
import StudentsCounselors from "./pages/StudentsCounselors";
import CounselorRequests from "./pages/Counselorrequests/CounselorRequests";
import HSLayout from "./layouts/HSLayout";
import HWLayout from "./layouts/HWLayout";
import HLayout from "./layouts/HLayout";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactPage from "./pages/Chat/ContactPage";
import ChatPage from "./pages/Chat/ChatPage";
import CounselorPayments from "./pages/CounselorPayments/CounselorPayments";
import Services from "./pages/Services/Services";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { ChatServiceProvider } from "./contexts/ChatServiceContext";
import { ContactsProvider } from "./contexts/ContactsContext";


createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<HLayout />}>
          <Route path="/forgot-password" element={<FPGetEmail />} />
          <Route
            path="/verification-code"
            element={<FPGetVerificationCode />}
          />
          <Route path="/set-new-password" element={<FPGetNewPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/CounselorProfile" element={<CounselorProfile />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />

          <Route path="/CounselorDisplay" element={<CounselorDisplay />} />
          <Route
            path="/OurCounselor/CounselorPage/:id"
            element={<CounselorDisplay />}
          />
        </Route>
        <Route element={<HWLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/OurCounselor" element={<OurCounselor />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
        </Route>
        {/* Dashboard route with nested routes for both roles */}
        <Route path="/dashboard" element={<HSLayout />}>
          <Route path="counselorrequests" element={<CounselorRequests />} />
          <Route path="students" element={<Students />} />
          <Route
            path="counseling-files"
            element={<div>Counseling Stats</div>}
          />
          <Route path="incoms" element={<CounselorPayments />} />

          {/* Student-specific routes */}
          <Route path="studentscounselors" element={<StudentsCounselors />} />
          <Route path="payments" element={<Payments />} />
        </Route>
        {/* Provider-wrapped dashboard routes for contacts and chat */}
        <Route
          path="/dashboard"
          element={
            <ChatServiceProvider>
              <ContactsProvider>
                <HSLayout />
              </ContactsProvider>
            </ChatServiceProvider>
          }
        >
          <Route path="contacts" element={<ContactPage />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ChatServiceProvider>
              <ContactsProvider>
                <HLayout />
              </ContactsProvider>
            </ChatServiceProvider>
          }
        >
          <Route path="counselor-chat/:contactId" element={<ChatPage />} />
          <Route path="student-chat/:contactId" element={<ChatPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  </>
);

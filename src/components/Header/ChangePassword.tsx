import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BackgroundStyle.css";

import { changePassword } from "@/services/changePassword";
import { getToken } from "@/services/auth";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmedNewPassword) {
      toast.error("لطفا رمز عبور جدید را وارد کنید");
      return;
    }
    if (formData.newPassword !== formData.confirmedNewPassword) {
      toast.error("رمز عبورهای وارد شده مطابقت ندارند");
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error("رمز عبور باید حداقل 8 کاراکتر باشد");
      return;
    }
    if (!/[A-Z]/.test(formData.newPassword)) {
      toast.error("رمز عبور باید حداقل یک حرف بزرگ داشته باشد");
      return;
    }
    if (!/[a-z]/.test(formData.newPassword)) {
      toast.error("رمز عبور باید حداقل یک حرف کوچک داشته باشد");
      return;
    }
    if (!/[0-9]/.test(formData.newPassword)) {
      toast.error("رمز عبور باید حداقل یک عدد داشته باشد");
      return;
    }
    if (!/[!@#$%^&*]/.test(formData.newPassword)) {
      toast.error("رمز عبور باید حداقل یک کاراکتر خاص داشته باشد");
      return;
    }
    try {
      const token = getToken();
      if (!token) {
        toast.error("لطفا وارد حساب کاربری خود شوید");
        return;
      }
      const data = await changePassword(
        token,
        formData.oldPassword,
        formData.newPassword,
        formData.confirmedNewPassword
      );
      if (data.isFailure) {
        toast.error(data.message || "خطا در ارتباط با سرور");
        return;
      }
      if (data.isSuccess) {
        toast.success("رمز عبور با موفقیت تغییر کرد");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Server error:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  useEffect(() => {
    // Prevent scrolling when this component is mounted
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          width: "220px",
          padding: "5px 10px",
          gap: "2px",
          fontSize: "0.9rem",
          textAlign: "right",
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              flexDirection: "column",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
              borderRadius: "12px",
              padding: { xs: "40px", sm: "30px 60px" },
              margin: "0px 20px",
              gap: "14px",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "black",
                textAlign: "center",
                direction: "rtl",
              }}
            >
              رمز عبور جدید خود را وارد کنید
            </p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                margin: "10px 0px",
              }}
            >
              <InputBox
                label="رمز عبور فعلی"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="••••••••"
                fullWidth={true}
                width={"280px"}
                direction="ltr"
                onChange={handleInputChange}
                value={formData.oldPassword}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      sx={{ marginLeft: "-10px" }}
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <InputBox
                label="رمز عبور جدید"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                fullWidth={true}
                width="280px"
                direction="ltr"
                onChange={handleInputChange}
                value={formData.newPassword}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      sx={{ marginLeft: "-10px" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <InputBox
                label="تایید رمز عبور جدید"
                name="confirmedNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                fullWidth={true}
                width="280px"
                direction="ltr"
                onChange={handleInputChange}
                value={formData.confirmedNewPassword}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      sx={{ marginLeft: "-10px" }}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
            <ConfirmButton
              type="submit"
              name="تغییر رمز عبور"
              onClick={() => {}}
              width={"180px"}
            />
          </Box>
        </form>
      </Box>
      <div
        className="area"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <ul className="circles">
          {[...Array(10)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChangePassword;

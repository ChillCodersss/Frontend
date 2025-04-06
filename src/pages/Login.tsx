import React, { useState, useEffect } from "react";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Login.css';
import "@/index.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showImage, setShowImage] = useState(window.innerWidth >= 600);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowImage(window.innerWidth >= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:8080/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok || data.IsFailure) {
        // نمایش ارورهای ولیدیشن (اگر وجود داشته باشن)
        if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { message: string }) => {
            toast.error(err.message, {
              position: "bottom-right",
              autoClose: 5000,
              rtl: true,
            });
          });
        }
  
        // اگر errors نبود، ولی فیلد Error وجود داشت
        else if (data.message) {
          const messageFromServer = data.message.split("|")[0]; // فقط پیام اول
          toast.error(messageFromServer, {
            position: "bottom-right",
            autoClose: 5000,
            rtl: true,
          });
        }
  
        setIsSubmitting(false);
        return;
      }
  
      // موفقیت
      toast.success(data?.message || "با موفقیت وارد شدید", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
  
      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error("خطا در ارتباط با سرور", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
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
      />
      
      <div
        className="area"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      >
        <ul className="circles">
          {[...Array(10)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div style={{ 
          display: "flex",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          width:"900px",
          borderRadius: "12px"
        }}>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "450px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                width: "100%",
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: showImage ? "12px 0 0 12px" : "12px",
                padding: {xs: "30px" , sm:"30px 60px"},
                boxSizing: "border-box",
                height: "500px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" , marginTop: "-10px" }}>
                <img
                  src="./src/assets/logo.jpg"
                  alt="Logo"
                  style={{ width: "120px", height: "120px", borderRadius: "50%" , marginRight: "-7px"}}
                />
              </Box>

              <h1 style={{ textAlign: "center", color: "black" , marginTop: "-35px" }}>ورود</h1>

              <InputBox
                label="ایمیل"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="text"
                placeholder="example@gmail.com"
                startAdornment={
                  <InputAdornment position="start">
                    <Email sx={{ marginLeft: "-2px", marginTop: "2px" }} />
                  </InputAdornment>
                }
              />

              <InputBox
                label="رمز عبور"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton sx={{ marginLeft: "-10px" }} onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-end",
                marginBottom: "10px"
              }}>
                <Link
                  href="/forgot-password"
                  sx={{
                    textDecoration: "none",
                    marginRight: "7px",
                    color: "gray",
                    fontSize: "0.9rem",
                    "&:hover": { color: "rgb(3, 37, 107)" },
                  }}
                >
                  فراموشی رمز عبور
                </Link>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ConfirmButton name={isSubmitting ? "...در حال ورود" : "ورود"} type="submit" disabled={isSubmitting} />
              </Box>

              <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                marginTop: "1px",
                alignItems: "center"
              }}>
                <Link
                  href="/signup"
                  sx={{
                    textDecorationColor: "gray",
                    color: "gray",
                    fontSize: "0.9rem",
                    "&:hover": { color: "rgb(3, 37, 107)" },
                  }}
                >
                  ثبت نام
                </Link>
                <span style={{ fontSize: "0.9rem", marginLeft: "4px", color: "black" }}>
                  اکانت نداری؟
                </span>
              </Box>
            </Box>
          </form>

          {showImage && (
            <Box
              sx={{
                width: "450px",
                height: "500px",
                backgroundColor: " #BFD9D9",
                borderLeft: {
                  xs: "none",
                  sm: "3px solid #BFD9D9",
                },
                borderRadius: "0 12px 12px 0",
                overflow: "hidden",
              }}
            >
              <img
                src="./src/assets/login.png"
                alt="Side Image"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
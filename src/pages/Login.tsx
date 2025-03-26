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

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showImage, setShowImage] = useState(window.innerWidth >= 600);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      toast.error("لطفا ایمیل و رمز عبور را وارد کنید", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        rtl: true,
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("لطفا یک ایمیل معتبر وارد کنید", {
        position: "bottom-right",
        rtl: true,
      });
      return;
    }

    // Simulate login API call
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.password.length < 8) {
            reject("رمز عبور باید حداقل 8 کاراکتر باشد");
          } else if (formData.email === "test@example.com" && formData.password === "password") {
            resolve("success");
          } else {
            reject("ایمیل یا رمز عبور اشتباه است");
          }
        }, 1500);
      }),
      {
        pending: 'در حال بررسی اطلاعات...',
        success: {
          render() {
            return 'ورود با موفقیت انجام شد!';
          },
        },
        error: {
          render({ data }: any) {
            return data;
          },
        },
      }
    );
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
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "450px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: showImage ? "12px 0 0 12px" : "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
              padding: {xs: "30px" , sm:"30px 60px"},
              boxSizing: "border-box",
              height: "500px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <img
                src="./src/assets/react.svg"
                alt="Logo"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
            </Box>

            <h1 style={{ textAlign: "center", color: "black" }}>ورود</h1>

            <InputBox
              label="ایمیل"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="example@gmail.com"
              startAdornment={
                <InputAdornment position="start">
                  <Email sx={{ marginLeft: "-2px", marginTop: "5px" }} />
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

            {/* لینک فراموشی رمز عبور زیر باکس رمز عبور */}
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
              <ConfirmButton name="ورود" type="submit" />
            </Box>

                      <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            marginTop: "1px",
            alignItems: "center" // برای تراز عمودی بهتر
          }}>
                        <Link
              href="/register"
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
            backgroundColor: "#BFD9D9",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.4)", // حذف سایه از چپ
            borderRadius: "0 12px 12px 0",
            //borderLeft: "3px solid #BFD9D9",
            overflow: "hidden",
          }}
          >
            <img
              src="./src/assets/login.webp"
              alt="Side Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default Login;
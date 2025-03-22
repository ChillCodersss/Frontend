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
import './Login.css';

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

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
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
        <form style={{ width: "100%", maxWidth: "400px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: showImage ? "12px 0 0 12px" : "12px",
              padding: "20px",
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

            <h1 style={{ textAlign: "center", color: "black" }}>!خوش برگشتی</h1>

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
              placeholder="**********"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton sx={{ marginLeft: "-10px" }} onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <ConfirmButton name="ورود" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
              <Link
                href="/forgot-password"
                sx={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "0.9rem",
                  "&:hover": { color: "rgb(183, 28, 124)" },
                }}
              >
                فراموشی رمز عبور
              </Link>

              <Link
                href="www.google.com"
                sx={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "0.9rem",
                  "&:hover": { color: "rgb(47, 7, 61)" },
                }}
              >
                اکانت ندارم
              </Link>
            </Box>
          </Box>
        </form>

        {showImage && (
          <Box
            sx={{
              width: "400px",
              height: "500px",
              backgroundColor: " #BFD9D9",
              borderRadius: "0 12px 12px 0",
              overflow: "hidden",
            }}
          >
            <img
              src="./src/assets/goodboy.jfif"
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

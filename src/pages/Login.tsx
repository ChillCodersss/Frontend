import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link"; // برای ایجاد لینک
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      {/* پس‌زمینه کلی */}
      <div className="area" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      {/* محتوای اصلی */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative", // برای قرار دادن محتوا در لایه بالاتر
      }}>
        {/* فرم در سمت چپ */}
        <form style={{ width: "100%", maxWidth: "400px"}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              width: "100%",
              backgroundColor: "rgb(7, 40, 97)",
              borderRadius: "12px 0 0 12px", // گوشه‌های گرد برای سمت چپ
              padding: "20px",
              boxSizing: "border-box",
              height: "500px", // ارتفاع فرم برابر با عکس
            }}
          >
            {/* لوگو */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <img
                src="./src/assets/react.svg" // مسیر لوگوی شما
                alt="Logo"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                }}
              />
            </Box>

            <h1 style={{ textAlign: "center", color: "white" }}>ورود</h1>

            {/* Email Field */}
            <InputBox
              label="ایمیل*"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="example@gmail.com"
            />

            {/* Password Field */}
            <InputBox
              label="رمز عبور*"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              placeholder="********"
            />

            {/* Submit Button */}
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
            >
              <ConfirmButton name="ورود" />
            </Box>

            {/* لینک زیر دکمه */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // فاصله بین دو لینک
                marginTop: "8px",
              }}
            >
              {/* لینک "فراموشی رمز عبور" در سمت چپ */}
              <Link
                href="/forgot-password" // لینک مورد نظر
                sx={{
                  textDecoration: "none", // حذف underline پیش‌فرض
                  color: "white", // رنگ متن
                  fontSize: "0.9rem", // اندازه فونت
                  "&:hover": {
                    color: "rgb(183, 28, 124)", // تغییر رنگ هنگام hover
                  },
                }}
              >
                فراموشی رمز عبور
              </Link>

              {/* لینک "اکانت ندارم" در سمت راست */}
              <Link
                href="www.google.com" // لینک مورد نظر
                sx={{
                  textDecoration: "none", // حذف underline پیش‌فرض
                  color: "white", // رنگ متن
                  fontSize: "0.9rem", // اندازه فونت
                  "&:hover": {
                    color: "rgb(47, 7, 61)", // تغییر رنگ هنگام hover
                  },
                }}
              >
                اکانت ندارم
              </Link>
            </Box>

          </Box>
        </form>

        {/* عکس در سمت راست */}
        <Box
          sx={{
            width: "400px", // عرض عکس
            height: "500px", // ارتفاع عکس
            backgroundColor: "#BFD9D9", // رنگ پس‌زمینه عکس (اختیاری)
            borderRadius: "0 12px 12px 0", // گوشه‌های گرد برای سمت راست
            overflow: "hidden", // برای جلوگیری از بیرون زدن عکس
          }}
        >
          <img
            src="./src/assets/shrek.jpg" // مسیر عکس شما
            alt="Side Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // برای پوشش کامل فضای باکس
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Login;
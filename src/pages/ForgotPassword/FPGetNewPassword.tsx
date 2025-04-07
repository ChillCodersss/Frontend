import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import "./BackgroundStyle.css";

const FPGetNewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmedNewPassword: "",
  });

  const location = useLocation();
  const email = location.state?.email || ""; // Retrieve email from state

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New password set for:", email);
  };

  return (
    <>
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
              width: "450px",
              padding: { xs: "40px", sm: "30px 60px" },
              margin: "20px",
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
                label="رمز عبور جدید"
                type="password"
                placeholder="••••••••"
                fullWidth={true}
                direction="ltr"
                onChange={handleInputChange}
                value={formData.newPassword}
              />
              <InputBox
                label="تکرار رمز عبور جدید"
                type="password"
                placeholder="••••••••"
                fullWidth={true}
                direction="ltr"
                onChange={handleInputChange}
                value={formData.confirmedNewPassword}
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
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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

export default FPGetNewPassword;

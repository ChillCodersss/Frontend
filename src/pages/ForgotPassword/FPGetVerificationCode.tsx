import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import "./BackgroundStyle.css";

const FPGetVerificationCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // Retrieve email from state

  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
  });
  const [timer, setTimer] = useState(10);
  // timer
  useEffect(() => {
    // Timer logic
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, verificationCode: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to FPGetNewPassword with email
    navigate("/set-new-password", { state: { email } });
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
              کد تایید ارسال شده به ایمیل {email} را وارد کنید
            </p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0px",
              }}
            >
              <InputBox
                label=""
                type="text"
                placeholder="XXXXXX"
                fullWidth={true}
                direction="ltr"
                onChange={handleCodeChange}
                value={formData.verificationCode}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <ConfirmButton
                type="submit"
                name="تایید"
                onClick={() => {}}
                width={"180px"}
              />

              {timer > 0 ? (
                <p style={{ fontSize: "0.9rem", color: "gray" }}>
                  ارسال مجدد کد تا {timer} ثانیه دیگر
                </p>
              ) : (
                <ConfirmButton
                  type="button"
                  name="ارسال مجدد کد"
                  onClick={() => setTimer(10)}
                  width={"180px"}
                >
                  ارسال مجدد کد
                </ConfirmButton>
              )}
            </Box>
            <Link
              href="/forgot-password"
              underline="hover"
              color="#000000"
              sx={{
                color: "gray",
                fontSize: "0.9rem",
                "&:hover": { color: "rgb(3, 37, 107)" },
                marginTop: "20px",
              }}
            >
              بازگشت
            </Link>
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

export default FPGetVerificationCode;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
// import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
// import SecondaryButton from "@/components/common/SecondaryButton";
import PinInput from "@/components/common/PinInputBox";
import "./BackgroundStyle.css";

const FPGetVerificationCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
  });
  const [timer, setTimer] = useState(10);
  const [pin, setPin] = useState("");
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
              width: "280px",
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
              کد تایید ارسال شده به ایمیل {email} را وارد کنید.
            </p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0px",
              }}
            >
              <PinInput
                length={6}
                inputSize={40}
                boxGap="8px"
                onChange={setPin}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <ConfirmButton
                type="submit"
                name="تایید"
                onClick={() => {}}
                width={"180px"}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "180px",
                  height: "40px",
                  marginTop: "10px",
                }}
              >
                {timer > 0 ? (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "gray",
                      direction: "ltr",
                    }}
                  >
                    ارسال مجدد کد تا {timer} ثانیه دیگر
                  </p>
                ) : (
                  <Link
                    href="/verification-code"
                    onClick={(event) => {
                      event.preventDefault();
                      setTimer(10);
                    }}
                    color="#000000"
                    sx={{
                      color: "gray",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      width: "180px",
                      "&:hover": { color: "rgb(3, 37, 107)" },
                      textAlign: "center",
                    }}
                  >
                    ارسال مجدد
                  </Link>
                )}
              </Box>
            </Box>
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

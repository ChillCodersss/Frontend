import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmButton from "@/components/common/ConfirmButton";
import PinInput from "@/components/common/PinInputBox";
import "./BackgroundStyle.css";

const FPGetVerificationCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sentEmail = location.state?.email || "";

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
    console.log({ pin });
    if (!pin || pin.length !== 6) {
      toast.error("لطفا کد تایید را وارد کنید");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/api/Auth/VerifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: sentEmail, code: Number(pin) }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error.message || "خطا در ارتباط با سرور");
        return;
      }
      if (data.IsFailure) {
        toast.error("کد تایید وارد شده اشتباه است");
        return;
      }
      if (data.IsSuccess) {
        toast.success("کد تایید صحیح است");
      }
      setTimeout(() => {
        navigate("/set-new-password", { state: { sentEmail } });
      }, 2000);
    } catch (error) {
      console.error("Server error:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

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
              کد تایید ارسال شده به ایمیل {sentEmail} را وارد کنید.
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

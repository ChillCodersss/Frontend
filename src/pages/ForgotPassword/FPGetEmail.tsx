import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import InputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BackgroundStyle.css";

const FPGetEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("لطفا ایمیل خود را وارد کنید");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("لطفا یک ایمیل معتبر وارد کنید");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/api/Auth/ForgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (!response.ok || data.IsFailure) {
        toast.error(data.error.message || "خطا در ارتباط با سرور");
        return;
      }
      if (data.IsSuccess) {
        toast.success("کد تایید ارسال شد");
      }
      setTimeout(() => {
        navigate("/verification-code", { state: { email } });
      }, 500);
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
              برای بازیابی رمز عبور خود، لطفا آدرس ایمیل خود را وارد کنید:
            </p>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ margin: "10px 0px" }}
            >
              <InputBox
                label=""
                type="text"
                placeholder="example@gmail.com"
                fullWidth={true}
                width="285px"
                direction="ltr"
                onChange={handleInputChange}
                value={email}
                startAdornment={
                  <InputAdornment position="start">
                    <Email sx={{ marginLeft: "-2px", marginTop: "2px" }} />
                  </InputAdornment>
                }
              />
            </Box>
            <ConfirmButton name="تایید" type="submit" width={"180px"} />
            <Link
              href="/login"
              underline="hover"
              color="#000000"
              sx={{
                color: "gray",
                fontSize: "0.9rem",
                "&:hover": { color: "rgb(3, 37, 107)" },
                marginTop: "20px",
              }}
            >
              ←بازگشت به صفحه ورود
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

export default FPGetEmail;

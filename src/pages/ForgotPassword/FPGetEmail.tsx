import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
// import { useNavigate } from "react-router-dom";
// import Link from "@mui/material/Link";
import "./FPGetEmail.css";

const FPGetEmail = () => {
  const [email, setEmail] = useState("");
  // const [isSending, setIsSending] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target;
    setEmail(newEmail.value);
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
            padding: "10px",
            gap: "14px",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "black",
              textAlign: "center",
            }}
          >
            برای بازیابی رمز عبور خود، لطفا آدرس ایمیل خود را وارد کنید
          </p>
          <InputBox
            label="ایمیل"
            type="email"
            placeholder="example@gmail.com"
            fullWidth={true}
            direction="ltr"
            onChange={handleInputChange}
            value={email}
          />
          <ConfirmButton
            name="تایید"
            disabled={!email}
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
          />
        </Box>
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

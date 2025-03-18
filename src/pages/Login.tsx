import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import './Login.css'
const Login: React.FC = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    
<div className="area" >
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

    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          maxWidth: { xs: "100%", sm: "300px", md: "400px" }, // Responsive maxWidth
          width: "100%",
          margin: "0 auto",
          backgroundColor: " #BFD9D9",
          borderRadius: "12px",
          padding: "20px",
        }}

      >
        <h1 style={{ textAlign: "left" }}>ثبت نام</h1>
        {/* Email Field */}
        <InputBox
          label="Email*"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="example@gmail.com"
        />

        {/* Password Field */}
        <InputBox
          label="Password*"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          placeholder="********"
        />

        {/* Submit Button */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px"  }}
        >
          <ConfirmButton name="ورود"  />
        </Box>
      </Box>
    </form>
    </div >
  );
};

export default Login;

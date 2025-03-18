import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import './Form.css'
const SignUpForm: React.FC = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    email: "",
    password: "",
    confirmPassword: "",
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
          backgroundColor: "#BFD9D9",
          borderRadius: "12px",
          padding: "20px",
        }}

      >
        <h1 style={{ textAlign: "left" }}>Signup Form</h1>
        {/* Email Field */}
        <InputBox
          label="Email*"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="example@gmail.com"
        />

        {/* First Name Field */}
        <InputBox
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
        />

        {/* Last Name Field */}
        <InputBox
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
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

        {/* Confirm Password Field */}
        <InputBox
          label="Confirm Password*"
          name="confirmPassword"
          value={formData.confirmPassword}
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

export default SignUpForm;

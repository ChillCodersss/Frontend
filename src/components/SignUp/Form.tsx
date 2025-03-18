import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const SignUpForm: React.FC = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Toggle confirm password visibility
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "10px", sm: "12px" }, // Responsive gap
          width: "100%", // Take up full width
        }}
      >
        {/* Responsive h1 */}
        <Box
          component="h1"
          sx={{
            textAlign: "left",
            fontSize: { xs: "20px", sm: "24px", md: "20px" }, // Responsive font size
            marginBottom: { xs: "5px", sm: "10px" }, // Responsive margin
          }}
        >
          Signup Form
        </Box>

        <InputBox
          label="Email*"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="example@gmail.com"
          icon={<EmailIcon />} // Email icon at the end
        />

        <InputBox
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          icon={<PersonIcon />} // Person icon at the end
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
          type={showPassword ? "text" : "password"}
          placeholder="********"
          endAdornment={
            <InputAdornment position="end" sx={{ paddingRight: "5px" }}>
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />

        {/* Confirm Password Field */}
        <InputBox
          label="Confirm Password*"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="********"
          endAdornment={
            <InputAdornment position="end" sx={{ paddingRight: "5px" }}>
              <IconButton
                onClick={handleToggleConfirmPasswordVisibility}
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: "5px", sm: "10px" },
          }}
        >
          <ConfirmButton children="SignUp" />
        </Box>

        {/*Links below Button /*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Space out the links
            alignItems: "center", // Vertically center the links
            marginTop: { xs: "1px", sm: "5px" }, // Add margin above the box
            marginBottom: { xs: "4px", sm: "10px" }, // Add margin above the box
            fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Responsive font size
            padding: { xs: "0px 5px", sm: "0px 5px" },
          }}
        >
          {/* "Already have an account" Link */}
          <Box
            component="a"
            href="/login" // Replace with the actual link
            sx={{
              color: "#070F3D", // Custom color
              textDecoration: "none", // Remove underline
              "&:hover": {
                textDecoration: "underline", // Add underline on hover
              },
            }}
          >
            Already have an account?
          </Box>
          {/* "Go to X" Link */}
          <Box
            component="a"
            href="/go-to-x" // Replace with the actual link
            sx={{
              color: "#070F3D", // Custom color
              textDecoration: "none", // Remove underline
              "&:hover": {
                textDecoration: "underline", // Add underline on hover
              },
            }}
          >
            Go to X
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignUpForm;

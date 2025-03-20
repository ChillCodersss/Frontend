import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";

interface InputBoxProps {
  name?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  direction?: "ltr" | "rtl"; 
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  placeholder = "",
  icon,
  direction = "ltr", 
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ maxWidth: { xs: "100%", sm: "500px", md: "700px", lg: "900px" } }}>
      {/* Label ثابت */}
      <Box
        component="label"
        sx={{
          display: "block",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          fontWeight: "500",
          marginBottom: "7px",
          color: "black",
          paddingLeft: "4px",
          textAlign: "right",   
          direction: "rtl",     
        }}
      >
        {label}
      </Box>

      <TextField
        value={value}
        onChange={onChange}
        type={type === "password" && showPassword ? "text" : type}
        fullWidth={fullWidth}
        variant="outlined"
        margin="none"
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              {type === "password" ? (
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ padding: "0px" }}
                >
                  {showPassword ? <Visibility sx={{marginLeft: "-10px" }}  /> : <VisibilityOff sx={{marginLeft: "-10px" }} />}
                </IconButton>
              ) : (
                <Box sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                  {type === "email" ? <Email sx={{marginLeft: "-10px" , marginTop:"6px"}} /> : icon}
                </Box>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: { xs: "8px", sm: "10px", md: "12px" },
            boxShadow: { xs: "0px 1px 2px rgba(0, 0, 0, 0.1)", sm: "0px 2px 4px rgba(0, 0, 0, 0.25)" },
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderWidth: "1px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.5)",
              borderWidth: "1px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderWidth: "1px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            },
          },
          "& .MuiOutlinedInput-input": {
            height: "23px",
            padding: { xs: "4px 8px 10px 8px", sm: "5px 10px", md: "6px 12px" },
            textAlign:"right", 
            direction,       
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
            textAlign: "right",   
            direction: "rtl",     
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default InputBox;

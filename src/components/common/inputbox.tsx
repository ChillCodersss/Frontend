import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility"; // آیکون نمایش
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // آیکون مخفی
import Email from "@mui/icons-material/Email"; // آیکون ایمیل

interface InputBoxProps {
  name?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  placeholder = "",
  icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false); // state برای نمایش/مخفی کردن رمز

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev); // تغییر وضعیت نمایش/مخفی کردن رمز
  };

  const labelParts = label.split("*");
  const mainLabel = labelParts[0];
  const hasAsterisk = labelParts.length > 1;

  return (

    <Box sx={{ maxWidth: { xs: "100%", sm: "500px", md: "700px", lg: "900px" } }}>
      {/* Label */}
      <Box
        component="label"
        sx={{
          display: "block",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          fontWeight: "500",
          marginBottom: "12px",
          color: "white",
          paddingLeft: "4px",
          textAlign: "right", 
          direction: "rtl", 
        }}
      >
        {mainLabel}
        {hasAsterisk && (
          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
        )}
      </Box>

      {/* Input Field with Full Border, Border Radius, Shadow, Placeholder, and Icon */}
      <TextField
        value={value}
        onChange={onChange}
        type={type === "password" && showPassword ? "text" : type} // تغییر نوع فیلد برای نمایش/مخفی کردن رمز
        fullWidth={fullWidth}
        variant="outlined"
        margin="none"
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              
              {type === "password" ? (
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ padding: "12px" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ) : (
                <Box sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                  {type === "email" ? <Email sx={{ padding: "0px"}}></Email> : icon} 
                </Box>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor:"white",
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
            height: "20px",
            padding: { xs: "4px 8px 10px 8px", sm: "5px 10px", md: "6px 12px" },
            textAlign: "left", // راست‌چین کردن متن داخل فیلد ورودی
            direction: "ltr", // تنظیم جهت به راست
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
            textAlign: "left", // راست‌چین کردن placeholder
            direction: "ltr", // تنظیم جهت به راست
          },
        }}
        {...props}
      />
    </Box>
    
  );
};

export default InputBox;
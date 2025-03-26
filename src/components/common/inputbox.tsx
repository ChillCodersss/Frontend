import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface InputBoxProps {
  name?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
  placeholder?: string;

  startAdornment?: React.ReactNode; // جدید
  direction?: "ltr" | "rtl";

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  placeholder = "",
  startAdornment,
  direction = "ltr",
  ...props
}) => {

  return (
    <Box sx={{ maxWidth: { xs: "100%"}}}>

      <Box
        component="label"
        sx={{
          display: "block",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          fontWeight: "500",
          marginBottom: "7px",
          marginRight: "5px",
          color: "black",
          //paddingLeft: "4px",
          textAlign: "right",
          direction: "rtl",
        }}
      >
        {label}
      </Box>

      <TextField
        value={value}
        onChange={onChange}
        type={type}
        fullWidth={fullWidth}
        variant="outlined"
        margin="none"
        placeholder={placeholder}
        InputProps={{
          startAdornment, // حالا این مقدار را از props می‌گیرد
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: { xs: "8px", sm: "10px", md: "12px" },
            boxShadow: { xs: "0px 1px 2px rgba(0, 0, 0, 0.1)", sm: "0px 2px 4px rgba(0, 0, 0, 0.25)" },
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.5)",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
            },
          },
          "& .MuiOutlinedInput-input": {
            height: "2px",
            px: { xs: 1, sm: 1.5, md: 2 },
            textAlign: "right",
            direction,
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
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

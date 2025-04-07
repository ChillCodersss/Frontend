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
  readOnly?: boolean;
  startAdornment?: React.ReactNode; // جدید
  direction?: "ltr" | "rtl";
  height?: string | number;
  borderRadius?: string | number | { xs: string; sm: string; md: string };
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  placeholder = "",
  startAdornment,
  direction = "ltr",
  readOnly = false,
  height = "2px",
  borderRadius = { xs: "0px", sm: "0px", md: "0px" },
  ...props
}) => {
  return (
    <Box sx={{ maxWidth: { xs: "100%" } }}>
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
        disabled={readOnly}
        inputProps={{ readOnly }}
        InputProps={{
          startAdornment,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: borderRadius,
            transition: "border-color 0.3s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderWidth: "1px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderWidth: "1px",
            },
          },
          "& .MuiOutlinedInput-input": {
            height: height,
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

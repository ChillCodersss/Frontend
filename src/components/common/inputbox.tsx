import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

interface InputBoxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Optional prop
  fullWidth?: boolean; // Optional prop
  placeholder?: string; // Optional placeholder
  icon?: React.ReactNode; // Optional icon
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
  return (
    <Box sx={{ maxWidth: { xs: "100%", sm: "500px", md: "700px", lg: "900px" } }}>
      {/* Label */}
      <Box
        component="label"
        sx={{
          display: "block",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, 
          fontWeight: "500",
          marginBottom: "4px",
          color: "text.primary",
          paddingLeft: "4px",
        }}
      >
        {label}
      </Box>

      {/* Input Field with Full Border, Border Radius, Shadow, Placeholder, and Icon */}
      <TextField
        value={value}
        onChange={onChange}
        type={type}
        fullWidth={fullWidth}
        variant="outlined"
        margin="none"
        placeholder={placeholder}
        InputProps={{
          endAdornment: icon && (
            <InputAdornment position="end" sx={{ paddingRight: { xs: "4px", sm: "8px" } }}>
              <Box sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                {icon}
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
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
            padding: { xs: "4px 8px 10px 8px", sm: "5px 10px", md: "6px 12px" }, 
            textAlign: "left",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }, 
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default InputBox;
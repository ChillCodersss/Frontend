import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

interface InputBoxProps {
  name?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
  placeholder?: string;
  icon?: React.ReactNode; // For end adornment (e.g., email, person icons)
  endAdornment?: React.ReactNode; // For additional end adornment (e.g., password visibility toggle)
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  placeholder = "",
  icon,
  endAdornment,
  ...props
}) => {
  const labelParts = label.split("*");
  const mainLabel = labelParts[0];
  const hasAsterisk = labelParts.length > 1;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Label */}
      <Box
        component="label"
        sx={{
          display: "block",
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
          fontWeight: "500",
          marginBottom: "4px",
          color: "text.primary",
          paddingLeft: "4px",
        }}
      >
        {mainLabel}
        {hasAsterisk && (
          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
        )}
      </Box>

      {/* Input Field */}
      <TextField
        value={value}
        onChange={onChange}
        type={type}
        fullWidth={fullWidth}
        variant="outlined"
        margin="none"
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <>
              {icon && (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem", // Consistent icon size
                      color: "action.active", // Icon color
                      height: { xs: "4px", sm: "4px", md: "6px" },
                    }}
                  >
                    {icon}
                  </Box>
                </InputAdornment>
              )}
              {endAdornment} {/* Additional end adornment (e.g., password visibility toggle) */}
            </>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: { xs: "6px", sm: "8px", md: "10px" },
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
            height: { xs: "10px", sm: "10px", md: "6px" },
            padding: { xs: "10px 14px", sm: "12px 16px", md: "14px 18px" }, // Adjusted padding
            textAlign: "left",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default InputBox;
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";

interface ConfirmButtonProps extends ButtonProps {
  children: ReactNode;
}

function ConfirmButton({ children, ...props }: ConfirmButtonProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Button
        variant="contained"
        sx={{
          borderRadius: { xs: "8px", sm: "10px", md: "12px" },
          color: "white",
          backgroundColor: "#0A155C",
          padding: 0,
          width: "100%", // Take up full width
          fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive font size
          height: { xs: "30px", sm: "30px", md: "40px" },
          "&:hover": {
            backgroundColor: " #0A155C", // Darker shade for hover
          },
          "&:active": {
            backgroundColor: " #070F3D", // Even darker shade for active state
          },
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  );
}

export default ConfirmButton;

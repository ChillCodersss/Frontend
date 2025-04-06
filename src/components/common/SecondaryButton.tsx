import React from "react";
import { Button, ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";

interface SecondaryButtonProps extends ButtonProps {
  name: string;
  width?: string | number;
  height?: string | number;
  backgroundColor: string;
  fontSize?: string;

}

function SecondaryButton({
  name,
  backgroundColor,
  fontSize = "20px",
  width = "240px",
  height = "40px",
  ...props
}: SecondaryButtonProps) {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        sx={{
          width,
          height,
          backgroundColor, 
          fontSize,
          appearance: "none",
          backfaceVisibility: "hidden",
          borderRadius: "3px",
          borderStyle: "none",
          boxShadow: "rgba(39, 174, 96, 0.15) 0 4px 9px",
          boxSizing: "border-box",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",        // vertically center the text
          justifyContent: "center",    // horizontally center the text
          fontFamily:
            'Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
          fontWeight: 600,
          letterSpacing: "normal",
          lineHeight: 1.5,
          outline: "none",
          overflow: "hidden",
          padding: "0 20px",
          position: "relative",
          textAlign: "center",
          textDecoration: "none",
          transition: "all .3s",
          userSelect: "none",
          touchAction: "manipulation",
          verticalAlign: "top",
          whiteSpace: "nowrap",
          transform: "translate3d(0, 0, 0)",

          "&:hover": {

            opacity: 1,
            transform: "translateY(0)",
          },

          "&:active": {
            transform: "translateY(0)",
          },
        }}
        {...props}
      >
        {name}
      </Button>
    </Box>
  );
}

export default SecondaryButton;


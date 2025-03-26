
import { Button, ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";

interface ConfirmButtonProps extends ButtonProps {
  name: string;
  width?: string | number;
  height?: string | number;
}

function ConfirmButton({ name, width = "240px", height = "40px", ...props }: ConfirmButtonProps) {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        sx={{
          width: { xs: "200px", sm: width }, 
          height: { xs: "35px", sm: height }, 
          fontSize: { xs: "16px", sm: "20px" } ,
          textAlign: "center",
          textTransform: "uppercase",
          transition: "0.5s",
          backgroundSize: "200% auto",
          color: "white",
          borderRadius: "30px",
          border: 0,
          fontWeight: 700,
          boxShadow: "0px 0px 14px -7px rgb(25, 57, 240)",
          backgroundImage:
            "linear-gradient(45deg,rgb(47, 50, 255) 0%,rgb(25, 154, 240) 51%,rgb(1, 7, 98) 100%)",
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
          "&:hover": {
            backgroundPosition: "right center",
            color: "#fff",
            textDecoration: "none",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
        {...props}
      >
        {name}
      </Button>
    </Box>
  );
}

export default ConfirmButton;

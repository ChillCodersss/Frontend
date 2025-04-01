import { Box, styled, Typography, Link } from "@mui/material";
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import CallIcon from "@mui/icons-material/Call";

// Styled component for the dark blue trapezoid background
const DarkBlueTrapezoid = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(1, 71, 128, 1)", // Dark blue color
  clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 90%)", // Trapezoid shape
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2), // Responsive padding
  boxSizing: "border-box",
}));

// Styled component for the blue trapezoid background
const BlueTrapezoid = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "50%",
  backgroundColor: "#057ABE", // Light blue color
  clipPath: "polygon(0 0%, 100% 30%, 100% 100%, 0 100%)", // Trapezoid shape
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2), // Responsive padding
  boxSizing: "border-box",
}));

// Footer component
const Footer = () => {
  return (
    <>
      {/* Main container for the footer */}
      <Box
        sx={{
          minHeight: "100vh", // Full viewport height
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Container for the trapezoid backgrounds */}
        <Box
          sx={{
            position: "relative", // Relative positioning for child elements
            width: "100%",
            height: { xs: "200px", sm: "150px", md: "300px" }, // Responsive height
            backgroundColor: "white",
            overflow: "hidden",
            zIndex: 1000, // Ensure it stays above other content
            marginTop: "auto", // Push to the bottom of the page
          }}
        >
          {/* Dark blue trapezoid background */}
          <DarkBlueTrapezoid>
            {/* Logo and brand name section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                position: "relative",
                top: { xs: "20px", sm: "-50px", md: "30px" }, // Responsive positioning
                right: { xs: "-5px", sm: "-50px", md: "-60px" }, // Responsive positioning
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {/* Logo image */}
              <Box
                component="img"
                src="src/assets/react.svg"
                alt="Logo"
                sx={{
                  height: { xs: "40px", sm: "50px", md: "60px" }, // Responsive height
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
              {/* Brand name */}
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive font size
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                نوتروفیل
              </Typography>
            </Box>

            {/* Slogan text */}
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                position: "relative",
                top: { xs: "-60px", sm: "-50px", md: "-80px" }, // Responsive positioning
                direction: "rtl", // Right-to-left text direction
                fontSize: { xs: "10px", sm: "16px", md: "16px" }, // Responsive font size
                margin: { xs: "0 10px", sm: "0 300px" }, // Responsive margin
              }}
            >
              با نوتروفیل این مسیر رو خوب تموم کن!{" "}
            </Typography>

            {/* Links section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                position: "relative",
                top: { xs: "-35px", sm: "-50px", md: "-50px" }, // Responsive positioning
                textAlign: "right",
                direction: "rtl", // Right-to-left text direction
                left: { xs: "0", sm: "-60px", md: "-60px" }, // Responsive positioning
              }}
            >
              {/* Links to different pages */}
              <Link
                href="#"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "10px", sm: "16px" }, // Responsive font size
                }}
              >
                خدمات
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "10px", sm: "16px" },
                }}
              >
                استخدام
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "10px", sm: "16px" },
                }}
              >
                درباره ما
              </Link>
              <Link
                href="#"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "10px", sm: "16px" },
                }}
              >
                مشاوران ما
              </Link>
            </Box>
          </DarkBlueTrapezoid>

          {/* Blue trapezoid background */}
          <BlueTrapezoid>
            {/* Social media and contact section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: { xs: "10px", sm: "50px", md: "50px" }, // Responsive positioning
                bottom: { xs: "25px", sm: "20px", md: "40px" }, // Responsive positioning
                width: "auto",
                textAlign: "center",
                direction: "rtl", // Right-to-left text direction
              }}
            >
              {/* Title for contact section */}
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "10px", sm: "14px", md: "14px" }, // Responsive font size
                  marginBottom: { xs: "8px", sm: "8px", md: "15px" }, // Responsive margin
                }}
              >
                راه های ارتباط با ما
              </Typography>
              {/* Social media icons */}
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: "10px", sm: "15px", md: "15px" }, // Responsive gap
                  justifyContent: "center",
                }}
              >
                {/* Telegram link */}
                <Link
                  href="https://t.me"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Box
                    component={FaTelegram}
                    sx={{ fontSize: { xs: 18, sm: 30, md: 30 } }} // Responsive icon size
                  />
                </Link>
                {/* Instagram link */}
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Box
                    component={RiInstagramFill}
                    sx={{ fontSize: { xs: 18, sm: 30, md: 30 } }}
                  />
                </Link>
                {/* Phone call link */}
                <Link
                  href="tel:+1234567890"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Box
                    component={CallIcon}
                    sx={{ fontSize: { xs: 18, sm: 30, md: 30 } }}
                  />
                </Link>
              </Box>
            </Box>

            {/* Copyright text */}
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: { xs: "8px", sm: "14px", md: "16px" }, // Responsive font size
                position: "relative",
                direction: "rtl", // Right-to-left text direction
                bottom: { xs: "-15px", sm: "-20px", md: "-20px" }, // Responsive positioning
              }}
            >
              © کلیه حقوق برای نام وبسایت محفوظ است
            </Typography>
          </BlueTrapezoid>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
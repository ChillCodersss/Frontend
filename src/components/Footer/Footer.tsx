import { Box, styled, Typography, Link } from "@mui/material";
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import CallIcon from "@mui/icons-material/Call";

const DarkBlueTrapezoid = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(1, 71, 128, 1)", 
  clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 90%)", 
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2), 
  boxSizing: "border-box",
}));

const BlueTrapezoid = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "50%",
  backgroundColor: "#057ABE",
  clipPath: "polygon(0 0%, 100% 30%, 100% 100%, 0 100%)",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2), 
  boxSizing: "border-box",
}));

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh", 
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "relative", 
            width: "100%",
            height: { xs: "200px", sm: "150px", md: "300px" }, 
            backgroundColor: "white",
            overflow: "hidden",
            zIndex: 1000, 
            marginTop: "auto",
          }}
        >
          <DarkBlueTrapezoid>
            <Box
              sx={{
                display: "flex", 
                alignItems: "center",
                height: "100%",
                position: "relative",
                top: { xs: "20px", sm: "-50px", md: "30px" }, 
                right: { xs: "-5px", sm: "-50px", md: "-50px" }, 
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box
                component="img" 
                src="src/assets/react.svg"
                alt="Logo"
                sx={{
                  height: { xs: "40px", sm: "50px", md: "60px" }, 
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
              <Typography
                sx={{
                  color: "white", 
                  fontSize: { xs: "12px", sm: "14px", md: "16px" }, 
                  fontWeight: "bold", 
                  textAlign: "center", 
                }}
              >
                نوتروفیل
              </Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                position: "relative",
                top: { xs: "-60px", sm: "-50px", md: "-80px" },
                direction: "rtl",
                fontSize: { xs: "10px", sm: "16px", md: "16px" },
                margin: { xs: "0 10px", sm: "0 300px" }, 
              }}
            >
              با نوتروفیل این مسیر رو خوب تموم کن!{" "}
            </Typography>

            <Box
              sx={{
                display: "flex", 
                flexDirection: "column",
                gap: "5px",
                position: "relative",
                top: { xs: "-35px", sm: "-50px", md: "-50px" }, 
                textAlign: "right",
                direction: "rtl",
                left: { xs: "0", sm: "-60px", md: "-60px" }, 
              }}
            >
              <Link
                href="#"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "10px", sm: "16px" },
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

          <BlueTrapezoid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: { xs: "10px", sm: "50px", md: "50px" }, 
                bottom: { xs: "25px", sm: "20px", md: "40px" }, 
                width: "auto", 
                textAlign: "center",
                direction: "rtl",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "10px", sm: "14px", md: "14px" },
                  marginBottom: { xs: "8px", sm: "8px", md: "15px" },
                }}
              >
                راه های ارتباط با ما
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: "10px", sm: "15px", md: "15px" },
                  justifyContent: "center",
                }}
              >
                <Link
                  href="https://t.me"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Box
                    component={FaTelegram}
                    sx={{ fontSize: { xs: 18, sm: 30, md: 30 } }}
                  />
                </Link>
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

            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: { xs: "8px", sm: "14px", md: "16px" },
                position: "relative",
                direction: "rtl",
                bottom: { xs: "-15px", sm: "-20px", md: "-20px" },
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

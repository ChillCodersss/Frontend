import React from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import hoomanImg from "@/assets/hooman.jpg";

const ChatHeader: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        direction: "rtl",
        position: "sticky",
        top: isSmallScreen ? "58px" : "64px",
        width: "100%",
        padding: "12px 16px",
        boxSizing: "border-box",
        zIndex: 100,
        backgroundColor: "#fff",
        minHeight: "56px",
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: isSmallScreen ? "4px" : "16px",
        }}
      >
        <IconButton onClick={() => window.history.back()}>
          <ArrowForwardIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar src={hoomanImg} />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "14px" : "20px",
              marginLeft: "8px",
            }}
          >
            هومن متین
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: isSmallScreen ? "4px" : "16px",
        }}
      >
        <IconButton onClick={() => handleClickOpen()}>
          <InfoIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        dir="rtl"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>قوانین چت</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <ul style={{ paddingRight: 20 }}>
              <li>احترام به دیگران را رعایت کنید.</li>
              <li>از ارسال پیام‌های توهین‌آمیز یا نامناسب خودداری کنید.</li>
              <li>اطلاعات شخصی خود و دیگران را به اشتراک نگذارید.</li>
              <li>از ارسال پیام‌های تبلیغاتی خودداری کنید.</li>
              <li>در صورت مشاهده رفتار نامناسب، به ادمین اطلاع دهید.</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatHeader;

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
import { useContacts } from "@/contexts/ContactsContext";

interface ChatHeaderProps {
  contactName: string;
  avatarUrl?: string;
  contactId?: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  contactName,
  avatarUrl,
  contactId,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const { onlineContactIds } = useContacts();

  const isOnline = contactId ? onlineContactIds.includes(contactId) : false;

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
        width: "100%",
        padding: "12px 16px",
        boxSizing: "border-box",
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
          <Avatar
            src={avatarUrl}
            sx={{
              border: isOnline ? "4px solid #4caf50" : "3px solid #bdbdbd",
              padding: "1px",
              borderRadius: "50%",
              "& img": {
                borderRadius: "50%",
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "14px" : "20px",
              marginLeft: "8px",
            }}
          >
            {contactName}
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

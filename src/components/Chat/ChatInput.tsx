import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = "پیام خود را بنویسید...",
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // the shift is for new line adding type shi*
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: isSmallScreen ? "58px" : "64px",
        padding: "0 8px",
        gap: "8px",
        boxSizing: "border-box",
        direction: "rtl",
        borderTop: "1px solid rgb(175, 175, 175)",
        backgroundColor: "rgb(0, 153, 255)",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        slotProps={{
          input: {
            disableUnderline: true,
            sx: {
              display: "flex",
              alignItems: "center",
              padding: 0,
              height: "100%",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            },
          },
        }}
        sx={{
          direction: "rtl",
          padding: "0px 12px",
          fontSize: "1rem",
          borderRadius: "30px",
          backgroundColor: "rgb(255, 255, 255)",
          height: isSmallScreen ? "36px" : "48px",
        }}
      />
      <IconButton
        onClick={() => {
          if (disabled || !value.trim()) return;
          handleSend();
        }}
        disabled={false}
        sx={{
          backgroundColor: "#fff",
          height: isSmallScreen ? "36px" : "48px",
          width: isSmallScreen ? "36px" : "48px",
          color: "#fff",
          transition: "background-color 0.4s, color 1s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#e3e3e3",
          },
        }}
      >
        <SendIcon sx={{ transform: "scaleX(-1)", color: "#0099ff" }} />
      </IconButton>
    </Box>
  );
};

export default ChatInput;

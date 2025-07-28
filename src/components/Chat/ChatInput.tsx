import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface ChatInputProps {
  onSend: (message: string) => void;
  onSendFile: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onSendFile,
  disabled = false,
  placeholder = "پیام خود را بنویسید...",
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (value.trim()) {
      console.log("Sending text message:", value);
      onSend(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      onSendFile(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        sx={{
          backgroundColor: "#fff",
          height: isSmallScreen ? "36px" : "48px",
          width: isSmallScreen ? "36px" : "48px",
          color: "#0099ff",
          transition: "background-color 0.4s, color 1s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#e3e3e3",
          },
        }}
      >
        <AttachFileIcon sx={{ color: "#0099ff" }} />
      </IconButton>
      <input
        type="file"
        //accept=".pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <IconButton
        onClick={() => {
          if (disabled || !value.trim()) return;
          handleSend();
        }}
        disabled={disabled}
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
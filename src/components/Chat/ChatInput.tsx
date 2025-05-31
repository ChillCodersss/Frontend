import React, { useState } from "react";
import { TextField, IconButton, Paper } from "@mui/material";
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
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: 3,
        marginTop: "10px",
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
        sx={{ direction: "rtl", padding: "0px 8px", fontSize: "1rem" }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        sx={{ marginLeft: "8px" }}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;

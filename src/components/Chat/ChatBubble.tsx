import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatBubbleProps {
  message: string;
  isOwn?: boolean;
  time?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwn = false,
  time,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isOwn ? "flex-end" : "flex-start",
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          bgcolor: isOwn ? "#057ABE" : "#f1f1f1",
          color: isOwn ? "#fff" : "#222",
          px: 2,
          py: 1,
          borderRadius: 2,
          borderTopLeftRadius: isOwn ? 12 : 2,
          borderTopRightRadius: isOwn ? 2 : 12,
          boxShadow: 1,
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
          {message}
        </Typography>
      </Box>
      {time && (
        <Typography
          variant="caption"
          sx={{
            color: "#888",
            mt: 0.5,
            fontSize: "0.75rem",
            textAlign: isOwn ? "right" : "left",
            pr: isOwn ? 0.5 : 0,
            pl: isOwn ? 0 : 0.5,
          }}
        >
          {time}
        </Typography>
      )}
    </Box>
  );
};

export default ChatBubble;

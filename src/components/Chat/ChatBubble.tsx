import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatBubbleProps {
  message: string;
  isOwn?: boolean;
  isStudent?: boolean;
  time?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwn = false,
  isStudent = false,
  time,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isOwn ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          bgcolor: isStudent ? " #DAEFFE" : " #F6E08F",
          color: "rgb(34, 34, 34)",
          px: 2,
          py: 1,
          borderRadius: 2,
          borderTopLeftRadius: isOwn ? 2 : 12,
          borderTopRightRadius: isOwn ? 12 : 2,
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
            color: "rgb(64, 64, 64)",
            marginTop: "4px",
            fontSize: "0.75rem",
            textAlign: isOwn ? "right" : "left",
            paddingRight: isOwn ? "4px" : "0",
            paddingLeft: isOwn ? "0" : "4px",
          }}
        >
          {time}
        </Typography>
      )}
    </Box>
  );
};

export default ChatBubble;

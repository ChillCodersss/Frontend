import React from "react";
import { Box, Typography } from "@mui/material";

export interface ChatBubbleProps {
  id: number;
  text: string;
  isOwn?: boolean;
  isStudent?: boolean;
  time?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  id,
  text,
  isOwn = false,
  isStudent = false,
  time,
}) => {
  return (
    <Box
      key={id}
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
          padding: "12px 8px",
          borderRadius: "16px",
          border: isStudent
            ? "1px solid rgb(121, 199, 255)"
            : "1px solid rgb(243, 210, 92)",
          borderTopLeftRadius: isOwn ? "16px" : "0",
          borderTopRightRadius: isOwn ? "0" : "16px",
          marginLeft: !isOwn ? "8px" : "0",
          marginRight: !isOwn ? "0" : "8px",
          wordBreak: "break-word",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", textAlign: "right" }}
        >
          {text}
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

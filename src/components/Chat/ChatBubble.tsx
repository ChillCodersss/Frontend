import React from "react";
import { Box, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export interface ChatBubbleProps {
  id: number;
  text: string;
  isOwn?: boolean;
  isStudent?: boolean;
  seen?: boolean;
  sendDate?: string; // Only use sendDate
}

// Utility to convert Western digits to Persian digits
function toPersianDigits(str: string) {
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  id,
  text,
  isOwn = false,
  isStudent = false,
  seen,
  sendDate,
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
          position: "relative",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", textAlign: "right" }}
        >
          {text}
        </Typography>

        {(sendDate || isOwn) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: "4px",
              gap: "12px",
            }}
          >
            {sendDate ? (
              <Typography
                variant="caption"
                sx={{
                  color: "rgb(64, 64, 64)",
                  fontSize: "0.75rem",
                  textAlign: "left",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                {toPersianDigits(sendDate)}
              </Typography>
            ) : (
              <span />
            )}

            {isOwn ? (
              seen ? (
                <DoneAllIcon
                  fontSize="small"
                  sx={{ color: "green" }}
                  titleAccess="Seen"
                />
              ) : (
                <DoneIcon
                  fontSize="small"
                  sx={{ color: "green" }}
                  titleAccess="Delivered"
                />
              )
            ) : (
              <span />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatBubble;

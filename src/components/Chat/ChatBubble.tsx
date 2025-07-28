import React from "react";
import { Box, Typography, Link, CircularProgress } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getToken } from "@/services/auth";

export interface ChatBubbleProps {
  id: number;
  text: string;
  isOwn?: boolean;
  isStudent?: boolean;
  seen?: boolean;
  sendDate?: string;
  isFile?: boolean;
  filePath?: string;
  isUploading?: boolean;
  tempKey?: string;
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
  seen = false,
  sendDate,
  isFile = false,
  filePath,
  isUploading = false,
  tempKey,
}) => {
  console.log("Rendering ChatBubble:", { id, text, isFile, filePath, isUploading, tempKey });

  const handleDownload = async () => {
    if (!filePath) {
      console.error("No filePath provided for download:", { id, text });
      return;
    }
    console.log("Attempting download:", { filePath, text });
    try {
      const token = getToken();
      const response = await fetch(filePath, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        console.error("Download failed:", { status: response.status, statusText: response.statusText });
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = text;
      a.click();
      window.URL.revokeObjectURL(url);
      console.log("Download successful:", { filePath, text });
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <Box
      key={tempKey || id}
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
          bgcolor:
            (isStudent && isOwn) || (!isStudent && !isOwn)
              ? "#DAEFFE"
              : "#F6E08F",
          color: "rgb(34, 34, 34)",
          padding: "12px 8px",
          borderRadius: "16px",
          border:
            (isStudent && isOwn) || (!isStudent && !isOwn)
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
        {isFile && isUploading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CircularProgress size={20} />
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "right" }}
            >
              {text} (در حال بارگذاری...)
            </Typography>
          </Box>
        ) : isFile && filePath ? (
          <Link
            component="button"
            onClick={handleDownload}
            sx={{
              color: "rgb(0, 153, 255)",
              textDecoration: "underline",
              fontSize: "1rem",
              textAlign: "right",
              display: "block",
            }}
          >
            {text}
          </Link>
        ) : isFile ? (
          <Typography
            variant="body1"
            sx={{ fontSize: "1rem", textAlign: "right" }}
          >
            {text} (فایل در دسترس نیست)
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{ fontSize: "1rem", textAlign: "right" }}
          >
            {text}
          </Typography>
        )}

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
            {sendDate && (
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
            )}
            {isOwn && (
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
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatBubble;
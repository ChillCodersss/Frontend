import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const baseURL = "http://62.60.213.13/";

export interface ContactsItemProps {
  contactId: number;
  contactName: string;
  lastMessage: string;
  contactProfilePicUrl: string;
  picName: string;
  role?: string;
  online?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const fetchImage = async (picUrl: string) => {
  try {
    const response = await fetch(
      `${baseURL}api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(picUrl)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return "";
  } catch {
    return "";
  }
};

const ContactsItem: React.FC<ContactsItemProps> = ({
  contactName,
  lastMessage,
  contactProfilePicUrl,
  picName,
  online,
  active = true,
  onClick,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | undefined;

    if (contactProfilePicUrl) {
      fetchImage(contactProfilePicUrl).then((url) => {
        if (isMounted) {
          setAvatarUrl(url || undefined);
          objectUrl = url;
        }
      });
    } else {
      setAvatarUrl(undefined);
    }

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [contactProfilePicUrl]);

  return (
    <ListItem
      component="button"
      sx={{
        direction: "rtl",
        marginBottom: "8px",
        borderRadius: "8px",
        bgcolor: "#f5f5f5",
        border: "2px solid #057ABE",
        "&:hover": { bgcolor: "#e0f7fa" },
      }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar
          src={avatarUrl}
          alt={picName}
          sx={{
            border: online ? "3px solid #4caf50" : "2px solid #bdbdbd",
          }}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{ direction: "rtl", textAlign: "right" }}
        primary={
          <Typography sx={{ direction: "rtl", textAlign: "right" }}>
            {contactName}
          </Typography>
        }
        secondary={
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ direction: "rtl", textAlign: "right" }}
          >
            {lastMessage}
          </Typography>
        }
      />
      <Box
        sx={{
          marginLeft: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {active ? (
          <ChatBubbleIcon sx={{ color: "#057ABE", fontSize: "27px" }} />
        ) : (
          <HistoryIcon sx={{ color: "#057ABE", fontSize: "27px" }} />
        )}
      </Box>
    </ListItem>
  );
};

export default ContactsItem;

import React from "react";
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

interface ContactsItemProps {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
  online: boolean;
  active: boolean;
  onClick?: () => void;
}

const ContactsItem: React.FC<ContactsItemProps> = ({
  name,
  lastMessage,
  avatar,
  online,
  active,
  onClick,
}) => {
  return (
    <ListItem
      component="button"
      sx={{
        direction: "rtl",
        mb: 1,
        borderRadius: 2,
        bgcolor: "#f5f5f5",
        border: "2px solid #057ABE",
        "&:hover": { bgcolor: "#e0f7fa" },
      }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar
          src={avatar}
          sx={{
            border: online ? "3px solid #4caf50" : "2px solid #bdbdbd",
          }}
        ></Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{ direction: "rtl", textAlign: "right" }}
        primary={
          <Typography sx={{ direction: "rtl", textAlign: "right" }}>
            {name}
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
      <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
        {active ? (
          <ChatBubbleIcon sx={{ color: "#057ABE", ml: 1 }} />
        ) : (
          <HistoryIcon sx={{ color: "#057ABE", ml: 1 }} />
        )}
      </Box>
    </ListItem>
  );
};

export default ContactsItem;

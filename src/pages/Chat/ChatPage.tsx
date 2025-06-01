import ChatHeader from "@/components/Chat/ChatHeader";
import { Box } from "@mui/material";
import React from "react";
import MainChat from "./MainChat";

const ChatPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        padding: "0px",
        flexDirection: "column",
        boxSizing: "border-box",
        ":has()": { padding: "0px !important" },
      }}
    >
      <ChatHeader />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainChat />
      </Box>
    </Box>
  );
};

export default ChatPage;

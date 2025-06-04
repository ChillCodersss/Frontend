import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatHeader from "@/components/Chat/ChatHeader";

import { ChatBubbleProps } from "@/components/Chat/ChatBubble";
import MainChat from "../../components/Chat/MainChat";

const ChatPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState<ChatBubbleProps[]>([
    {
      message: "سلام! چطور می‌تونم کمکتون کنم؟",
      isOwn: false,
      isStudent: false,
    },
    {
      message: "سلام، من برای هفته آینده درخواستی دارم.",
      isOwn: true,
      isStudent: true,
    },
    { message: "بفرمایید، در خدمتم.", isOwn: false, isStudent: false },
    {
      message: "چه زمانی می تونم تایم مشاوره حضوری با شما داشته باشم؟",
      isOwn: true,
      isStudent: true,
    },
    {
      message: "بنده روز های زوج تایم خالی برای این کار دارم",
      isOwn: false,
      isStudent: false,
    },
  ]);

  // mocking shi*
  const handleSend = (msg: string) => {
    if (msg.trim()) {
      setMessages((prev) => [
        ...prev,
        { message: msg, isOwn: true, isStudent: true },
      ]);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: isSmallScreen ? "calc(100vh - 58px)" : "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: 0,
      }}
    >
      <ChatHeader />
      <MainChat messages={messages} handleSend={handleSend} />
    </Box>
  );
};

export default ChatPage;

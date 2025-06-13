import { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "../../components/Chat/MainChat";
import { ChatService } from "@/services/chat";
import { ChatBubbleProps } from "@/components/Chat/ChatBubble";
import { getToken, getUserInfo } from "@/services/auth";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = String(getToken());
  const { contactId } = useParams<{ contactId: string }>();

  const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
  const chatServiceRef = useRef<ChatService | null>(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    if (!contactId) return;
    const chatService = new ChatService(token);
    chatServiceRef.current = chatService;

    chatService.onReceivePrivateMessage((text, senderName, senderId) => {
      setMessages((prev) => [
        ...prev,
        {
          // here we should handle if the message is file or text
          id: messageIdRef.current++,
          text,
          isOwn: getUserInfo()?.id === senderId,
          isStudent: getUserInfo()?.role === "Student",
        },
      ]);
    });

    // Optionally handle other events:
    // chatService.onSeenMessage(...)
    // chatService.onReceiveOnlineContacts(...)
    // chatService.onReceiveUserStatusChange(...)

    // Optionally: connect/start the SignalR connection if needed
    chatService["connection"].start().catch(console.error);

    return () => {
      chatService["connection"].stop();
    };
  }, [token, contactId]);

  const handleSend = async (msg: string) => {
    if (msg.trim() && chatServiceRef.current && contactId) {
      await chatServiceRef.current.sendMessage(msg, contactId);
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
        animation: "slideRight 0.5s cubic-bezier(0.4,0,0.2,1)",
        "@keyframes slideRight": {
          from: {
            opacity: 0,
            transform: "translateX(-70px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      }}
    >
      <ChatHeader />
      <MainChat messages={messages} handleSend={handleSend} />
    </Box>
  );
};

export default ChatPage;

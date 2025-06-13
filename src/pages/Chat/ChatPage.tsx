import { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "../../components/Chat/MainChat";
import { useChatService } from "@/contexts/ChatServiceContext";
import { ChatBubbleProps } from "@/components/Chat/ChatBubble";
import { getToken, getUserInfo } from "@/services/auth";
import { useParams } from "react-router-dom";
import type { ChatService } from "@/services/chat";
import { useContacts } from "@/contexts/ContactsContext";

const ChatPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = String(getToken());
  const { contactId } = useParams<{ contactId: string }>();

  const { contacts } = useContacts();
  const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
  const [contactInfo, setContactInfo] = useState<{
    name: string;
    avatarUrl?: string;
  }>({
    name: "",
    avatarUrl: "",
  });
  const chatService = useChatService();
  const chatServiceRef = useRef<ChatService | null>(chatService);
  const messageIdRef = useRef(0);

  useEffect(() => {
    if (!contactId) return;
    const found = contacts.find(
      (c) => String(c.contactId) === String(contactId)
    );
    if (found) {
      setContactInfo({
        name: found.contactName,
        avatarUrl: found.contactProfilePicUrl,
      });
    } else {
      setContactInfo({ name: "", avatarUrl: "" });
    }
  }, [contactId, contacts]);

  useEffect(() => {
    chatServiceRef.current = chatService;
    if (!contactId) return;
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
  }, [token, contactId, chatService]);

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
      <ChatHeader
        contactName={contactInfo.name}
        avatarUrl={contactInfo.avatarUrl}
      />
      <MainChat messages={messages} handleSend={handleSend} />
    </Box>
  );
};

export default ChatPage;

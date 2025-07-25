import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "../../components/Chat/MainChat";
import { useChatService } from "@/contexts/ChatServiceContext";
import { useContacts } from "@/contexts/ContactsContext";
import { getToken } from "@/services/auth";
import { useParams } from "react-router-dom";
import { getMessages } from "@/services/chat";
import { getUserInfo } from "@/services/auth";

// Define the API message type
interface ApiMessage {
  id: number;
  receiverId: number;
  senderId: number;
  seen: boolean;
  text: string;
  sendDate: string;
}

// Helper to format date as Jalali (Persian) date string
function formatJalaliDate(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(/\u200e/g, "")
    .replace(/,/g, " ");
}

const ChatPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const token = String(getToken());
  const { contactId } = useParams<{ contactId: string }>();

  const { contacts } = useContacts();
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [contactInfo, setContactInfo] = useState<{
    name: string;
    avatarUrl?: string;
  }>({
    name: "",
    avatarUrl: "",
  });
  const chatService = useChatService();
  const [loading, setLoading] = useState(true);

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
    if (!contactId) return;
    setLoading(true);
    // Fetch previous messages when contactId changes
    (async () => {
      try {
        const response = await getMessages(token, Number(contactId));
        if (response.isSuccess && Array.isArray(response.value)) {
          setMessages(response.value);
        } else {
          setMessages([]);
        }
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, contactId]);

  useEffect(() => {
    if (!contactId) return;
    chatService.onReceivePrivateMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    chatService.onSeenMessage((messageIds, isSeen) => {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIds.includes(msg.id) ? { ...msg, seen: isSeen } : msg
        )
      );
    });
  }, [token, contactId, chatService]);

  const handleSend = async (msg: string) => {
    if (msg.trim() && contactId) {
      const tempId = -Date.now();
      const currentUserId = getToken() ? getUserInfo()?.id ?? 0 : 0;
      setMessages((prev) => [
        ...prev,
        {
          id: tempId,
          receiverId: Number(contactId),
          senderId: Number(currentUserId),
          seen: false,
          text: msg,
          sendDate: formatJalaliDate(new Date()),
        },
      ]);
      await chatService.sendMessage(msg, contactId);
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
      <MainChat messages={messages} handleSend={handleSend} loading={loading} />
    </Box>
  );
};

export default ChatPage;

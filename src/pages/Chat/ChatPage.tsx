import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "../../components/Chat/MainChat";
import { useChatService } from "@/contexts/ChatServiceContext";
import { useContacts } from "@/contexts/ContactsContext";
import { getToken } from "@/services/auth";
import { useParams } from "react-router-dom";
import { getMessages } from "@/services/chat";
import { getUserInfo } from "@/services/auth";
import ChatInput from "@/components/Chat/ChatInput";

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
      setMessages((prev) => {
        const currentUserId = getToken() ? getUserInfo()?.id ?? 0 : 0;
        const isOwnMessage = msg.senderId === currentUserId;

        // Set the correct receiver ID for the message
        const messageWithReceiverId = {
          ...msg,
          receiverId: isOwnMessage ? Number(contactId) : currentUserId,
        };

        if (isOwnMessage) {
          // This is likely a response to our sent message
          // Find and replace the temporary message with the real one
          let tempMessageIndex = -1;
          for (let i = prev.length - 1; i >= 0; i--) {
            const existingMsg = prev[i];
            if (
              existingMsg.id < 0 &&
              existingMsg.text === msg.text &&
              existingMsg.senderId === msg.senderId
            ) {
              tempMessageIndex = i;
              break;
            }
          }

          if (tempMessageIndex !== -1) {
            // Replace the temporary message with the real one
            const newMessages = [...prev];
            newMessages[tempMessageIndex] = messageWithReceiverId;
            return newMessages;
          }
        }

        // If it's not a replacement, add as new message
        // Only add if it's from the current contact
        if (msg.senderId === Number(contactId)) {
          return [...prev, messageWithReceiverId];
        }
        return prev;
      });
    });

    chatService.onSeenMessage((messageIds, isSeen) => {
      setMessages((prev) =>
        prev.map((msg) => {
          // Case 1: Update existing messages with real IDs (for seen/unseen status)
          if (messageIds.includes(msg.id)) {
            return { ...msg, seen: isSeen };
          }

          // Case 2: Replace temporary messages (negative IDs) with real message IDs
          // This happens when sender gets response for their sent message
          if (msg.id < 0 && messageIds.length === 1) {
            return { ...msg, id: messageIds[0], seen: isSeen };
          }

          return msg;
        })
      );
    });
  }, [token, contactId, chatService]);

  useEffect(() => {
    if (!contactId) return;
    chatService.openPrivateChat(Number(contactId));
    return () => {
      chatService.closePrivateChat(Number(contactId));
    };
  }, [contactId, chatService]);

  const handleSend = async (msg: string) => {
    if (msg.trim() && contactId) {
      const tempId = -Date.now();
      const currentUserId = getToken() ? getUserInfo()?.id ?? 0 : 0;

      // Add temporary message
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
        height: "100%",
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
        contactId={contactId ? Number(contactId) : undefined}
      />
      <MainChat messages={messages} loading={loading} />
      <Box sx={{ position: "relative", zIndex: 5, backgroundColor: "#fff" }}>
        <ChatInput onSend={handleSend} />
      </Box>
    </Box>
  );
};

export default ChatPage;

import { useEffect, useState } from "react";
import { Box, Snackbar } from "@mui/material";
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
  isFile?: boolean;
  filePath?: string;
  downloadUrl?: string;
  isUploading?: boolean;
  tempKey?: string;
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

const fileURLPrefix = "http://62.60.213.13:9000/eduguide/ChatFiles/";

const ChatPage = () => {
  const token = String(getToken());
  const { contactId } = useParams<{ contactId: string }>();
  const chatService = useChatService();
  const { contacts } = useContacts();
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [contactInfo, setContactInfo] = useState<{
    name: string;
    avatarUrl?: string;
  }>({
    name: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("ChatPage rendered, contactId:", contactId, "chatService:", !!chatService);
    if (!contactId) {
      console.warn("No contactId provided");
      return;
    }
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
  }, [chatService, contactId, contacts]);

  useEffect(() => {
    if (!contactId) {
      console.warn("No contactId for fetching messages");
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const response = await getMessages(token, Number(contactId));
        if (response.isSuccess && Array.isArray(response.value)) {
          setMessages(response.value.map((msg: { isFile: unknown; filePath: string; text: string | number | boolean; }) => ({
            ...msg,
            isUploading: false,
            filePath: msg.isFile && msg.filePath && !msg.filePath.endsWith('/') ? `${msg.filePath}/` : msg.filePath,
            downloadUrl: msg.isFile ? `${fileURLPrefix}${msg.filePath.replace("ChatFiles/", "")}/${encodeURIComponent(msg.text)}` : "",
          })));
          console.log("Messages from getMessages:", response.value);
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

      console.log("Received message:", msg);
      const currentUserId = parseInt(String(getUserInfo()?.id ?? "0"));
      // Skip sender's own file messages to avoid overwriting local update
      if (msg.senderId === currentUserId && msg.isFile) {
        return;
      }
      const newMessage = {
        ...msg,
        receiverId: Number(contactId),
        isUploading: false,
      };
      console.log("Adding message to state:", newMessage);
      setMessages((prev) => [...prev, newMessage]);

<!--       setMessages((prev) => {
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
      }); -->

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

      const tempId = `temp-${Date.now()}`;
      const currentUserId = parseInt(String(getUserInfo()?.id ?? "0"));

      // Add temporary message
      setMessages((prev) => [
        ...prev,
        {
          id: -Date.now(),
          receiverId: Number(contactId),
          senderId: currentUserId,
          seen: false,
          text: msg,
          sendDate: formatJalaliDate(new Date()),
          isFile: false,
          isUploading: false,
          tempKey: tempId,
        },
      ]);

      await chatService.sendMessage(msg, contactId);
    }
  };

  const handleSendFile = async (file: File) => {
    if (contactId) {
      console.log("Sending file:", file.name);
      const tempId = `temp-${Date.now()}-${file.name}`;
      const currentUserId = parseInt(String(getUserInfo()?.id ?? "0"));
      setMessages((prev) => [
        ...prev,
        {
          id: -Date.now(),
          receiverId: Number(contactId),
          senderId: currentUserId,
          seen: false,
          text: file.name,
          sendDate: formatJalaliDate(new Date()),
          isFile: true,
          filePath: "",
          downloadUrl: "",
          isUploading: true,
          tempKey: tempId,
        },
      ]);
      try {
        const filePath = await chatService.sendFile(file, contactId);
        const downloadUrl = `${fileURLPrefix}${filePath.replace("ChatFiles/", "")}/${encodeURIComponent(file.name)}`;
        console.log("File uploaded:", { filePath, downloadUrl });
        setMessages((prev) =>
          prev.map((msg) =>
            msg.tempKey === tempId
              ? {
                  ...msg,
                  id: -Date.now(),
                  text: file.name,
                  filePath: filePath.endsWith('/') ? filePath : `${filePath}/`,
                  downloadUrl: downloadUrl,
                  isUploading: false,
                  tempKey: undefined,
                }
              : msg
          )
        );
      } catch (error) {
        console.error("File upload error:", error);
        setError("خطا در ارسال فایل: " + ((error as Error).message || "خطای ناشناخته"));
        setMessages((prev) => prev.filter((m) => m.tempKey !== tempId));
      }
    } else {
      console.warn("No contactId for sending file");
      setError("لطفا یک مخاطب انتخاب کنید");
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
        <ChatInput onSend={handleSend} onSendFile={handleSendFile} disabled={!contactId} />
      </Box>
      <Snackbar
        open={!!error}
        message={error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      />
    </Box>
  );
};

export default ChatPage;
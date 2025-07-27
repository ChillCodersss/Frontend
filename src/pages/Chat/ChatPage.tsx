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
  const [tempFileNames, setTempFileNames] = useState<Map<string, string>>(new Map());

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
  }, [contactId, contacts]);

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
          setMessages(response.value.map((msg) => ({ ...msg, isUploading: false })));
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
      setMessages((prev) => {
        // Match temporary message by tempKey
        const tempIndex = prev.findIndex((m) => m.tempKey === msg.tempKey);
        if (tempIndex !== -1) {
          const tempKey = prev[tempIndex].tempKey!;
          const fileName = tempFileNames.get(tempKey) || msg.text;
          const newMessages = [...prev];
          newMessages[tempIndex] = {
            ...msg,
            text: fileName,
            isUploading: false,
            tempKey: undefined,
          };
          setTempFileNames((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(tempKey);
            return newMap;
          });
          return newMessages;
        }
        // For receiver, use filePath to get file name
        const fileName = msg.isFile ? (tempFileNames.get(msg.filePath || "") || msg.text) : msg.text;
        return [...prev, { ...msg, text: fileName, isUploading: false }];
      });
    });

    chatService.onSeenMessage((messageIds, isSeen) => {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIds.includes(msg.id) ? { ...msg, seen: isSeen } : msg
        )
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
      const currentUserId = parseInt(getToken() ? getUserInfo()?.id || "0" : "0");
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
      const currentUserId = parseInt(getToken() ? getUserInfo()?.id || "0" : "0");
      setTempFileNames((prev) => new Map(prev).set(tempId, file.name));
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
          isUploading: true,
          tempKey: tempId,
        },
      ]);
      try {
        const filePath = await chatService.sendFile(file, contactId);
        // Store file name with filePath for receiver
        setTempFileNames((prev) => new Map(prev).set(filePath, file.name));
      } catch (error) {
        setError("خطا در ارسال فایل: " + ((error as Error).message || "خطای ناشناخته"));
        setMessages((prev) => prev.filter((m) => m.tempKey !== tempId));
        setTempFileNames((prev) => {
          const newMap = new Map(prev);
          newMap.delete(tempId);
          return newMap;
        });
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
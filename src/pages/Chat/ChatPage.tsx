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

interface ApiMessage {
  id: number;
  receiverId: number;
  senderId: number;
  seen: boolean;
  text: string;
  sendDate: string;
  isFile?: boolean;
  filePath?: string | null;
  fileUrl?: string | null;
  isUploading?: boolean;
  tempKey?: string;
  downloadUrl?: string | null; // Added for compatibility with ChatBubble
}

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
          setMessages(
            response.value.map(
              (msg: {
                id: number;
                receiverId: number;
                senderId: number;
                seen: boolean;
                text: string;
                sendDate: string;
                isFile?: boolean;
                filePath?: string | null;
                fileUrl?: string | null;
              }) => ({
                ...msg,
                isUploading: false,
                filePath: msg.isFile ? msg.filePath : null,
                fileUrl: msg.isFile ? msg.fileUrl : null,
                downloadUrl: msg.isFile ? msg.fileUrl : null, // Use fileUrl as downloadUrl
              })
            )
          );
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
      const currentUserId = parseInt(String(getUserInfo()?.id ?? "0"));

      if (msg.senderId === currentUserId) {
        return;
      }

      const newMessage = {
        ...msg,
        receiverId: Number(contactId),
        isUploading: false,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    chatService.onSeenMessage((messageIds, isSeen) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (messageIds.includes(msg.id)) {
            return { ...msg, seen: isSeen };
          }
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
          filePath: undefined,
          downloadUrl: undefined,
          isUploading: true,
          tempKey: tempId,
        },
      ]);
      try {
        const filePath = await chatService.sendFile(file, contactId);
        const downloadUrl = `${fileURLPrefix}${filePath.replace(
          "ChatFiles/",
          ""
        )}/${encodeURIComponent(file.name)}`;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.tempKey === tempId
              ? {
                  ...msg,
                  text: file.name,
                  filePath,
                  downloadUrl,
                  isUploading: false,
                  tempKey: undefined,
                }
              : msg
          )
        );
      } catch (error) {
        console.error("File upload error:", error);
        setError(
          "خطا در ارسال فایل: " + ((error as Error).message || "خطای ناشناخته")
        );
        setMessages((prev) =>
          prev.map((msg) =>
            msg.tempKey === tempId
              ? {
                  ...msg,
                  isUploading: false,
                  text: `${file.name} (خطا در بارگذاری)`,
                }
              : msg
          )
        );
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
        <ChatInput
          onSend={handleSend}
          onSendFile={handleSendFile}
          disabled={!contactId}
        />
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

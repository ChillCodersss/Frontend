import { Box } from "@mui/material";
import chatBackGround from "@/assets/chatBackGround.png";
import ChatBubble, { ChatBubbleProps } from "./ChatBubble";
import ChatInput from "./ChatInput";
import { getUserInfo } from "@/services/auth";

interface ApiMessage {
  id: number;
  receiverId: number;
  senderId: number;
  seen: boolean;
  text: string;
  sendDate: string;
}

interface MainChatProps {
  messages: ApiMessage[];
  handleSend: (message: string) => void;
  loading?: boolean;
}

const MainChat = ({ messages, handleSend, loading }: MainChatProps) => {
  const currentUser = getUserInfo();
  const currentUserId = currentUser?.id;
  const isStudent = currentUser?.role === "Student";
  const mappedMessages: ChatBubbleProps[] = messages.map((msg) => ({
    id: msg.id,
    text: msg.text,
    isOwn: Number(msg.senderId) === Number(currentUserId),
    seen: msg.seen,
    sendDate: msg.sendDate,
    isStudent,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        position: "relative",
        backgroundImage: `url(${chatBackGround})`,
        backgroundSize: "200px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.8)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* chat bubbles */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: mappedMessages.length === 0 ? "center" : "flex-end",
          alignItems: mappedMessages.length === 0 ? "center" : "stretch",
        }}
      >
        {loading ? (
          <Box
            sx={{
              zIndex: 3,
              color: "#888",
              fontSize: "1.2rem",
              background: "rgba(255,255,255,0.9)",
              borderRadius: 2,
              padding: "16px 32px",
              boxShadow: 1,
            }}
          >
            در حال بارگذاری
          </Box>
        ) : mappedMessages.length === 0 ? (
          <Box
            sx={{
              zIndex: 3,
              color: "#888",
              fontSize: "1.2rem",
              background: "rgba(255,255,255,0.9)",
              borderRadius: 2,
              padding: "16px 32px",
              boxShadow: 1,
            }}
          >
            شما پیامی ندارید
          </Box>
        ) : (
          mappedMessages.map((msg, idx) => (
            <Box
              key={msg.id}
              sx={{
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(20px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
                animation: "fadeIn 0.5s cubic-bezier(0.4,0,0.2,1)",
                animationDelay: `${idx * 40}ms`,
                animationFillMode: "both",
              }}
            >
              <ChatBubble {...msg} />
            </Box>
          ))
        )}
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 5,
          backgroundColor: "#fff",
        }}
      >
        <ChatInput onSend={handleSend} />
      </Box>
    </Box>
  );
};

export default MainChat;

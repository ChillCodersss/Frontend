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
}

const MainChat = ({ messages, handleSend }: MainChatProps) => {
  const currentUserId = getUserInfo()?.id;
  const mappedMessages: ChatBubbleProps[] = messages.map((msg) => ({
    id: msg.id,
    text: msg.text,
    isOwn: msg.senderId === currentUserId,
    seen: msg.seen,
    sendDate: msg.sendDate,
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
        {mappedMessages.length === 0 ? (
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
          mappedMessages.map((msg) => <ChatBubble key={msg.id} {...msg} />)
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

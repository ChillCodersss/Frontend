import { Box } from "@mui/material";
import chatBackGround from "@/assets/chatBackGround.png";
import ChatBubble, { ChatBubbleProps } from "./ChatBubble";
import ChatInput from "./ChatInput";

interface MainChatProps {
  messages: ChatBubbleProps[];
  handleSend: (message: string) => void;
}

const MainChat = ({ messages, handleSend }: MainChatProps) => (
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
        justifyContent: "flex-end",
      }}
    >
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} {...msg} />
      ))}
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

export default MainChat;

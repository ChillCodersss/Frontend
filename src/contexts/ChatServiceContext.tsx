import React, { createContext, useContext, useRef } from "react";
import { ChatService } from "@/services/chat";
import { getToken } from "@/services/auth";

// Create the context type
interface ChatServiceContextType {
  chatService: ChatService;
}

const ChatServiceContext = createContext<ChatServiceContextType | undefined>(undefined);

export const useChatService = () => {
  const context = useContext(ChatServiceContext);
  if (!context) {
    throw new Error("useChatService must be used within a ChatServiceProvider");
  }
  return context.chatService;
};

export const ChatServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Only create one ChatService instance for the lifetime of the provider
  const chatServiceRef = useRef<ChatService | null>(null);
  if (!chatServiceRef.current) {
    const token = String(getToken());
    chatServiceRef.current = new ChatService(token);
  }

  return (
    <ChatServiceContext.Provider value={{ chatService: chatServiceRef.current }}>
      {children}
    </ChatServiceContext.Provider>
  );
};

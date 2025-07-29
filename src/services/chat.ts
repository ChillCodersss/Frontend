import * as signalR from "@microsoft/signalr";

const baseURL = "62.60.213.13:8080";

export const getContacts = async (
  token: string,
  PageSize: number,
  PageIndex: number
) => {
  const url = new URL(`http://${baseURL}/api/Messages/contacts`);
  url.searchParams.append("PageSize", String(PageSize));
  url.searchParams.append("PageIndex", String(PageIndex));
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("خطا در ارتباط با سرور:", response.statusText);
    throw new Error("Failed to fetch contacts");
  }

  return response.json();
};

export const getMessages = async (token: string, contactId: number) => {
  const url = new URL(`http://${baseURL}/api/Messages/${contactId}`);
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("خطا در ارتباط با سرور:", response.statusText);
    throw new Error("Failed to fetch messages");
  }

  return response.json();
};

export class ChatService {
  private connection: signalR.HubConnection;
  private jwtToken: string;

  private onReceivePrivateMessageHandler?: (message: {
    id: number;
    receiverId: number;
    senderId: number;
    seen: boolean;
    text: string;
    sendDate: string;
    isFile?: boolean;
    filePath?: string;
    downloadUrl?: string;
    tempKey?: string;
  }) => void;
  private onSeenMessageHandler?: (
    messageIds: number[],
    isSeen: boolean
  ) => void;
  private onReceiveOnlineContactsHandler?: (onlineContactIds: number[]) => void;
  private onReceiveUserStatusChangeHandler?: (
    userId: number,
    isOnline: boolean
  ) => void;

  public constructor(token: string) {
    this.jwtToken = token;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://${baseURL}/chat?access_token=${token}`, {})
      .build();

    this.connection.on(
      "ReceivePrivateMessage",
      (text, senderName, senderId, sendDate) => {
        const isFile = text.startsWith("http://62.60.213.13");
        let filePath = "";
        let downloadUrl = "";
        let messageText = text;
        if (isFile) {
          try {
            const urlObj = new URL(text);
            const pathParts = urlObj.pathname.split("/");
            const fileIndex = pathParts.indexOf("ChatFiles");
            if (fileIndex !== -1 && pathParts.length > fileIndex + 1) {
              filePath = pathParts.slice(fileIndex).join("/");
              downloadUrl = text;
              messageText = decodeURIComponent(
                pathParts[pathParts.length - 1].split("?")[0]
              );
            } else {
              throw new Error("Invalid file path structure");
            }
          } catch (error) {
            console.error("Error parsing file URL:", error);
            filePath = "";
            downloadUrl = text;
            messageText = "فایل ارسالی";
          }
        }

        if (this.onReceivePrivateMessageHandler) {
          this.onReceivePrivateMessageHandler({
            id: Date.now(),
            receiverId: 0,
            senderId: senderId ?? 0,
            seen: false,
            text: messageText,
            sendDate,
            isFile,
            filePath: filePath || undefined,
            downloadUrl: downloadUrl || undefined,
            tempKey: undefined,
          });
        }
      }
    );

    this.connection.on("SeenMessage", (messageIds, isSeen) => {
      if (this.onSeenMessageHandler) {
        this.onSeenMessageHandler(messageIds, isSeen);
      }
    });

    this.connection.on("ReceiveOnlineContacts", (onlineContactIds) => {
      if (this.onReceiveOnlineContactsHandler) {
        this.onReceiveOnlineContactsHandler(onlineContactIds);
      }
    });

    this.connection.on("ReceiveUserStatusChange", (userId, isOnline) => {
      if (this.onReceiveUserStatusChangeHandler) {
        this.onReceiveUserStatusChangeHandler(userId, isOnline);
      }
    });

    this.connection.onclose(() => {
      console.log("Connection closed");
    });
  }

  public onReceivePrivateMessage(
    handler: (message: {
      id: number;
      receiverId: number;
      senderId: number;
      seen: boolean;
      text: string;
      sendDate: string;
      isFile?: boolean;
      filePath?: string;
      downloadUrl?: string;
      tempKey?: string;
    }) => void
  ) {
    this.onReceivePrivateMessageHandler = handler;
  }

  public onSeenMessage(
    handler: (messageIds: number[], isSeen: boolean) => void
  ) {
    this.onSeenMessageHandler = handler;
  }

  public onReceiveOnlineContacts(
    handler: (onlineContactIds: number[]) => void
  ) {
    this.onReceiveOnlineContactsHandler = handler;
  }

  public onReceiveUserStatusChange(
    handler: (userId: number, isOnline: boolean) => void
  ) {
    this.onReceiveUserStatusChangeHandler = handler;
  }

  private async uploadMessageFile(token: string, file: File): Promise<string> {
    const url = new URL(`http://${baseURL}/api/Messages/upload`);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error("خطا در بارگذاری فایل:", response.statusText);
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    const filePath = await response.text();

    if (!filePath) {
      console.error("مسیر فایل در پاسخ سرور یافت نشد");
      throw new Error("File path not found in server response");
    }

    return filePath;
  }

  public async sendFile(file: File, receiverId: string): Promise<string> {
    try {
      const filePath = await this.uploadMessageFile(this.jwtToken, file);
      await this.connection.invoke(
        "SendPrivateMessage",
        file.name,
        Number(receiverId),
        true,
        filePath
      );
      return filePath;
    } catch (error) {
      console.error("Error sending file:", error);
      throw error;
    }
  }

  public async sendMessage(message: string, receiverId: string): Promise<void> {
    try {
      await this.connection.invoke(
        "SendPrivateMessage",
        message,
        Number(receiverId),
        false,
        ""
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  public async openPrivateChat(contactId: number): Promise<boolean> {
    try {
      return await this.connection.invoke("OpenPrivateChat", contactId);
    } catch (error) {
      console.error("Error opening private chat:", error);
      return false;
    }
  }

  public async closePrivateChat(contactId: number): Promise<boolean> {
    try {
      return await this.connection.invoke("ClosePrivateChat", contactId);
    } catch (error) {
      console.error("Error closing private chat:", error);
      return false;
    }
  }
}

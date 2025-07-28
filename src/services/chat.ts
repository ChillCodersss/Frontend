import * as signalR from "@microsoft/signalr";

const baseURL = "62.60.213.13:8080";

export const getContacts = async (
  token: string,
  PageSize: number,
  PageIndex: number
) => {
  const url = new URL(`http://${baseURL}/api/Messages/contacts`);
  url.searchParams.append("PageSize", PageSize.toString());
  url.searchParams.append("PageIndex", PageIndex.toString());
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("خطا در ارتباط با سرور");
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
    console.log("خطا در ارتباط با سرور");
  }

  return response.json();
};

export class ChatService {
  private connection: signalR.HubConnection;
  private jwtToken: string;

  // Handlers for events
  private onReceivePrivateMessageHandler?: (message: {
    id: number;
    receiverId: number;
    senderId: number;
    seen: boolean;
    text: string;
    sendDate: string;
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
      .configureLogging(signalR.LogLevel.Information) // for debugging
      .build();

    this.connection.on(
      "ReceivePrivateMessage",
      (text, senderName, senderId) => {
        if (this.onReceivePrivateMessageHandler) {
          this.onReceivePrivateMessageHandler({
            id: 0, // Will be updated when SeenMessage is received
            receiverId: 0, // Will be set by the caller
            senderId: senderId ?? 0,
            seen: false,
            text: text ?? "",
            sendDate: new Date().toISOString(),
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
      console.log("error in uplaoding file");
    }

    return String(response);
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

  public async sendFile(file: File, receiverId: string): Promise<void> {
    const filePath = await this.uploadMessageFile(this.jwtToken, file);
    try {
      await this.connection.invoke(
        "SendPrivateMessage",
        `${file.name}`,
        Number(receiverId),
        true,
        `${filePath}`
      );
    } catch (error) {
      console.error("Error sending file:", error);
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

import { io } from "socket.io-client";

export class socketClient {
  static socketService;
  static client;

  static getInstance() {
    if (!socketClient.socketService) {
      socketClient.socketService = new socketClient();
    }

    return socketClient.socketService;
  }

  getSocketClient(userName) {
    if (!socketClient.client) {
      return (socketClient.client = io("http://localhost:3030/", {
        closeOnBeforeunload: true,
        query: {
          userName: userName,
        },
      }));
    }

    return socketClient.client;
  }
}

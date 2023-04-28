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

  getSocketClient() {
    if (!socketClient.client) {
      return (socketClient.client = io("http://localhost:3030/"));
    }

    return socketClient.client;
  }
}

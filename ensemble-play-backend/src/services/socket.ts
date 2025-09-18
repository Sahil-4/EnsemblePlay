import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { ClientToServerEvents, ServerToClientEvents } from "../types/index.js";

let io: Server<ClientToServerEvents, ServerToClientEvents> | null = null;

const initiateSocketIO = (httpServer: HttpServer) => {
  // new socket io instance
  io = new Server(httpServer, {
    pingTimeout: 60000,
  });

  // handle session
  io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    // manage session

    // handle disconnection
    socket.on("disconnect", () => {});
  });
};

const getIOInstance = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};

export { initiateSocketIO, getIOInstance };

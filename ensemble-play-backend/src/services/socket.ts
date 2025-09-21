import { Server } from "socket.io";
import type { Socket } from "socket.io";
import type { Server as HttpServer } from "http";
import Room from "../models/Room.js";
import Viewer from "../models/Viewer.js";
import Message from "../models/Message.js";
import { SocketResponse } from "../utils/index.js";
import type { ClientToServerEvents, ServerToClientEvents } from "../types/index.js";

let io: Server<ClientToServerEvents, ServerToClientEvents> | null = null;

const roomsMap = new Map<string, Room>();
const userSocketId2RoomId = new Map<string, string>();

const initiateSocketIO = (httpServer: HttpServer) => {
  // new socket io instance
  io = new Server(httpServer, {
    pingTimeout: 60000,
  });

  // handle session
  io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    // manage session

    socket.emit(
      "connected",
      new SocketResponse(true, { message: "connected to the Socket.IO server" })
    );

    // create-room (host-viewer -> server) { displayName }
    socket.on("create-room", (args) => {
      const { displayName } = args;
      const host = new Viewer(socket.id, new Date().toUTCString(), displayName);
      const room = new Room(host);
      room.addViewer(host);
      roomsMap.set(room.getRoomId(), room);
      socket.join(room.getRoomId());

      userSocketId2RoomId.set(socket.id, room.getRoomId());

      // room-created (server -> host-viewer ) { host, room }
      socket.emit("room-created", new SocketResponse(true, { host, room }));
    });

    // destroy-room (host-viewer -> server) { roomId }
    socket.on("destroy-room", (args) => {
      const { roomId } = args;
      const room = roomsMap.get(roomId);

      if (room && room.getHost().getSocketId() === socket.id) {
        for (const viewer of room.getViewersList()) {
          userSocketId2RoomId.delete(viewer.getSocketId());
        }
        roomsMap.delete(roomId);
      }

      socket.to(roomId).emit("room-destroyed", new SocketResponse(true, { roomId }));
    });

    // join-room (viewer -> server) { roomId, displayName }
    socket.on("join-room", (args) => {
      const { roomId, displayName } = args;
      const room = roomsMap.get(roomId);

      if (!room) {
        socket.emit("room-join-failed", new SocketResponse(false, { message: "room not found" }));
        return;
      }

      const viewer = new Viewer(socket.id, new Date().toUTCString(), displayName);
      room.addViewer(viewer);
      socket.join(roomId);

      userSocketId2RoomId.set(socket.id, room.getRoomId());

      // room-join-success (server -> viewer) { success: true, room }
      socket.emit("room-join-success", new SocketResponse(true, { room }));

      // viewer-joined (server -> room) { viewerSocketId, displayName }
      socket
        .to(roomId)
        .emit(
          "viewer-joined",
          new SocketResponse(true, { viewerSocketId: socket.id, displayName })
        );
    });

    // leave-room (viewer -> server) { roomId }
    socket.on("leave-room", (args) => {
      const { roomId } = args;
      const room = roomsMap.get(roomId);
      if (room) {
        room.removeViewer(socket.id);
        userSocketId2RoomId.delete(socket.id);

        // viewer-left (server -> room) { viewerSocketId }
        socket
          .to(roomId)
          .emit("viewer-left", new SocketResponse(true, { viewerSocketId: socket.id }));
      }
    });

    // viewer-ready (viewer -> server) { roomId }
    socket.on("viewer-ready", (args) => {
      const { roomId } = args;
      const room = roomsMap.get(roomId);
      if (room) {
        room.setViewerIsReady(socket.id, true);

        // viewer-ready (server -> room) { viewerSocketId }
        socket
          .to(roomId)
          .emit("viewer-ready", new SocketResponse(true, { viewerSocketId: socket.id }));
      }
    });

    // viewer-unready (viewer -> server) { roomId }
    socket.on("viewer-unready", (args) => {
      const { roomId } = args;
      const room = roomsMap.get(roomId);
      if (room) {
        room.setViewerIsReady(socket.id, false);

        // viewer-unready (server -> room) { viewerSocketId }
        socket
          .to(roomId)
          .emit("viewer-unready", new SocketResponse(true, { viewerSocketId: socket.id }));
      }
    });

    // send-message (viewer -> server) { roomId, messageContent }
    socket.on("send-message", (args) => {
      const { roomId, messageContent } = args;
      const room = roomsMap.get(roomId);
      if (!room) return;

      const viewer = room.getViewersList().find((v) => v.getSocketId() === socket.id);
      if (!viewer) return;

      const message = new Message(
        new Date().toUTCString(),
        socket.id,
        viewer.getDisplayName(),
        messageContent
      );
      room.addMessage(message);

      // receive-message (server -> room) { messageT }
      socket.to(roomId).emit("receive-message", new SocketResponse(true, { message }));
      socket.emit("receive-message", new SocketResponse(true, { message }));
    });

    // set-video-source (host -> server) { roomId, remoteURL }
    socket.on("set-video-source", (args) => {
      const { roomId, remoteURL } = args;
      const room = roomsMap.get(roomId);
      if (!room) return;

      room.setPlaybackRemoteURL(remoteURL);
      // set-video-source (server -> host) { remoteURL }
      socket.to(roomId).emit("set-video-source", new SocketResponse(true, { remoteURL }));
    });

    // get-playback-info (viewer -> server) { roomId }
    socket.on("get-playback-info", (args) => {
      const { roomId } = args;
      const room = roomsMap.get(roomId);
      if (!room) return;

      // get-playback-info (server -> viewer) { playback }
      socket.emit(
        "get-playback-info",
        new SocketResponse(true, { playback: room.getPlaybackInfo() })
      );
    });

    // play (viewer -> server) { roomId, playbackTime }
    socket.on("play", (args) => {
      const { roomId, playbackTime } = args;
      const room = roomsMap.get(roomId);
      if (!room) return;

      room
        .setPlaybackIsPlaying(true)
        .setPlaybackCurrentTime(playbackTime)
        .setPlaybackLastSynced(new Date().toUTCString());

      // play (server -> room) { playbackTime }
      socket.to(roomId).emit("play", new SocketResponse(true, { playbackTime }));
    });

    // pause (viewer -> server) { roomId, playbackTime }
    socket.on("pause", (args) => {
      const { roomId, playbackTime } = args;
      const room = roomsMap.get(roomId);
      if (!room) return;

      room
        .setPlaybackIsPlaying(false)
        .setPlaybackCurrentTime(playbackTime)
        .setPlaybackLastSynced(new Date().toUTCString());

      // pause (server -> room) { playbackTime }
      socket.to(roomId).emit("pause", new SocketResponse(true, { playbackTime }));
    });

    // seek (viewer -> server) { roomId, playbackTime }
    socket.on("seek", (args) => {
      const { roomId, playbackTime } = args;
      const room = roomsMap.get(roomId);
      if (!room) return;

      room.setPlaybackCurrentTime(playbackTime).setPlaybackLastSynced(new Date().toUTCString());

      // seek (server -> room) { playbackTime }
      socket.to(roomId).emit("seek", new SocketResponse(true, { playbackTime }));
    });

    // handle disconnection
    socket.on("disconnect", () => {
      const viewerSocketId = socket.id;
      const roomId = userSocketId2RoomId.get(viewerSocketId);
      if (!roomId) return;

      const room = roomsMap.get(roomId);
      if (!room) return;

      if (viewerSocketId === room.getHost().getSocketId()) {
        for (const viewer of room.getViewersList()) {
          userSocketId2RoomId.delete(viewer.getSocketId());
        }
        roomsMap.delete(roomId);
        io!.to(roomId).emit("room-destroyed", new SocketResponse(true, { roomId }));
      } else {
        userSocketId2RoomId.delete(socket.id);
        room.removeViewer(viewerSocketId);
        socket
          .to(roomId)
          .emit("viewer-left", new SocketResponse(true, { viewerSocketId: socket.id }));
      }
    });
  });
};

const getIOInstance = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};

export { initiateSocketIO, getIOInstance };

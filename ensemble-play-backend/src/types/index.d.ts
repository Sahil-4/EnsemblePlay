import type Room from "../models/Room.js";
import type Viewer from "../models/Viewer.js";
import type Message from "../models/Message.js";
import type Playback from "../models/Playback.js";
import type { SocketResponse } from "../utils/index.js";

// Events coming from client -> server
export interface ClientToServerEvents {
  "create-room": (args: { displayName: string }) => void;
  "destroy-room": (args: { roomId: string }) => void;
  "join-room": (args: { roomId: string; displayName: string }) => void;
  "leave-room": (args: { roomId: string }) => void;
  "viewer-ready": (args: { roomId: string }) => void;
  "viewer-unready": (args: { roomId: string }) => void;
  "send-message": (args: { roomId: string; messageContent: string }) => void;
  "set-video-source": (args: { roomId: string; remoteURL: string }) => void;
  "get-playback-info": (args: { roomId: string }) => void;
  play: (args: { roomId: string; playbackTime: number }) => void;
  pause: (args: { roomId: string; playbackTime: number }) => void;
  seek: (args: { roomId: string; playbackTime: number }) => void;
}

// Events going from server -> client
export interface ServerToClientEvents {
  connected: (res: SocketResponse<{ message: string }>) => void;
  "room-created": (res: SocketResponse<{ host: Viewer; room: Room }>) => void;
  "room-destroyed": (res: SocketResponse<{ roomId: string }>) => void;
  "room-join-success": (res: SocketResponse<{ room: Room }>) => void;
  "room-join-failed": (res: SocketResponse<{ message: string }>) => void;
  "viewer-joined": (res: SocketResponse<{ viewerSocketId: string; displayName: string }>) => void;
  "viewer-left": (res: SocketResponse<{ viewerSocketId: string }>) => void;
  "viewer-ready": (res: SocketResponse<{ viewerSocketId: string }>) => void;
  "viewer-unready": (res: SocketResponse<{ viewerSocketId: string }>) => void;
  "receive-message": (res: SocketResponse<{ message: Message }>) => void;
  "set-video-source": (res: SocketResponse<{ remoteURL: string }>) => void;
  "get-playback-info": (res: SocketResponse<{ playback: Playback }>) => void;
  play: (res: SocketResponse<{ playbackTime: number }>) => void;
  pause: (res: SocketResponse<{ playbackTime: number }>) => void;
  seek: (res: SocketResponse<{ playbackTime: number }>) => void;
}

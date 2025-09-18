import Message from "./Message.js";
import Playback from "./Playback.js";
import Viewer from "./Viewer.js";
import { getRoomCode } from "../utils/index.js";

class Room {
  _id: string;
  host: Viewer;
  expiresAt: string;
  playbackInfo: Playback;
  viewers: Array<Viewer>;
  messages: Array<Message>;

  constructor(host: Viewer) {
    this._id = getRoomCode();
    this.host = host;
    this.expiresAt = new Date(new Date().setHours(new Date().getHours() + 3)).toUTCString();
    this.playbackInfo = new Playback();
    this.viewers = new Array<Viewer>();
    this.messages = new Array<Message>();
  }

  getRoomId() {
    return this._id;
  }

  getHost() {
    return this.host;
  }

  getExpiresAt() {
    return this.expiresAt;
  }

  getPlaybackInfo() {
    return this.playbackInfo;
  }

  setPlaybackRemoteURL(remoteURL: string) {
    this.playbackInfo.setRemoteURL(remoteURL);
    return this;
  }

  setPlaybackIsPlaying(isPlaying: boolean) {
    this.playbackInfo.setIsPlaying(isPlaying);
    return this;
  }

  setPlaybackCurrentTime(currentTime: number) {
    this.playbackInfo.setCurrentTime(currentTime);
    return this;
  }

  setPlaybackLastSynced(lastSynced: string) {
    this.playbackInfo.setLastSynced(lastSynced);
    return this;
  }

  getViewersList() {
    return this.viewers;
  }

  addViewer(viewer: Viewer) {
    this.viewers.push(viewer);
    return this;
  }

  removeViewer(viewerSocketId: string) {
    this.viewers = this.viewers.filter((viewer) => viewer.socketId !== viewerSocketId);
    return this;
  }

  setViewerIsReady(SocketId: string, state: boolean) {
    const viewer = this.viewers.find((viewer) => viewer.getSocketId() === SocketId);
    viewer?.setIsReady(state);
    return this;
  }

  getMessagesList() {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    return this;
  }
}

export default Room;

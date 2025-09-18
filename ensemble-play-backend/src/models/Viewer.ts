class Viewer {
  socketId: string;
  joinedAt: string;
  isReady: boolean;
  displayName: string;

  constructor(socketId: string, joinedAt: string, displayName: string) {
    this.socketId = socketId;
    this.joinedAt = joinedAt;
    this.displayName = displayName;
    this.isReady = false;
  }

  getSocketId() {
    return this.socketId;
  }

  getJoinedAt() {
    return this.joinedAt;
  }

  getDisplayName() {
    return this.displayName;
  }

  setIsReady(state: boolean) {
    this.isReady = state;
    return this;
  }

  getIsReady() {
    return this.isReady;
  }
}

export default Viewer;

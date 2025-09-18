class Message {
  timestamp: string;
  viewerSocketId: string;
  viewerDisplayName: string;
  content: string;

  constructor(timestamp: string, viewerSocketId: string, viewerDisplayName: string, content: string) {
    this.timestamp = timestamp;
    this.viewerSocketId = viewerSocketId;
    this.viewerDisplayName = viewerDisplayName;
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getViewerSocketId() {
    return this.viewerSocketId;
  }

  getViewerDisplayName() {
    return this.viewerDisplayName;
  }
}

export default Message;

class Playback {
  remoteURL: string | null;
  isPlaying: boolean;
  currentTime: number;
  lastSynced: string | null;

  constructor() {
    this.remoteURL = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.lastSynced = null;
  }

  setRemoteURL(remoteURL: string) {
    this.remoteURL = remoteURL;
    return this;
  }

  getRemoteURL() {
    return this.remoteURL;
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
    return this;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  setCurrentTime(currentTime: number) {
    this.currentTime = currentTime;
    return this;
  }

  getCurrentTime() {
    return this.currentTime;
  }

  setLastSynced(lastSynced: string) {
    this.lastSynced = lastSynced;
    return this;
  }

  getLastSynced() {
    return this.lastSynced;
  }
}

export default Playback;

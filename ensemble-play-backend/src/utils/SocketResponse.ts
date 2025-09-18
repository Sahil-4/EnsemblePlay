class SocketResponse<T> {
  success: boolean;
  data?: T;
  error?: string;

  constructor(success: boolean, data?: T, error?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}

export default SocketResponse;

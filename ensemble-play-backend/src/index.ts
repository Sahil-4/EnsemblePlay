import app from "./app.js";
import dotenv from "dotenv";
import { initiateSocketIO } from "./services/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const httpServer = app.listen(PORT, () => {
  console.log(`Server is started on http://${HOST}:${PORT}`);
});

initiateSocketIO(httpServer);

import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import chokidar from "chokidar";
import fs from "fs/promises";
import path from "path";

// Prevent multiple socket server creation
const initSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Be more specific in production
      methods: ["GET", "POST"],
    },
  });

  const FILE_PATH = path.join(process.cwd(), "test.txt");

  console.log(FILE_PATH);

  const watcher = chokidar.watch(FILE_PATH, {
    persistent: true,
    ignoreInitial: false,
  });

  watcher.on("change", async () => {
    try {
      const fileContents = await fs.readFile(FILE_PATH, "utf8");
      io.emit("file-updated", {
        contents: fileContents,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("File read error:", error);
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Send initial file contents on connection
    const sendInitialContents = async () => {
      try {
        const initialContents = await fs.readFile(FILE_PATH, "utf8");
        socket.emit("file-updated", {
          contents: initialContents,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Initial file read error:", error);
      }
    };

    sendInitialContents();

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

// Global variable to store the socket server
let socketServerInitialized = false;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure HTTP server is created only once
  if (!socketServerInitialized) {
    const httpServer = res.socket.server.httpServer;
    initSocketServer(httpServer);
    socketServerInitialized = true;

    // Mark the socket as handled
    (res.socket as any).server.io = true;
  }

  // End the response
  res.end();
}

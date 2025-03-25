import { statSync, watchFile } from "fs";
import path from "path";
import fs from "fs/promises";

const FILE_PATH = path.join(process.cwd(), "test.txt");

export async function GET() {
  if (!statSync(FILE_PATH).isFile()) {
    return new Response("Invalid file path", { status: 400 });
  }

  const controller = new ReadableStream({
    async start(controller) {
      watchFile(FILE_PATH, { interval: 100 }, async () => {
        const fileContents = await getFileContents();
        controller.enqueue(`data: ${fileContents}\n\n`);
      });

      const fileContents = await getFileContents();

      controller.enqueue(`data: ${fileContents}\n\n`);
    },
  });

  return new Response(controller, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

const getFileContents = async () => {
  try {
    return await fs.readFile(FILE_PATH, "utf8");
  } catch (error) {
    console.error("File read error:", error);
    return "";
  }
};

import fs from "fs";

export async function POST(req: Request) {
  const data = await req.json();

  fs.writeFileSync("test.txt", data.content);

  return Response.json({
    message:
      "Conversation summary sent successfully. Continue the conversation with the user.",
  });
}

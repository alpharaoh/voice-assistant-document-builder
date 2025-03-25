import { agentSystemPrompt } from "@/app/agent/prompt";

if (!process.env.ULTRAVOX_API_KEY) {
  throw new Error("ULTRAVOX_API_KEY is not set");
}

export async function GET() {
  return Response.json({ data: "hello" });
}

export async function POST() {
  const options = {
    method: "POST",
    headers: {
      "X-API-Key": process.env.ULTRAVOX_API_KEY as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemPrompt: agentSystemPrompt,
      temperature: 0,
      model: "fixie-ai/ultravox",
      voice: "91fa9bcf-93c8-467c-8b29-973720e3f167",
      initialMessages: [],
      timeExceededMessage:
        "Hey, I'm sorry, but I've run out of time to respond to your request. Please try again later.",
      selectedTools: [], // TODO(Akaam): Add tools
      recordingEnabled: true,
      transcriptOptional: true,
      initialOutputMedium: "MESSAGE_MEDIUM_VOICE",
      firstSpeakerSettings: {
        user: {},
        agent: {
          uninterruptible: true,
          text: "Hey, what would you like to build today?",
        },
      },
      experimentalSettings: {},
      metadata: {},
    }),
  };

  const result = await fetch("https://api.ultravox.ai/api/calls", options).then(
    (response) => response.json(),
  );

  console.log(result);

  return result.callId;
}

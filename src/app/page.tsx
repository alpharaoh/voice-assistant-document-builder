"use client";

import { useQuery } from "@tanstack/react-query";
import { UltravoxSession } from "ultravox-client";

const session = new UltravoxSession();

export default function Home() {
  const { data: callId, isLoading } = useQuery<string>({
    queryKey: ["callId"],
    queryFn: async () => {
      const agentCall = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await agentCall.json();
    },
  });

  console.log(callId);

  return (
    <div className="w-dvw h-dvh flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      hello {callId}
      <button onClick={() => session.leaveCall()}>Leave</button>
    </div>
  );
}

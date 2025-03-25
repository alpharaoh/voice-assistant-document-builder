"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { UltravoxSession } from "ultravox-client";
import { ScaleLoader } from "react-spinners";

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
    retry: false,
  });

  console.log(callId);

  return (
    <div className="w-dvw h-dvh flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      {isLoading && <ScaleLoader color="#3f3f46" width={3} height={25} />}
      <Button onClick={() => session.leaveCall()}>Leave call</Button>
    </div>
  );
}

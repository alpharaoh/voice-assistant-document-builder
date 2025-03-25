"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UltravoxSession, UltravoxSessionStatus } from "ultravox-client";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function Home() {
  const [session, setSession] = useState<UltravoxSession>();

  useEffect(() => {
    setSession(new UltravoxSession());
  }, []);

  const {
    mutate: createCall,
    isPending,
    data,
  } = useMutation<{ callId: string; joinUrl: string }>({
    mutationFn: async () => {
      const agentCall = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const agentCallData = await agentCall.json();

      return agentCallData;
    },
    retry: false,
  });

  const isCallActive =
    data?.callId &&
    session &&
    session.status !== UltravoxSessionStatus.DISCONNECTED &&
    session.status !== UltravoxSessionStatus.DISCONNECTING;

  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      {isPending && <ScaleLoader color="#3f3f46" width={3} height={25} />}
      <div className="flex items-center justify-center gap-2 text-center">
        <Button onClick={() => createCall()}>Start call</Button>
        {isCallActive && (
          <>
            <Button onClick={() => session.joinCall(data.joinUrl)}>
              Join call
            </Button>
            <Button onClick={() => session.leaveCall()}>Leave call</Button>
          </>
        )}
      </div>
    </div>
  );
}

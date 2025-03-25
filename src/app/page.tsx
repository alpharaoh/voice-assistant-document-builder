"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UltravoxSession, UltravoxSessionStatus } from "ultravox-client";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { PhoneOff, Play } from "lucide-react";

export default function Home() {
  const [session, setSession] = useState<UltravoxSession>();

  useEffect(() => {
    setSession(new UltravoxSession());
  }, []);

  const { mutate: createCall, isPending } = useMutation({
    mutationFn: async () => {
      const agentCall = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const agentCallData = await agentCall.json();

      session?.joinCall(agentCallData.joinUrl);
    },
    retry: false,
  });

  const loading = isPending || !session?.status;
  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      {loading && (
        <ScaleLoader color="#3f3f46" width={3} height={25} className="pb-2" />
      )}

      {session?.status && (
        <span className="capitalize">Status: {session?.status}</span>
      )}

      <div className="flex items-center justify-center gap-2 text-center mt-3">
        {session?.status === UltravoxSessionStatus.DISCONNECTED ? (
          <Button onClick={() => createCall()}>
            <Play fill="white" size={10} /> Start call
          </Button>
        ) : (
          <Button onClick={() => session?.leaveCall()}>
            <PhoneOff fill="white" size={10} />
            Leave call
          </Button>
        )}
      </div>
    </div>
  );
}

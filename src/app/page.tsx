"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UltravoxSession, UltravoxSessionStatus } from "ultravox-client";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { PhoneCall, PhoneOff } from "lucide-react";
import { CallStatusBadge } from "@/components/call-status-badge";
import { Editor } from "@/components/editor";
import { Card } from "@/components/ui/card";

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
    <div className="w-dvw h-dvh flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] bg-zinc-100">
      {loading && <ScaleLoader color="#3f3f46" width={3} height={25} />}

      <div className="flex h-full w-full">
        <div className="flex flex-col items-center gap-2 text-center px-20 mt-10">
          {session?.status && <CallStatusBadge status={session.status} />}

          <div className="flex items-center justify-center gap-2 text-center">
            {session?.status === UltravoxSessionStatus.DISCONNECTED ? (
              <Button onClick={() => createCall()}>
                <PhoneCall /> Start call
              </Button>
            ) : (
              <Button onClick={() => session?.leaveCall()} variant="outline">
                <PhoneOff /> End call
              </Button>
            )}
          </div>
        </div>

        <div className="p-5 w-full h-full">
          <Card className="h-full w-full p-10 flex flex-col flex-1">
            <Editor />
          </Card>
        </div>
      </div>
    </div>
  );
}

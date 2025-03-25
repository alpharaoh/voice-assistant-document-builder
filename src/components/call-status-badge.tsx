import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { UltravoxSessionStatus } from "ultravox-client";

const STATUS_CONFIG = {
  [UltravoxSessionStatus.DISCONNECTED]: {
    color: "bg-slate-200 text-slate-800",
    label: "Disconnected",
  },
  [UltravoxSessionStatus.DISCONNECTING]: {
    color: "bg-amber-200 text-amber-800",
    label: "Disconnecting",
  },
  [UltravoxSessionStatus.CONNECTING]: {
    color: "bg-blue-200 text-blue-800",
    label: "Connecting",
  },
  [UltravoxSessionStatus.IDLE]: {
    color: "bg-slate-200 text-slate-800",
    label: "Idle",
  },
  [UltravoxSessionStatus.LISTENING]: {
    color: "bg-green-200 text-green-800",
    label: "Listening",
  },
  [UltravoxSessionStatus.THINKING]: {
    color: "bg-purple-200 text-purple-800",
    label: "Thinking",
  },
  [UltravoxSessionStatus.SPEAKING]: {
    color: "bg-rose-200 text-rose-800",
    label: "Speaking",
  },
};

interface CallStatusBadgeProps {
  status: UltravoxSessionStatus;
}

export const CallStatusBadge: FC<CallStatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];

  return (
    <Badge
      className={`${config.color} capitalize px-3 py-1 text-xs font-medium`}
    >
      {config.label}
    </Badge>
  );
};

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";
import { icons } from "lucide-react";

type LogType = "info" | "error" | "warning" | "success";
type Log = {
  id: number;
  message: string;
  date: string;
  icon: keyof typeof icons;
  type: LogType;
};

const logs: Log[] = [
  {
    id: 1,
    message: "Hesabınız GRKNSOFT ile ilişkilendirildi.",
    date: "2021-08-17T20:00:00Z",
    type: "success",
    icon: "Terminal",
  },
  {
    id: 2,
    message: "Hesabınız onaylandı.",
    icon: "BadgeCheck",
    date: "2021-08-17T20:00:00Z",
    type: "success",
  },
  {
    id: 3,
    message: "Kurumsal hesaba geçiş yaptınız.",
    date: "2021-08-17T20:00:00Z",
    type: "warning",
    icon: "Building2",
  },
  {
    id: 4,
    message: "Profil fotoğrafınızı güncellediniz.",
    date: "2021-08-17T20:00:00Z",
    type: "info",
    icon: "UserRound",
  },
  {
    id: 5,
    message: "Hesabınızı oluşturdunuz.",
    date: "2021-08-17T20:00:00Z",
    type: "info",
    icon: "UserRoundPlus",
  },
];

export default function Logs() {
  return (
    <div className="p-8 ml-6 flex flex-col gap-8 w-full">
      <h1 className="text-3xl font-bold">Kayıtlar</h1>

      <div className="w-full space-y-2">
        {logs.map((log: Log) => (
          <LogCard log={log} key={log.id} />
        ))}
      </div>
    </div>
  );
}
function LogCard({ log }: { log: Log }) {
  return (
    <Alert
      className={cn(
        "w-full",
        log.type === "info" && "bg-blue-100",
        log.type === "error" && "bg-red-100",
        log.type === "warning" && "bg-yellow-100",
        log.type === "success" && "bg-green-100"
      )}
    >
      <Icon name={log.icon} size={16} />
      <AlertTitle>{log.message}</AlertTitle>
      <AlertDescription>
        Tarih:
        {new Date(log.date).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "2-digit",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </AlertDescription>
    </Alert>
  );
}

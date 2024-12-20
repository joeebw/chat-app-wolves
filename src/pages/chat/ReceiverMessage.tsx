import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import formatMessageTime from "@/lib/formatMessageTime";
import { Message } from "@/ts/types";
import { useState } from "react";

type Props = {
  message: Message;
};

export default function ReceiverMessage({ message }: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      key={message.id}
      className={`flex gap-3 max-w-[${
        message.type === "image" ? "70%" : "50%"
      }]`}
    >
      <Avatar className="w-9 h-9">
        <AvatarImage
          src={message.senderPhotoURL || "https://avatar.iran.liara.run/public"}
        />
        <AvatarFallback>{message.senderName?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <div>
        {message.type === "image" ? (
          <>
            {imageLoading && (
              <Skeleton className="w-[14rem] h-[20rem] bg-blue-900" />
            )}
            <img
              src={message.content}
              alt="shared"
              className="w-full rounded-2xl"
              onLoad={() => setImageLoading(false)}
            />
          </>
        ) : (
          <Card className="self-start border-none bg-card-secondary">
            <CardContent className="p-3">{message.content}</CardContent>
          </Card>
        )}
        <span className="text-sm text-gray-300">
          {formatMessageTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

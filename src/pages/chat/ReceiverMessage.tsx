import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import formatMessageTime from "@/lib/formatMessageTime";
import { Message } from "@/ts/types";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  message: Message;
};

export default function ReceiverMessage({ message }: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div key={message.id} className="flex gap-3 max-w-[64%]">
      <Avatar className="w-9 h-9">
        <AvatarImage
          src={message.senderPhotoURL || "https://avatar.iran.liara.run/public"}
        />
        <AvatarFallback>{message.senderName?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <div>
        {message.type === "image" ? (
          <Card className="border-none bg-primary">
            <CardContent className="p-1.5">
              <div
                className={clsx(
                  "relative",
                  imageLoading ? "w-[14rem] h-[20rem]" : "w-full h-full"
                )}
              >
                {imageLoading && (
                  <Skeleton className="absolute z-20 w-full h-full bg-primary" />
                )}
                <img
                  src={message.content}
                  alt="shared"
                  className={clsx(
                    "w-full rounded-2xl",
                    imageLoading && "hidden"
                  )}
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            </CardContent>
          </Card>
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

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import formatMessageTime from "@/lib/formatMessageTime";
import { Message } from "@/ts/types";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  message: Message;
};

export default function SenderMessage({ message }: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="self-end max-w-[55%]">
      <Card className="border-none bg-blue-950">
        <CardContent className="p-1.5">
          {message.type === "image" ? (
            <div
              className={clsx(
                "relative",
                imageLoading ? "w-[14rem] h-[20rem]" : "w-full h-full"
              )}
            >
              {imageLoading && (
                <Skeleton className="absolute z-20 w-full h-full bg-blue-800" />
              )}
              <img
                src={message.content}
                alt="shared"
                className={clsx("w-full rounded-2xl", imageLoading && "hidden")}
                onLoad={() => setImageLoading(false)}
              />
            </div>
          ) : (
            message.content
          )}
        </CardContent>
      </Card>
      <span className="text-sm text-gray-300">
        {formatMessageTime(message?.timestamp)}
      </span>
    </div>
  );
}

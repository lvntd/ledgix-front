import React from "react";
import {
  IContentBlock,
  IContentBlockText,
  IContentBlockToolCallChunk,
  IExtendedModelMessage,
} from "@/services";
import { TextBlock, ToolCallBlock, ToolCallChunkBlock } from "./content-blocks";
import { MessageDate } from "../message-date";
import { MessageActions } from "./message-actions";
import clsx from "clsx";
import { toast } from "sonner";

type Props = {
  message: IExtendedModelMessage;
  conversationId: string;
  messageId: number;
};

export const AssistantMessage = ({
  message,
  conversationId,
  messageId,
}: Props) => {
  const orderedContent: IContentBlock[] = processContentBlock(message.content);
  let redactedText: IContentBlock[] = [];

  if (message.redactedContent.length > 0) {
    redactedText = processContentBlock(message.redactedContent);
  }

  const resourceChunkIds = message.resourceChunkIds;

  console.log(resourceChunkIds); // TODO. show answer resources

  let textToCopy = "";

  if (redactedText.length > 0) {
    textToCopy = redactedText
      .filter((contentBlock) => contentBlock.type === "text")
      .map((contentBlock) => contentBlock.text)
      .join("\n");
  } else {
    textToCopy = orderedContent
      .filter((contentBlock) => contentBlock.type === "text")
      .map((contentBlock) => contentBlock.text)
      .join("\n");
  }

  return (
    <div className="relative flex gap-4 max-w-[80%]">
      <div className="group relative h-fit min-w-32 text-sm transition-all duration-200 md:mb-3 ">
        <div
          className={clsx(
            "text-sm",
            message.redactedContent.length > 0 ? "line-through opacity-40" : ""
          )}
        >
          {orderedContent.map((contentBlock, idx) => {
            const key = `${contentBlock.type}_${idx}`;
            if (contentBlock?.type === "text") {
              return <TextBlock key={key} text={contentBlock.text} />;
            }

            if (contentBlock.type === "tool_call") {
              return <ToolCallBlock contentBlock={contentBlock} key={key} />;
            }

            if (contentBlock.type === "tool_call_chunk") {
              return (
                <ToolCallChunkBlock contentBlock={contentBlock} key={key} />
              );
            }
          })}
        </div>
        {message.redactedContent.length > 0 && (
          <div className="">
            {redactedText.map((contentBlock, idx) => {
              const key = `${contentBlock.type}_${idx}`;
              if (contentBlock?.type === "text") {
                return <TextBlock key={key} text={contentBlock.text} />;
              }

              if (contentBlock.type === "tool_call") {
                return <ToolCallBlock contentBlock={contentBlock} key={key} />;
              }

              if (contentBlock.type === "tool_call_chunk") {
                return (
                  <ToolCallChunkBlock contentBlock={contentBlock} key={key} />
                );
              }
            })}
          </div>
        )}
        <div className="flex items-center justify-between">
          <MessageDate date={message.date} showDisclaimer />
          <MessageActions
            conversationId={conversationId}
            fullText={textToCopy}
            message={message}
            messageId={messageId}
            onShowResources={() => toast.success("Resources Shown")}
          />
        </div>
      </div>
    </div>
  );
};

function processContentBlock(contentBlocks: IContentBlock[]): IContentBlock[] {
  const orderedContent: IContentBlock[] = [];

  for (const contentBlock of contentBlocks) {
    const lastElement = orderedContent.at(-1);
    const blockType = contentBlock?.type;

    switch (blockType) {
      case "text":
        handleTextBlock({ ...contentBlock }, lastElement, orderedContent);
        break;

      case "tool_call":
        orderedContent.push({ ...contentBlock });
        break;

      case "tool_call_chunk":
        handleToolCallChunk({ ...contentBlock }, lastElement, orderedContent);
        break;
    }

    if (orderedContent.length === 0) {
      orderedContent.push({ ...contentBlock });
    }
  }

  return orderedContent;
}

function handleTextBlock(
  contentBlock: IContentBlockText,
  lastElement: IContentBlock | undefined,
  orderedContent: IContentBlock[]
): void {
  if (lastElement?.type === "text") {
    lastElement.text = (lastElement.text || "") + (contentBlock?.text || "");
  } else {
    orderedContent.push({ ...contentBlock });
  }
}

function handleToolCallChunk(
  contentBlock: IContentBlockToolCallChunk,
  lastElement: IContentBlock | undefined,
  orderedContent: IContentBlock[]
): void {
  if (lastElement?.type === "tool_call_chunk") {
    lastElement.args = (lastElement.args || "") + (contentBlock?.args || "");
  } else {
    orderedContent.push({ ...contentBlock });
  }
}

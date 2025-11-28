import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToggle } from "react-use";
import { FeedbackModal } from "./feedback-modal";
import { Button } from "@/components/atoms";
import { Copy, TextSearch, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  IExtendedModelMessage,
  qk,
  saveConversationFeedback,
} from "@/services";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import copy from "copy-to-clipboard";
import { cn } from "@/lib/utils";

type Props = {
  message: IExtendedModelMessage;
  conversationId: string;
  fullText?: string;
  messageId: number;
  onShowResources: () => void;
};

export const MessageActions = ({
  message,
  conversationId,
  messageId,
  fullText,
  onShowResources,
}: Props) => {
  const t = useTranslations();
  const [isDialogOpen, toggleDialog] = useToggle(false);
  const [comment, setComment] = useState(message.feedback?.comment || "");
  const [isPositive, setIsPositive] = useState<boolean | null>(null);

  const $saveConversationFeedback = useMutation({
    mutationFn: saveConversationFeedback,
  });
  const queryClient = useQueryClient();

  const handleSubmit = (isPositive: boolean | null, comment: string) => {
    $saveConversationFeedback.mutate(
      { conversationId, isPositive, comment, messageId },
      {
        onSuccess: () => {
          toast.success(t("alert_feedback_received"));
          queryClient.invalidateQueries(
            qk.conversation.details({ conversationId })
          );
          toggleDialog(false);
          setComment(comment);
        },
        onError: () => {
          toast.error(t("error_something_went_wrong"));
        },
      }
    );
  };

  return (
    <>
      <FeedbackModal
        comment={comment}
        isLoading={$saveConversationFeedback.isPending}
        isOpen={isDialogOpen}
        isPositive={isPositive}
        onChangeComment={(newComment: string) => setComment(newComment)}
        onClear={() => handleSubmit(null, "")}
        onClose={() => toggleDialog(false)}
        onSubmit={() => handleSubmit(isPositive, comment)}
      />
      <div
        className={cn(
          "flex gap-[2px] group-hover:opacity-100 md:opacity-0",
          "transition-all duration-200 ease-in-out delay-75"
        )}
      >
        <Tooltip delayDuration={400}>
          <TooltipTrigger>
            <Button
              onClick={() => {
                setIsPositive(true);

                if (message.feedback?.isPositive) {
                  handleSubmit(null, "");
                } else {
                  handleSubmit(true, "");
                }
              }}
              size="icon-sm"
              variant="ghost"
            >
              <ThumbsUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("give_positive_feedback")}</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={400}>
          <TooltipTrigger>
            <Button
              onClick={() => {
                setIsPositive(false);
                toggleDialog();
              }}
              size="icon-sm"
              variant="ghost"
            >
              <ThumbsDown />
            </Button>
            <TooltipContent>{t("give_negative_feedback")}</TooltipContent>
          </TooltipTrigger>
        </Tooltip>
        {fullText && (
          <Tooltip delayDuration={400}>
            <TooltipTrigger>
              <Button
                variant="ghost"
                onClick={() => {
                  copy(fullText);
                  toast.success(t("text_copied"));
                }}
                size="icon-sm"
              >
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("copy_text")}</TooltipContent>
          </Tooltip>
        )}
        <Tooltip delayDuration={400}>
          <TooltipTrigger>
            <Button variant="ghost" size="icon-sm" onClick={onShowResources}>
              <TextSearch />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("sources")}</TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};

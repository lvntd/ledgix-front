import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/atoms/separator";
import { SidebarTrigger } from "@/components/atoms/sidebar";
import { TitleForm } from "./title-form";
import { NavActions } from "@/components/molecules/app-sidebar";
import {
  IConversation,
  IConversationResponse,
  qk,
  updateConversationTitle,
  UpdateConversationTitleInput,
} from "@/services";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateObjectTitle } from "./utils";
import { toast } from "sonner";

type Props = { conversation?: IConversation };

export const ConversationHeader = ({ conversation }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const $updateConversationTitle = useMutation({
    mutationFn: updateConversationTitle,
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["conversation", "list"] });

      // Snapshot the previous value
      const previousConversationsList = queryClient.getQueryData<
        InfiniteData<IConversation[]>
      >(["conversation", "list"]);
      const previousConversationDetails = queryClient.getQueryData(
        qk.conversation.details({ conversationId: conversation?._id || null })
          .queryKey
      );

      // Optimistically update to the new value
      queryClient.setQueryData<InfiniteData<IConversation[]>>(
        ["conversation", "list"],
        (prevList) => {
          if (prevList === undefined) {
            return;
          }

          return updateObjectTitle(
            prevList,
            values.conversationId,
            values.title
          );
        }
      );

      queryClient.setQueryData<IConversationResponse>(
        qk.conversation.details({ conversationId: conversation?._id || null })
          .queryKey,
        (prevData) => {
          if (prevData === undefined) {
            return;
          }
          return { data: { ...prevData.data, title: values.title } };
        }
      );

      // Return a context object with the snapshotted value
      return { previousConversationsList, previousConversationDetails };
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: qk.conversation._def });
    },
    onError: (error, _values, context) => {
      setIsEditing(false);
      queryClient.setQueryData(
        ["conversation", "list"],
        context?.previousConversationsList
      );
      queryClient.setQueryData(
        qk.conversation.details({ conversationId: conversation?._id || null })
          .queryKey,
        context?.previousConversationDetails
      );
      toast.error(t(error.message));
    },
  });

  const handleUpdateTitle = (values: UpdateConversationTitleInput) => {
    setIsEditing(false);
    if (values.title === conversation?.title) {
      return;
    }

    $updateConversationTitle.mutate(values);
  };

  const titleFormDefaultValues = useMemo(
    () => ({
      conversationId: conversation?._id || "",
      title: conversation?.title || "",
    }),
    [conversation?._id, conversation?.title]
  );

  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-3 min-w-0 flex-1">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {conversation?.title && isEditing ? (
          <TitleForm
            defaultValues={titleFormDefaultValues}
            key={conversation?._id}
            onCancel={() => setIsEditing(false)}
            onSubmit={handleUpdateTitle}
          />
        ) : (
          <h1
            onDoubleClick={() => setIsEditing(true)}
            className="text-sm text-left truncate max-w-[120px] sm:max-w-xs md:max-w-sm lg:max-w-md"
          >
            {conversation?.title}
          </h1>
        )}
      </div>
      <div className="ml-auto px-3">
        {conversation?._id && <NavActions conversation={conversation} />}
      </div>
    </header>
  );
};

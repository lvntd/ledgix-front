import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { UpdateConversationTitleInput } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { conversationTitleSchema } from "./validations";
import { useKey } from "react-use";
import { Input } from "@/components/atoms/input";

type Props = {
  defaultValues: UpdateConversationTitleInput;
  onSubmit: (values: UpdateConversationTitleInput) => void;
  onCancel: () => void;
};

// TODO. აქ ძაან სწრაფად ვწერე ელიტ ელექტრონიქსში შავ პარასკევს. დასარეფაქტორებელია

export const TitleForm = ({ onSubmit, defaultValues, onCancel }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control } = useForm<UpdateConversationTitleInput>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(conversationTitleSchema),
  });

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useKey((e) => e.code === "Escape", onCancel);

  return (
    <form
      className="flex w-full flex-1 items-center gap-2 text-gray-900"
      onBlur={handleSubmit(onSubmit)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <Input
              className={`h-full w-full rounded-lg border py-1 outline-none ${
                Boolean(fieldState.error)
                  ? "border-red-100 bg-red-10"
                  : "border-raisin-10 focus-within:border-gray-400"
              }`}
              onChange={field.onChange}
              onClick={(e) => e.stopPropagation()}
              ref={inputRef}
              value={field.value}
            />
          )}
        />
      </div>
    </form>
  );
};

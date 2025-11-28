import React from "react";
import { useTranslations } from "next-intl";
import { CheckPromoCodeInput } from "@/services";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "@/components/atoms/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/atoms/input-otp";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit: (values: CheckPromoCodeInput) => void;
  defaultValues: CheckPromoCodeInput;
  isPending: boolean;
  isError: boolean;
  onReset: () => void;
};

export const FormCheckPromoCode = ({
  onSubmit,
  defaultValues,
  isError,
  onReset,
}: Props) => {
  const t = useTranslations();

  const { handleSubmit, control } = useForm<CheckPromoCodeInput>({
    defaultValues,
  });

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <div className="w-full">
            <Field orientation={"horizontal"}>
              <FieldLabel>{t("promo_code")}</FieldLabel>
              <div className="relative">
                <InputOTP
                  className="z-10"
                  maxLength={5}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value.toUpperCase());
                    onReset();
                  }}
                  onBlur={() => {
                    if (field.value.length === 5) {
                      handleSubmit(onSubmit)();
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
                <p
                  className={cn(
                    "text-right text-xs transition-all duration-100 ease-in-out top-full",
                    isError && field.value.length === 5
                      ? "opacity-100"
                      : "-translate-y-1 opacity-0"
                  )}
                >
                  {t("error_code_not_found")}
                </p>
              </div>
            </Field>
          </div>
        )}
      />
    </form>
  );
};

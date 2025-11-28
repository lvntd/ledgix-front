"use client";
import React from "react";
import { Coins as TokenIcon, FlameIcon } from "lucide-react";
import { IOffering } from "@/services";

import numeral from "numeral";

import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";

type Props = {
  offering: IOffering;
  onSelect: (offeringId: string) => void;
  isPopular?: boolean;
  buttonText: string;
  infoText?: string;
};

export const OfferingCard = ({
  offering,
  onSelect,
  isPopular,
  buttonText,
  infoText,
}: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "relative flex w-full flex-1 flex-col justify-between gap-8 rounded-xl border p-6",
        "bg-popover text-popover-foreground"
      )}
    >
      {isPopular && (
        <span className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-destructive">
          <FlameIcon color="white" />
        </span>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <p className="text-sm font-normal">
            {t(`offerings.${offering.title}`)}
          </p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-[32px] font-bold leading-10">{`₾${offering.priceGel}`}</p>
          <p className="text-lg leading-[22px] text-muted-foreground">{`/${t(
            "amount_month",
            { amount: offering.validityPeriod }
          )}`}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TokenIcon size={20} />
          <p>
            {t("amount_tokens", {
              amount: numeral(offering.tokens).format("0,0"),
            })}
          </p>
        </div>
        {infoText && (
          <p className="text-xs text-raisin-60 md:text-xs">{infoText}</p>
        )}
      </div>
      <Button onClick={() => onSelect(offering._id)}>{buttonText}</Button>
    </div>
  );
};

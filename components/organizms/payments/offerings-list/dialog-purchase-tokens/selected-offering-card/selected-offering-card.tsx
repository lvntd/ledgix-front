import React, { Dispatch, SetStateAction } from "react";
import numeral from "numeral";
import { Coins as TokenIcon } from "lucide-react";
import { IOffering } from "@/services";
import { useTranslations } from "next-intl";

type Props = {
  selectedOffering: IOffering | null;
  isAutomatic: boolean;
  setIsAutomatic: Dispatch<SetStateAction<boolean>>;
};

export const SelectedOfferingCard = ({ selectedOffering }: Props) => {
  const t = useTranslations();
  if (selectedOffering === null) {
    return null;
  }

  return (
    <div>
      <div className="flex w-full min-w-64 flex-col gap-5 rounded-md border  bg-popover text-popover-foreground p-6 shadow-offering-card md:min-w-96">
        <div className="flex items-center gap-3">
          <p className="text-sm font-normal">
            {t(`offerings.${selectedOffering.title}`)}
          </p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-[32px] font-bold leading-10">{`₾${selectedOffering.priceGel}`}</p>
          <p className="text-lg leading-[22px] text-muted-foreground">{`/${t(
            "amount_month",
            { amount: selectedOffering.validityPeriod }
          )}`}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TokenIcon color="#4E4E4E" size={20} />
          <p>
            {t("amount_tokens", {
              amount: numeral(selectedOffering.tokens).format("0,0"),
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

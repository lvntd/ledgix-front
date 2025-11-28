import React, { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/atoms/switch";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/atoms/item";
import { Button } from "@/components/atoms";

type Props = {
  isAutomatic: boolean;
  setIsAutomatic: Dispatch<SetStateAction<boolean>>;
};

export const AutomaticRenewalSwitch = ({
  isAutomatic,
  setIsAutomatic,
}: Props) => {
  const t = useTranslations();

  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle>
          {t("automatic_renewal_is", {
            status: isAutomatic
              ? t("enabled").toLowerCase()
              : t("disabled").toLowerCase(),
          })}
        </ItemTitle>
        <ItemDescription>
          {isAutomatic
            ? t("automatic_renewal_description")
            : t("single_payment_description")}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant={isAutomatic ? "outline" : "destructive"}
          size="sm"
          onClick={() => setIsAutomatic((prev) => !prev)}
        >
          {isAutomatic ? t("disable") : t("enable")}
        </Button>
      </ItemActions>
    </Item>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2 text-sm">
        <p className="font-semibold">{t("save_card")}</p>
        <Switch checked={isAutomatic} onCheckedChange={setIsAutomatic} />
      </div>
      <p className="block min-h-20 max-w-[350px] text-sm">
        {isAutomatic
          ? t("automatic_renewal_description")
          : t("single_payment_description")}
      </p>
    </div>
  );
};

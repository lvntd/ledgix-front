import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/atoms";
import { IOffering, IPromo } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { checkPromoCode } from "@/services/promo/promo.service";
import { FormCheckPromoCode } from "./form-check-promo-code";
import { SelectedOfferingCard } from "./selected-offering-card";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/atoms/dialog";
import { Label } from "@/components/atoms/label";
import { Checkbox } from "@/components/atoms/checkbox";
import { AutomaticRenewalSwitch } from "./selected-offering-card/automatic-renewal-switch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onCheckPromo: Dispatch<SetStateAction<IPromo | null>>;
  isAutomatic: boolean;
  setIsAutomatic: React.Dispatch<React.SetStateAction<boolean>>;
  appliedPromo: IPromo | null;
  isLoading: boolean;
  selectedOffering: IOffering | null;
};

export const DialogPurchaseTokens = ({
  isOpen,
  isAutomatic,
  selectedOffering,
  setIsAutomatic,
  onClose,
  onSubmit,
  onCheckPromo,
  appliedPromo,
  isLoading,
}: Props) => {
  const t = useTranslations();
  const [hasAgreed, setHasAgreed] = useState(false);

  const $checkPromoCode = useMutation({ mutationFn: checkPromoCode });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-fit! w-full!">
        <DialogHeader>
          <DialogTitle>{t("buy_tokens")}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex flex-col gap-3 md:w-96">
            <SelectedOfferingCard
              isAutomatic={isAutomatic}
              selectedOffering={selectedOffering}
              setIsAutomatic={setIsAutomatic}
            />
            <AutomaticRenewalSwitch
              isAutomatic={isAutomatic}
              setIsAutomatic={setIsAutomatic}
            />
          </div>
          <div className="ml-2 flex min-w-xs sm:w-max md:w-88 flex-col justify-between gap-4">
            <div className="flex flex-1 flex-col  gap-4 text-sm">
              <FormCheckPromoCode
                defaultValues={{ code: appliedPromo?.code || "" }}
                isPending={$checkPromoCode.isPending}
                isError={$checkPromoCode.isError}
                onReset={$checkPromoCode.reset}
                onSubmit={(values) =>
                  $checkPromoCode.mutate(values, {
                    onSuccess: (data) => {
                      onCheckPromo(data.data);
                    },
                    onError: () => {
                      onCheckPromo(null);
                    },
                  })
                }
              />
              <div className="flex items-center justify-between">
                <p className="font-medium">{t("discount")}</p>
                <p>{`${appliedPromo?.discountPercentage || 0} %`}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">{t("payable_amount")}</p>
                <p className="font-semibold">
                  {`${
                    Math.round(
                      (selectedOffering?.priceGel || 0) *
                        (100 - (appliedPromo?.discountPercentage || 0))
                    ) / 100
                  } ₾`}
                </p>
              </div>
            </div>

            <div className={`mt-2 flex gap-2 items-center`}>
              <Checkbox
                id="terms-of-service-checkbox"
                checked={hasAgreed}
                onCheckedChange={(value) => {
                  if (value !== "indeterminate") {
                    setHasAgreed(value);
                  }
                }}
              />
              <Label htmlFor="terms-of-service-checkbox" className="text-xs">
                <p>
                  {t.rich("agree_terms_of_use", {
                    terms: (chunks) => (
                      <Link target="_blank" href="/terms-of-use">
                        {chunks}
                      </Link>
                    ),
                    refund: (chunks) => (
                      <Link target="_blank" href="/refund-policy">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            {t("close")}
          </Button>
          <Button disabled={!hasAgreed || isLoading} onClick={onSubmit}>
            {t("continue")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

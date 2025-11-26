'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/atoms'
import { TrialPeriod } from '@/configs'
import { getAccountVerificationEmail, qk, verifyAccount } from '@/services'
import { AlertCircleIcon, Mail as MailIcon, Send } from 'lucide-react'
import { toast } from 'sonner'
import numeral from 'numeral'
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert'

export const AccountVerificationAlert = () => {
  const t = useTranslations()

  const searchParams = useSearchParams()
  const token = searchParams.get('token') as string
  const queryClient = useQueryClient()

  const $verifyAccount = useMutation({ mutationFn: verifyAccount })
  const $getAccountVerificationEmail = useMutation({
    mutationFn: getAccountVerificationEmail,
  })

  const handleEmailRequest = () => {
    $getAccountVerificationEmail.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <div className="flex flex-col items-center gap-1 text-sm">
            <MailIcon size={30} />
            <p className="font-semibold">
              {t('alert_email_sent_successfully')}
            </p>
            <p className="text-center">{t('alert_check_inbox_and_spam')}</p>
          </div>,
          { icon: null },
        )
      },
      onError: () => {
        toast.error(t('error_couldnt_send_email'))
      },
    })
  }

  useEffect(() => {
    if (token) {
      $verifyAccount.mutate(
        { token },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(qk.user.details)
            toast.success(t('alert_account_verified'))
          },
          onError: () => {
            toast.error(t('error_could_not_verify_account'))
          },
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{t('your_account_is_not_verified')}</AlertTitle>
      <AlertDescription>
        <div className="flex items-center justify-between w-full">
          <p>
            {t.rich('get_verified_and_receive_tokens', {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
              tokens: numeral(TrialPeriod.TOKENS).format('0,0'),
            })}
          </p>
          <Button
            disabled={$getAccountVerificationEmail.isPending}
            onClick={handleEmailRequest}
            size="icon-sm"
          >
            <Send />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

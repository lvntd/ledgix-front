'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { Button } from '@/components/atoms'
import { EditProfileForm } from './edit-profile-form'
import { editProfile, EditProfileFormValues, qk } from '@/services'
import { toast } from 'sonner'
import { AccountVerificationAlert } from '@/components/molecules'

export const PersonalInformationCard = () => {
  const t = useTranslations()

  const queryClient = useQueryClient()

  const $editProfile = useMutation({ mutationFn: editProfile })
  const $user = useQuery(qk.user.details)

  const handleEditProfile = (values: EditProfileFormValues) => {
    $editProfile.mutate(values, {
      onSuccess: () => {
        toast.success(t('alert_saved_changes'))
        queryClient.invalidateQueries({ queryKey: qk.user.details.queryKey })
      },
      onError: () => {
        toast.error(t('error_something_went_wrong'))
      },
    })
  }

  if ($user.data === undefined) {
    return null
  }

  const { isVerified, fullName, companyName, phoneNumber } = $user.data.data

  return (
    <Card className="flex flex-col gap-7 max-w-3xl m-auto bg-card w-full  mb-5">
      <CardHeader>
        <CardTitle>პერსონალური ინფორმაცია</CardTitle>
        <CardDescription>თქვენი ინფორმაცია დაცულია</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {!isVerified && <AccountVerificationAlert />}
        <EditProfileForm
          defaultValues={{
            fullName,
            companyName: companyName || '',
            phoneNumber: phoneNumber || '',
          }}
          isPending={$editProfile.isPending}
          onSubmit={handleEditProfile}
        />
      </CardContent>
    </Card>
  )
}

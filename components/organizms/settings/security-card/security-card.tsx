'use client'
import { useRouter } from '@/i18n/navigation'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { ChangePasswordForm } from './change-password-form'
import { changePassword, ChangePasswordFormInput } from '@/services'
import { toast } from 'sonner'
import authConfigs from '@/configs/auth'
import Cookies from 'js-cookie'

export const SecurityCard = () => {
  const t = useTranslations()
  const router = useRouter()
  const $changePassword = useMutation({ mutationFn: changePassword })

  const handleChangePassword = (values: ChangePasswordFormInput) => {
    $changePassword.mutate(values, {
      onSuccess: (data) => {
        toast.success(t(data.data.message))
        Cookies.remove(authConfigs.storageTokenKeyName)
        router.push('/login')
      },
      onError: (error) => {
        toast.error(t(error.message))
      },
    })
  }

  return (
    <Card className="flex flex-col gap-7 m-auto bg-card w-full mb-5 pb-14">
      <CardHeader>
        <CardTitle>{t('security')}</CardTitle>
        <CardDescription>
          უსაფრთხოების მიზნით რეკომენდირებულია, პაროლი შეიცვალოს 3 თვეში ერთხელ
          მაინც
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 items-center justify-center">
        <ChangePasswordForm
          defaultValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          isPending={$changePassword.isPending}
          onSubmit={handleChangePassword}
        />
      </CardContent>
    </Card>
  )
}

import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/atoms/sonner'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import dayjs from 'dayjs'
import ka from 'dayjs/locale/ka'
import en from 'dayjs/locale/en'
import ru from 'dayjs/locale/ru'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Prive AI',
  description: 'The first AI tax assistant in Georgia',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const localesMap = { ka, en, ru }
  dayjs.locale(localesMap[locale as keyof typeof localesMap])

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <NuqsAdapter>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                // enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </QueryProvider>
          </NuqsAdapter>
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
      <GoogleTagManager gtmId="GTM-5KDXH796" />
      <GoogleAnalytics gaId="G-RD2J5NS6FJ" />
    </html>
  )
}

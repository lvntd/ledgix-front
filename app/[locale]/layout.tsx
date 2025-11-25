import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/atoms/sonner'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import './globals.css'

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

  const messages = await getMessages()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
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

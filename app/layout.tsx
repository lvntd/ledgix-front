import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/atoms/sonner'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
      <GoogleTagManager gtmId="GTM-5KDXH796" />
      <GoogleAnalytics gaId="G-RD2J5NS6FJ" />
    </html>
  )
}

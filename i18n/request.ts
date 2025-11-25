import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  // Load all translation files for the locale
  const messages = {
    ...(await import(`@/messages/${locale}/common.json`)).default,
    ...(await import(`@/messages/${locale}/faq.json`)).default,
    ...(await import(`@/messages/${locale}/tour.json`)).default,
    ...(await import(`@/messages/${locale}/about-us.json`)).default,
    ...(await import(`@/messages/${locale}/privacy-policy.json`)).default,
    ...(await import(`@/messages/${locale}/terms-and-conditions.json`)).default,
    ...(await import(`@/messages/${locale}/refund-policy.json`)).default,
    ...(await import(`@/messages/${locale}/llm-tools.json`)).default,
  }

  return {
    locale,
    messages,
  }
})

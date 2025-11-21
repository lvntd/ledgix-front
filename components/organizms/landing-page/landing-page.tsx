import { ThemeToggler } from '@/components/molecules'
import Link from 'next/link'

export const LandingPage = () => {
  return (
    <main>
      <ThemeToggler />
      <Link href="/auth">Log in</Link>
    </main>
  )
}

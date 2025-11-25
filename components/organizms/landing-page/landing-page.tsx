import { ThemeToggler } from '@/components/molecules'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import FloatingLines from '@/components/molecules/floating-lines'

export const LandingPage = () => {
  return (
    <main>
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <nav className="flex w-full max-w-3xl items-center gap-4 fixed top-4 left-1/2 -translate-x-1/2 z-50 ps-2 pe-8 py-2 whitespace-nowrap rounded-full bg-white/60 dark:bg-slate-900/70 backdrop-blur-sm shadow-lg dark:shadow-slate-900/70 border border-gray/80 dark:border-gray-700/50 justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/app-logos/logo-white.svg"
              alt="Prive AI"
              className="flex items-center justify-center object-cover object-center"
              width={30}
              height={30}
            />
            <span className="text-lg">Prive AI</span>
          </div>

          <div data-v-7d0739be="" className="flex items-center gap-1">
            <a
              data-v-7d0739be=""
              href="#about"
              className="px-3 py-1 lg:px-4 lg:py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              About
            </a>
            <a
              data-v-7d0739be=""
              href="#resume"
              className="px-3 py-1 lg:px-4 lg:py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              Resume
            </a>
            <a
              data-v-7d0739be=""
              href="#works"
              className="px-3 py-1 lg:px-4 lg:py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              Works
            </a>
          </div>
        </nav>
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={6}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[7, 2, 4]}
          topWavePosition={{ x: 2, y: 0, rotate: 0.5 }}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <ThemeToggler />
      <Link href="/login">Log in</Link>
    </main>
  )
}

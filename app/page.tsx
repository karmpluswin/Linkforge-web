import HeroSection from '@/components/hero-section'
import UrlShortenerForm from '@/components/url-shortener-form'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 py-12 bg-white dark:bg-[#0a0a0a]">
      <div className="flex flex-col items-center w-full max-w-2xl gap-8">
        <HeroSection />
        <UrlShortenerForm />
      </div>
    </main>
  )
}
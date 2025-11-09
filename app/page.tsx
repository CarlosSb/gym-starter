import { getServerSettings, getServerPlans } from "@/lib/server-data"
import { DynamicColorsProvider } from "@/components/dynamic-colors-provider"
import { ChatFlutuante } from "@/components/chat-flutuante"
import { UnifiedContentSection } from "@/components/unified-content-section"
import { HeaderSection } from "@/components/sections/header-section"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PlansSection } from "@/components/sections/plans-section"
import { AboutSection } from "@/components/sections/about-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

export default async function HomePage() {
  const [settings, plans] = await Promise.all([
    getServerSettings(),
    getServerPlans()
  ])

  return (
    <DynamicColorsProvider settings={settings}>
      <div className="min-h-screen bg-background">
        <HeaderSection settings={settings} /> 
        <HeroSection settings={settings} />
        <FeaturesSection settings={settings} />
        <PlansSection plans={plans} />
        <AboutSection settings={settings} />
        <TestimonialsSection settings={settings} />
        <UnifiedContentSection />
        <ContactSection settings={settings} plans={plans} />
        <FooterSection settings={settings} />
        <ChatFlutuante />
      </div>
    </DynamicColorsProvider>
  )
}

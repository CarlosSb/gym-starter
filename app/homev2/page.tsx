import { getServerSettings, getServerPlans, getServerTestimonials } from "@/lib/server-data"
import { HomeV2Layout } from "@/components/homev2/homev2-layout"
import { HomeV2Hero } from "@/components/homev2/homev2-hero"
import { HomeV2Pillars } from "@/components/homev2/homev2-pillars"
import { HomeV2Plans } from "@/components/homev2/homev2-plans"
import { HomeV2Trajectory } from "@/components/homev2/homev2-trajectory"
import { HomeV2HallOfFame } from "@/components/homev2/homev2-hall-of-fame"
import { HomeV2Contact } from "@/components/homev2/homev2-contact"
import { ChatFlutuante } from "@/components/chat-flutuante"

export default async function HomeV2Page() {
  const [settings, plans, testimonials] = await Promise.all([
    getServerSettings(),
    getServerPlans(),
    getServerTestimonials()
  ])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <HomeV2Layout>
        <HomeV2Hero settings={settings} />
        <HomeV2Pillars settings={settings} />
        <HomeV2Plans plans={plans} />
        <HomeV2Trajectory settings={settings} />
        <HomeV2HallOfFame testimonials={testimonials} />
        <HomeV2Contact settings={settings} plans={plans} />
        <ChatFlutuante />
      </HomeV2Layout>
    </div>
  )
}
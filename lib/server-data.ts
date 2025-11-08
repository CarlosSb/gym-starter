import { prisma } from './prisma'

export async function getServerSettings() {
  try {
    const settings = await prisma.academySettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!settings) {
      // Return default settings if none exist
      return {
        id: "default",
        name: "GymStarter",
        description: "Sistema completo de gestão para academias",
        phone: "(85) 99999-9999",
        email: "contato@gymstarter.com.br",
        address: "Av. Santos Dumont, 1515 - São Benedito, CE",
        whatsapp: null,
        hours: {
          weekdays: { open: "05:00", close: "23:00" },
          saturday: { open: "07:00", close: "20:00" },
          sunday: { open: "08:00", close: "18:00" }
        },
        colors: {
          primary: "#DC2626",
          secondary: "#000000"
        },
        logo: null,
        about: "Fundada em 2024, a GymStarter nasceu com o propósito de revolucionar o conceito de academia. Combinamos tecnologia de ponta com metodologias comprovadas para oferecer uma experiência única de treino.",
        heroTitle: "TRANSFORME SEU CORPO",
        heroSubtitle: "Nova Academia",
        heroImage: "/modern-gym-interior-with-red-and-black-equipment.jpg",
        features: {
          title: "Por que escolher a GymStarter?",
          description: "Oferecemos tudo que você precisa para alcançar seus objetivos fitness",
          items: [
            {
              title: "Equipamentos Modernos",
              description: "Equipamentos de última geração para todos os tipos de treino",
              icon: "Dumbbell"
            },
            {
              title: "Personal Trainers",
              description: "Profissionais qualificados para te orientar em cada exercício",
              icon: "Users"
            },
            {
              title: "Horário Flexível",
              description: "Aberto das 05:00 às 23:00 para se adequar à sua rotina",
              icon: "Clock"
            },
            {
              title: "Resultados Garantidos",
              description: "Metodologia comprovada para alcançar seus objetivos",
              icon: "Trophy"
            }
          ]
        },
        metrics: {
          activeMembers: 500,
          personalTrainers: 15,
          operatingHours: "24/7"
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    // Transform database settings to match expected format
    return {
      ...settings,
      whatsapp: settings.whatsapp || undefined,
      hours: settings.hours as any,
      colors: settings.colors as any,
      features: settings.features as any,
      metrics: settings.metrics as any,
      notifications: {}, // Default empty notifications
      createdAt: settings.createdAt.toISOString(),
      updatedAt: settings.updatedAt.toISOString()
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    throw new Error('Failed to fetch academy settings')
  }
}

export async function getServerPlans() {
  try {
    const plans = await prisma.plan.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { price: 'asc' }
    })

    return plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      description: plan.description,
      features: plan.features,
      popular: plan.popular,
      status: plan.status,
      activeMembers: plan.activeMembers,
      monthlyRevenue: plan.monthlyRevenue,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching plans:', error)
    throw new Error('Failed to fetch plans')
  }
}

export async function getServerTestimonials(limit = 10) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return testimonials.map(testimonial => ({
      id: testimonial.id,
      name: testimonial.name,
      content: testimonial.content,
      rating: testimonial.rating,
      category: "Cliente", // Default category
      isActive: testimonial.isActive,
      createdAt: testimonial.createdAt.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    // Return default testimonials if database fails
    return [
      {
        id: "default-1",
        name: "João Silva",
        content: "A GymStarter transformou completamente minha rotina de treinos! Os equipamentos são de primeira linha e os profissionais são extremamente preparados.",
        rating: 5,
        category: "Perda de Peso",
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "default-2",
        name: "Maria Santos",
        content: "Excelente academia! Os equipamentos são modernos e sempre bem cuidados. As aulas em grupo são muito divertidas.",
        rating: 5,
        category: "Condicionamento",
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "default-3",
        name: "Pedro Costa",
        content: "Melhor investimento que fiz! A equipe é muito preparada e sempre disposta a ajudar.",
        rating: 5,
        category: "Ganho de Massa",
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ]
  }
}

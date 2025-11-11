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
        heroImages: ["/modern-gym-interior-with-red-and-black-equipment.jpg"],
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
    const transformedSettings = {
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

    // Type assertion to match AcademySettingsData
    return transformedSettings as any
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
        name: "Marina Costa",
        content: "Em 3 meses na GymStarter consegui perder 12kg! O que mais me impressionou foi o acompanhamento personalizado. Os profissionais realmente se preocupam com cada aluno. Os equipamentos são impecáveis e a atmosfera é super motivadora.",
        rating: 5,
        category: "Perda de Peso",
        achievement: "Perdeu 12kg em 3 meses",
        progress: "12kg eliminados",
        transformation: "Corpo tonificado e saudável",
        timeFrame: "3 meses de treino",
        isActive: true,
        createdAt: new Date('2024-10-15').toISOString()
      },
      {
        id: "default-2",
        name: "Ricardo Oliveira",
        content: "Como executivo, sempre tive pouco tempo para treinar. Aqui na GymStarter consegui criar uma rotina que realmente funciona. Em 6 meses ganhei 8kg de massa magra! A flexibilidade de horários salvou minha vida fitness.",
        rating: 5,
        category: "Ganho de Massa",
        achievement: "Ganhou 8kg de massa magra",
        progress: "8kg de massa magra",
        transformation: "Aumento de força e definição",
        timeFrame: "6 meses de treino",
        isActive: true,
        createdAt: new Date('2024-10-08').toISOString()
      },
      {
        id: "default-3",
        name: "Juliana Martins",
        content: "Sofria com problemas de ansiedade e baixa autoestima. O exercício me salvou! Além dos resultados físicos (6kg a menos), encontrei uma nova versão de mim. A energia que tenho agora é incomparável!",
        rating: 5,
        category: "Condição Física",
        achievement: "6kg eliminados + saúde mental",
        progress: "6kg eliminados",
        transformation: "Melhora da saúde mental",
        timeFrame: "4 meses de treino",
        isActive: true,
        createdAt: new Date('2024-10-20').toISOString()
      },
      {
        id: "default-4",
        name: "Carlos Eduardo",
        content: "Atlete amador, buscava um lugar que pudesse aprimorar minha performance. Os trainers são altamente qualificados e me ajudaram a quebrar meus próprios recordes. O ambiente competitivo mas acolhedor é perfeito!",
        rating: 5,
        category: "Performance Esportiva",
        achievement: "Quebrou 3 recordes pessoais",
        progress: "Melhora na performance",
        transformation: "Aumento da força e resistência",
        timeFrame: "5 meses de treino",
        isActive: true,
        createdAt: new Date('2024-10-12').toISOString()
      },
      {
        id: "default-5",
        name: "Fernanda Souza",
        content: "Depois da gravidez, meu corpo nunca mais foi o mesmo. Com 40 anos, achei que seria impossível voltar à forma. Mas aqui descobri que nunca é tarde! Em 8 meses recuperei minha autoestima e me sinto mais forte do que nunca.",
        rating: 5,
        category: "Recuperação Pós-Parto",
        achievement: "Retornou à forma pré-gestação",
        progress: "8kg eliminados",
        transformation: "Recuperação completa",
        timeFrame: "8 meses de treino",
        isActive: true,
        createdAt: new Date('2024-09-28').toISOString()
      },
      {
        id: "default-6",
        name: "Roberto Santos",
        content: "Problemas de joelho me impediam de fazer exercícios tradicionais. O personal aqui desenvolveu um programa específico que me allowing to me exercitar sem dor. Hoje, aos 55 anos, me sinto mais jovem que aos 30!",
        rating: 5,
        category: "Reabilitação",
        achievement: "Recuperação total do joelho",
        progress: "Exercício sem dor",
        transformation: "Mobilidade restaurada",
        timeFrame: "7 meses de reabilitação",
        isActive: true,
        createdAt: new Date('2024-10-05').toISOString()
      },
      {
        id: "default-7",
        name: "Amanda Lima",
        content: "Era sedentária há anos e tinha muito medo de começar. A recepção calorosa e o ambiente inclusivo me fizeram sentir em casa. Em 4 meses perdi 8kg, mas o mais importante foi ganhar confiança e energia!",
        rating: 5,
        category: "Sedentarismo",
        achievement: "Perdeu 8kg e ganhou confiança",
        progress: "8kg eliminados",
        transformation: "Ativa e confiante",
        timeFrame: "4 meses de treino",
        isActive: true,
        createdAt: new Date('2024-10-18').toISOString()
      },
      {
        id: "default-8",
        name: "Diego Ferreira",
        content: "Treinava em outras academias há anos, mas nunca vi resultados consistentes. Aqui descobri o que é treinamento realmente eficaz! A metodologia é diferente, os resultados são mensuráveis e duradouros.",
        rating: 5,
        category: "Ganho de Massa",
        achievement: "5kg de massa magra em 4 meses",
        progress: "5kg de massa magra",
        transformation: "Hipertrofia significativa",
        timeFrame: "4 meses de treino",
        isActive: true,
        createdAt: new Date('2024-10-10').toISOString()
      }
    ]
  }
}

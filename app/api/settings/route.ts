import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let settings = await prisma.academySettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    // If no settings exist, create default ones
    if (!settings) {
      const defaultSettings = {
        name: "Black Red Academia",
        description: "Academia moderna com equipamentos de última geração, personal trainers qualificados e ambiente motivador.",
        phone: "(11) 99999-9999",
        email: "contato@gymstarter.com.br",
        address: "Rua das Academias, 123 - Centro",
        whatsapp: "5511999999999",
        hours: {
          weekdays: { open: "05:00", close: "23:00" },
          saturday: { open: "06:00", close: "20:00" },
          sunday: { open: "08:00", close: "18:00" },
        },
        colors: {
          primary: "#DC2626",
        },
        logo: "/placeholder-logo.png",
        about: "Fundada em 2024, a Black Red nasceu com o propósito de revolucionar o conceito de academia. Combinamos tecnologia de ponta com metodologias comprovadas para oferecer uma experiência única de treino. Nossa equipe de profissionais qualificados está sempre pronta para te ajudar a alcançar seus objetivos, seja ganho de massa muscular, perda de peso ou melhoria do condicionamento físico.",
        heroTitle: "TRANSFORME SEU CORPO",
        heroSubtitle: "Nova Academia",
        heroImages: ["/modern-gym-interior-with-red-and-black-equipment.jpg"],
        features: {
          title: "Por que escolher a Black Red?",
          description: "Oferecemos tudo que você precisa para alcançar seus objetivos fitness",
          items: [
            {
              icon: "Dumbbell",
              title: "Equipamentos Modernos",
              description: "Equipamentos de última geração para todos os tipos de treino"
            },
            {
              icon: "Users",
              title: "Personal Trainers",
              description: "Profissionais qualificados para te orientar em cada exercício"
            },
            {
              icon: "Clock",
              title: "Horário Flexível",
              description: "Aberto das 05:00 às 23:00 para se adequar à sua rotina"
            },
            {
              icon: "Trophy",
              title: "Resultados Garantidos",
              description: "Metodologia comprovada para alcançar seus objetivos"
            }
          ]
        },
        metrics: {
          activeMembers: 500,
          personalTrainers: 15,
          operatingHours: "24/7",
          foundedYear: 2024
        }
      }

      settings = await prisma.academySettings.create({
        data: defaultSettings
      })
    }

    return NextResponse.json({
      success: true,
      settings: {
        name: settings.name,
        description: settings.description,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
        whatsapp: settings.whatsapp,
        hours: settings.hours,
        colors: settings.colors,
        logo: settings.logo || "/placeholder-logo.png",
        about: settings.about,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        // @ts-ignore - Campo existe no schema mas tipos podem estar desatualizados
        heroImages: settings.heroImages,
        features: settings.features,
        metrics: settings.metrics,
        // @ts-ignore - Campo existe no schema mas tipos podem estar desatualizados
        aboutImage: settings.aboutImage,
      }
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return PATCH(request)
}

export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json()

    console.log("Updates recebidos:", JSON.stringify(updates, null, 2))

    let settings = await prisma.academySettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!settings) {
      console.log("Nenhuma configuração encontrada, criando padrão...")
      const defaultSettings = {
        name: "Black Red Academia",
        description: "Academia moderna com equipamentos de última geração, personal trainers qualificados e ambiente motivador.",
        phone: "(11) 99999-9999",
        email: "contato@gymstarter.com.br",
        address: "Rua das Academias, 123 - Centro",
        whatsapp: "5511999999999",
        hours: {
          weekdays: { open: "05:00", close: "23:00" },
          saturday: { open: "06:00", close: "20:00" },
          sunday: { open: "08:00", close: "18:00" },
        },
        colors: { primary: "#DC2626" },
        logo: "/placeholder-logo.png",
        about: "Fundada em 2024, a Black Red nasceu com o propósito de revolucionar o conceito de academia.",
        heroTitle: "TRANSFORME SEU CORPO",
        heroSubtitle: "Nova Academia",
        heroImages: ["/modern-gym-interior-with-red-and-black-equipment.jpg"],
        features: {
          title: "Por que escolher a Black Red?",
          description: "Oferecemos tudo que você precisa para alcançar seus objetivos fitness",
          items: []
        },
        metrics: {
          activeMembers: 500,
          personalTrainers: 15,
          operatingHours: "24/7",
          foundedYear: 2024
        },
        aboutImage: null
      }

      settings = await prisma.academySettings.create({
        data: defaultSettings
      })
      console.log("Configurações padrão criadas")
    }

    console.log("Settings atuais antes da atualização:", {
      id: settings.id,
      // aboutImage: settings.aboutImage, // Campo não existe no schema atual
      about: settings.about?.substring(0, 50)
    })

    // Preparar dados para atualização
    const updateData: any = {}

    // Copiar apenas campos que foram enviados
    if (updates.name !== undefined) updateData.name = updates.name
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.phone !== undefined) updateData.phone = updates.phone
    if (updates.email !== undefined) updateData.email = updates.email
    if (updates.address !== undefined) updateData.address = updates.address
    if (updates.whatsapp !== undefined) updateData.whatsapp = updates.whatsapp
    if (updates.hours !== undefined) updateData.hours = updates.hours
    if (updates.colors !== undefined) updateData.colors = updates.colors
    if (updates.logo !== undefined) updateData.logo = updates.logo
    if (updates.about !== undefined) updateData.about = updates.about
    if (updates.heroTitle !== undefined) updateData.heroTitle = updates.heroTitle
    if (updates.heroSubtitle !== undefined) updateData.heroSubtitle = updates.heroSubtitle
    if (updates.heroImages !== undefined) updateData.heroImages = updates.heroImages
    if (updates.features !== undefined) updateData.features = updates.features
    if (updates.metrics !== undefined) updateData.metrics = updates.metrics
    if (updates.aboutImage !== undefined) updateData.aboutImage = updates.aboutImage

    console.log("Dados que serão atualizados:", JSON.stringify(updateData, null, 2))

    const updatedSettings = await prisma.academySettings.update({
      where: { id: settings.id },
      data: updateData
    })

    console.log("Settings atualizados com sucesso:", {
      id: updatedSettings.id,
      // @ts-ignore - Campo existe no schema mas tipos podem estar desatualizados
      aboutImage: updatedSettings.aboutImage,
      about: updatedSettings.about?.substring(0, 50)
    })

    return NextResponse.json({
      success: true,
      settings: {
        name: updatedSettings.name,
        description: updatedSettings.description,
        phone: updatedSettings.phone,
        email: updatedSettings.email,
        address: updatedSettings.address,
        whatsapp: updatedSettings.whatsapp,
        hours: updatedSettings.hours,
        colors: updatedSettings.colors,
        logo: updatedSettings.logo || "/placeholder-logo.png",
        about: updatedSettings.about,
        heroTitle: updatedSettings.heroTitle,
        heroSubtitle: updatedSettings.heroSubtitle,
        // @ts-ignore - Campo existe no schema mas tipos podem estar desatualizados
        heroImages: updatedSettings.heroImages,
        features: updatedSettings.features,
        metrics: updatedSettings.metrics
      }
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

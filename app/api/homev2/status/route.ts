import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simular checagem de status em tempo real
    const now = new Date()
    const currentHour = now.getHours()
    const currentDay = now.getDay() // 0 = Domingo, 1 = Segunda, etc.

    let isOpen = false
    let message = ""
    let nextStatus = ""
    let nextTime = ""

    // Horários de funcionamento
    // Segunda a Sexta: 05:00 - 23:00
    // Sábado: 07:00 - 20:00
    // Domingo: 08:00 - 18:00

    if (currentDay >= 1 && currentDay <= 5) { // Segunda a Sexta
      if (currentHour >= 5 && currentHour < 23) {
        isOpen = true
        message = "Aberto Agora"
        nextStatus = "Fechamento"
        nextTime = "23:00"
      } else if (currentHour >= 0 && currentHour < 5) {
        isOpen = false
        message = "Fechado Agora"
        nextStatus = "Abertura"
        nextTime = "05:00"
      } else {
        isOpen = false
        message = "Fechado Agora"
        nextStatus = "Abertura"
        nextTime = "Segunda, 05:00"
      }
    } else if (currentDay === 6) { // Sábado
      if (currentHour >= 7 && currentHour < 20) {
        isOpen = true
        message = "Aberto Agora"
        nextStatus = "Fechamento"
        nextTime = "20:00"
      } else if (currentHour >= 0 && currentHour < 7) {
        isOpen = false
        message = "Fechado Agora"
        nextStatus = "Abertura"
        nextTime = "07:00"
      } else {
        isOpen = false
        message = "Fechado Agora"
        nextStatus = "Abertura"
        nextTime = "Segunda, 05:00"
      }
    } else { // Domingo
      if (currentHour >= 8 && currentHour < 18) {
        isOpen = true
        message = "Aberto Agora"
        nextStatus = "Fechamento"
        nextTime = "18:00"
      } else if (currentHour >= 0 && currentHour < 8) {
        isOpen = false
        message = "Fechado Agora"
        nextStatus = "Abertura"
        nextTime = "08:00"
      } else {
        isOpen = false
        message = "Fechado Agora"
        nextStatus = "Abertura"
        nextTime = "Segunda, 05:00"
      }
    }

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 150))

    return NextResponse.json({
      success: true,
      data: {
        isOpen,
        message,
        status: isOpen ? "open" : "closed",
        nextStatus,
        nextTime,
        currentTime: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        dayName: now.toLocaleDateString("pt-BR", { weekday: "long" })
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao obter status" },
      { status: 500 }
    )
  }
}
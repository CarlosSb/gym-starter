import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const planPrice = parseFloat(searchParams.get("monthlyPrice") || "0")
    const billingCycle = searchParams.get("billingCycle") || "monthly"

    // Simular cálculo de economia anual
    const monthlyPrice = billingCycle === "monthly" ? planPrice : planPrice / 12
    const yearlyPrice = planPrice * 12
    const discountedYearlyPrice = yearlyPrice * 0.85 // 15% desconto para pagamento anual
    const savings = yearlyPrice - discountedYearlyPrice

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: {
        monthlyPrice,
        yearlyPrice: Math.round(discountedYearlyPrice),
        savings: Math.round(savings),
        discountPercentage: 15,
        billingCycle
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao calcular economia anual" },
      { status: 500 }
    )
  }
}
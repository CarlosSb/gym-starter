import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { PlanSelectionModal } from "@/components/plan-selection-modal"

interface PlansSectionProps {
  plans: any[]
}

export function PlansSection({ plans }: PlansSectionProps) {
  return (
    <section id="planos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu Plano</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis que se adaptam ao seu estilo de vida e objetivos
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans
            .filter(plan => plan.status === "ACTIVE")
            .sort((planA, planB) => planA.price - planB.price)
            .map((plan) => (
            <Card
              key={plan.id}
              className={`border-2 transition-colors ${
                plan.popular
                  ? "border-red-accent relative"
                  : "hover:border-red-accent"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-accent text-white">
                  Mais Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-4xl font-bold text-red-accent">
                  R$ {plan.price}<span className="text-lg text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col justify-between h-full">
                <ul className="space-y-2">
                  {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-red-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <PlanSelectionModal plan={plan}>
                  <Button className="w-full bg-red-accent hover:bg-red-accent/90">Escolher Plano</Button>
                </PlanSelectionModal>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
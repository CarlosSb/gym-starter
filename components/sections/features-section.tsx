import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Users, Clock, Trophy } from "lucide-react"

interface FeaturesSectionProps {
  settings: any
}

export function FeaturesSection({ settings }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{settings.features?.title || `Por que escolher a ${settings.name}?`}</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {settings.features?.description || "Oferecemos tudo que você precisa para alcançar seus objetivos fitness"}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {settings.features?.items?.map((feature: any, index: number) => {
            const IconComponent = feature.icon === "Dumbbell" ? Dumbbell :
                                feature.icon === "Users" ? Users :
                                feature.icon === "Clock" ? Clock :
                                feature.icon === "Trophy" ? Trophy : Dumbbell

            return (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <IconComponent className="h-12 w-12 text-red-accent mx-auto mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          }) || (
            <>
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <Dumbbell className="h-12 w-12 text-red-accent mx-auto mb-4" />
                  <CardTitle>Equipamentos Modernos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Equipamentos de última geração para todos os tipos de treino</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <Users className="h-12 w-12 text-red-accent mx-auto mb-4" />
                  <CardTitle>Personal Trainers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Profissionais qualificados para te orientar em cada exercício</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <Clock className="h-12 w-12 text-red-accent mx-auto mb-4" />
                  <CardTitle>Horário Flexível</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aberto das {settings.hours?.weekdays?.open || '05:00'} às {settings.hours?.weekdays?.close || '23:00'} para se adequar à sua rotina</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-red-accent mx-auto mb-4" />
                  <CardTitle>Resultados Garantidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Metodologia comprovada para alcançar seus objetivos</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
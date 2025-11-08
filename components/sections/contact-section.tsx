import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { HomePageClient } from "@/components/home-page-client"

interface ContactSectionProps {
  settings: any
  plans: any[]
}

export function ContactSection({ settings, plans }: ContactSectionProps) {
  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas ou agende uma visita. Estamos aqui para te ajudar!
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>Responderemos em até 24 horas</CardDescription>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <Suspense fallback={<div>Carregando formulário...</div>}>
                <HomePageClient settings={settings} plans={plans} />
              </Suspense>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-6">Informações de Contato</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-accent" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-muted-foreground">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-accent" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-accent" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-muted-foreground">{settings.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Horários de Funcionamento</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span>{settings.hours?.weekdays?.open || '05:00'} - {settings.hours?.weekdays?.close || '23:00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>{settings.hours?.saturday?.open || '07:00'} - {settings.hours?.saturday?.close || '20:00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>{settings.hours?.sunday?.open || '08:00'} - {settings.hours?.sunday?.close || '18:00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
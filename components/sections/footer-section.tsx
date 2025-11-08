import Link from "next/link"
import { Dumbbell } from "lucide-react"

interface FooterSectionProps {
  settings: any
}

export function FooterSection({ settings }: FooterSectionProps) {
  return (
    <footer className="bg-black-red text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-6 w-6 text-red-accent" />
              <h5 className="text-xl font-bold">{settings.name.toUpperCase()}</h5>
            </div>
            <p className="text-muted-foreground">Transformando vidas através do fitness desde 2024.</p>
          </div>
          <div>
            <h6 className="font-bold mb-4">Links Rápidos</h6>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#inicio" className="hover:text-red-accent transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#planos" className="hover:text-red-accent transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="hover:text-red-accent transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#contato" className="hover:text-red-accent transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4">Serviços</h6>
            <ul className="space-y-2 text-muted-foreground">
              <li>Musculação</li>
              <li>Personal Training</li>
              <li>Aulas em Grupo</li>
              <li>Avaliação Física</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4">Contato</h6>
            <ul className="space-y-2 text-muted-foreground">
              <li>{settings.phone}</li>
              <li>{settings.email}</li>
              <li>{settings.address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 {settings.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
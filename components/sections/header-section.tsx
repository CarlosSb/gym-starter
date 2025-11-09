import Link from "next/link"
import Image from "next/image"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { MatriculeSeButton } from "@/components/matricule-se-button"

interface HeaderSectionProps {
  settings: any
}

export function HeaderSection({ settings }: HeaderSectionProps) {
  return (
    <header className="bg-black-red text-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {settings.logo ? (
            <Image src={settings.logo} alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
          ) : (
            <Dumbbell className="h-8 w-8 text-red-accent" />
          )}
          <h1 className="text-2xl font-bold">{settings.name.toUpperCase()}</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#inicio" className="hover:text-red-accent transition-colors">
            Início
          </Link>
          <Link href="#planos" className="hover:text-red-accent transition-colors">
            Planos
          </Link>
          <Link href="#sobre" className="hover:text-red-accent transition-colors">
            Sobre
          </Link>
          <Link href="#contato" className="hover:text-red-accent transition-colors">
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <MatriculeSeButton
              settings={settings}
              className="bg-red-accent hover:bg-red-accent/90 text-white"
            >
              Matricule-se
            </MatriculeSeButton>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-red-accent text-red-accent hover:bg-red-accent hover:text-white bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
          <MobileMenu settings={settings} />
        </div>
      </div>
    </header>
  )
}
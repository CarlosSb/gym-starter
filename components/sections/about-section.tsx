import Image from "next/image"

interface AboutSectionProps {
  settings: any
}

export function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Sobre a {settings.name}</h3>
            <div className="text-lg text-muted-foreground mb-8 text-pretty">
              {settings.about ? (
                <p>{settings.about}</p>
              ) : (
                <>
                  <p className="mb-6">
                    Fundada em 2024, a {settings.name} nasceu com o propósito de revolucionar o conceito de academia. Combinamos
                    tecnologia de ponta com metodologias comprovadas para oferecer uma experiência única de treino.
                  </p>
                  <p>
                    Nossa equipe de profissionais qualificados está sempre pronta para te ajudar a alcançar seus objetivos,
                    seja ganho de massa muscular, perda de peso ou melhoria do condicionamento físico.
                  </p>
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-red-accent">{settings.metrics?.activeMembers || 500}+</div>
                <div className="text-sm text-muted-foreground">Alunos Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-accent">{settings.metrics?.personalTrainers || 15}</div>
                <div className="text-sm text-muted-foreground">Personal Trainers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-accent">{settings.metrics?.operatingHours || "24/7"}</div>
                <div className="text-sm text-muted-foreground">Funcionamento</div>
              </div>
            </div>
          </div>
          <div className="bg-black-red rounded-lg p-8 text-white">
            <Image
              src="/modern-gym-interior-with-red-and-black-equipment.jpg"
              alt={`Interior da academia ${settings.name}`}
              width={400}
              height={256}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h4 className="text-xl font-bold mb-4">Ambiente Motivador</h4>
            <p className="text-muted-foreground">
              Espaço moderno e climatizado, com música ambiente e iluminação especial para criar o ambiente perfeito
              para seus treinos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
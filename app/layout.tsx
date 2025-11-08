import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { getServerSettings } from "@/lib/server-data"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { SEOHead } from "@/components/ui/seo-head"
import "./globals.css"

// Metadata is now handled by SEOHead component

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Buscar configurações para o schema markup
  const settings = await getServerSettings()
  const academyName = settings.name || "Gym Starter"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Schema markup JSON-LD para SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsActivityLocation",
        "name": academyName,
        "description": settings.description || `Academia moderna com equipamentos de última geração, personal trainers qualificados e ambiente motivador.`,
        "url": baseUrl,
        "telephone": settings.phone || "(85) 99999-9999",
        "email": settings.email || "contato@gymstarter.com.br",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings.address || "Av. Santos Dumont, 1515",
          "addressLocality": "São Benedito",
          "addressRegion": "CE",
          "postalCode": "60150-161",
          "addressCountry": "BR"
        },
        "openingHours": [
          `Mo-Fr ${settings.hours?.weekdays?.open || '05:00'}-${settings.hours?.weekdays?.close || '23:00'}`,
          `Sa ${settings.hours?.saturday?.open || '07:00'}-${settings.hours?.saturday?.close || '20:00'}`,
          `Su ${settings.hours?.sunday?.open || '08:00'}-${settings.hours?.sunday?.close || '18:00'}`
        ],
        "priceRange": "R$",
        "image": settings.heroImage || `${baseUrl}/og-image.jpg`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        },
        "sameAs": [
          "https://www.instagram.com/gymstarter",
          "https://www.facebook.com/gymstarter"
        ]
      },
      {
        "@type": "Person",
        "name": "Antônio Carlos Martins Gomes",
        "alternateName": "CarlosSb",
        "url": "https://github.com/CarlosSb",
        "sameAs": [
          "https://github.com/CarlosSb",
          "https://www.linkedin.com/in/antonio-carlos-martins/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+5588992017400",
          "email": "antoniocarlossbcdd@gmail.com",
          "contactType": "Developer"
        },
        "jobTitle": "Desenvolvedor Full Stack",
        "knowsAbout": [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "SEO",
          "Performance Web"
        ]
      },
      {
        "@type": "WebSite",
        "name": academyName,
        "url": baseUrl,
        "description": settings.description || `Academia moderna com equipamentos de última geração, personal trainers qualificados e ambiente motivador.`,
        "author": {
          "@type": "Person",
          "name": "Antônio Carlos Martins Gomes",
          "url": "https://github.com/CarlosSb"
        },
        "publisher": {
          "@type": "Organization",
          "name": academyName
        }
      }
    ]
  }

  return (
    <html lang="pt-BR">
      <head>
        <SEOHead
          title={settings.name || "GymStarter"}
          description={settings.description || "Sistema completo de gestão para academias"}
          keywords={["academia", "fitness", "musculação", "personal trainer", settings.name]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} cz-shortcut-listen="true">
        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-accent mx-auto"></div>
                  <p className="text-muted-foreground">Carregando...</p>
                </div>
              </div>
            }>
              {children}
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Upload, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface AboutData {
  about: string
  metrics: {
    activeMembers: number
    personalTrainers: number
    operatingHours: string
  }
  image: string
  heroImage?: string // Campo separado para não conflitar
}

export default function AboutManagementPage() {
  const [aboutData, setAboutData] = useState<AboutData>({
    about: "",
    metrics: {
      activeMembers: 0,
      personalTrainers: 0,
      operatingHours: ""
    },
    image: "",
    heroImage: "" // Campo separado
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      const response = await fetch("/api/settings")
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.settings) {
          setAboutData({
            about: data.settings.about || "",
            metrics: data.settings.metrics || {
              activeMembers: 0,
              personalTrainers: 0,
              operatingHours: ""
            },
            image: data.settings.aboutImage || "", // Campo existe no schema
            heroImage: data.settings.heroImage || "" // Hero image para referência
          })
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      setError("Erro ao carregar dados da seção Sobre")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")

    try {
      console.log("Salvando dados:", {
        about: aboutData.about,
        metrics: aboutData.metrics,
        aboutImage: aboutData.image
      })

      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about: aboutData.about,
          metrics: aboutData.metrics,
          aboutImage: aboutData.image // Campo adicionado via db push
        })
      })

      console.log("Resposta da API:", response.status, response.statusText)

      const data = await response.json()
      console.log("Dados retornados:", data)

      if (data.success) {
        toast({
          title: "Sucesso!",
          description: "Seção Sobre atualizada com sucesso.",
        })
        // Recarregar dados para confirmar que foi salvo
        await loadAboutData()
      } else {
        setError(data.error || "Erro ao salvar dados")
        console.error("Erro da API:", data.error)
      }
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setError("Erro interno do servidor")
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Apenas imagens JPG, PNG, GIF ou WebP são permitidas.",
        variant: "destructive"
      })
      setIsUploading(false)
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive"
      })
      setIsUploading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Upload failed - Status:', response.status, errorText)
        throw new Error(`Erro ao fazer upload: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        // Atualizar apenas o estado local para preview imediato
        setAboutData(prev => ({
          ...prev,
          image: result.url
        }))

        // Auto-salvar no banco automaticamente após upload bem-sucedido
        try {
          const saveResponse = await fetch("/api/settings", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              about: aboutData.about,
              metrics: aboutData.metrics,
              aboutImage: result.url // Campo adicionado via db push
            })
          })

          const saveResult = await saveResponse.json()

          if (saveResult.success) {
            toast({
              title: "Sucesso!",
              description: "Imagem atualizada e salva automaticamente no banco!",
            })
            // Recarregar dados para confirmar que foi salvo
            await loadAboutData()
          } else {
            toast({
              title: "Upload realizado, mas erro ao salvar",
              description: "A imagem foi enviada, mas houve um problema ao salvar no banco. Tente novamente.",
              variant: "destructive"
            })
          }
        } catch (saveError) {
          console.error('Auto-save error:', saveError)
          toast({
            title: "Upload realizado, mas erro ao salvar",
            description: "A imagem foi enviada, mas houve um problema ao salvar automaticamente. Use 'Salvar Alterações' manualmente.",
            variant: "destructive"
          })
        }
      } else {
        throw new Error(result.error || 'Erro desconhecido')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer upload da imagem. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      // Limpar o input para permitir novo upload
      event.target.value = ''
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-accent" />
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerenciar Seção Sobre</h1>
        <p className="text-muted-foreground">
          Edite o texto, imagem e métricas da seção Sobre da academia
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Texto da Seção Sobre */}
        <Card>
          <CardHeader>
            <CardTitle>Texto da Seção Sobre</CardTitle>
            <CardDescription>
              Edite o texto que aparece na seção Sobre da homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="about-text">Texto Sobre a Academia</Label>
              <Textarea
                id="about-text"
                placeholder="Digite o texto da seção Sobre..."
                value={aboutData.about}
                onChange={(e) => setAboutData(prev => ({
                  ...prev,
                  about: e.target.value
                }))}
                rows={8}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {aboutData.about.length} caracteres
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Imagem da Seção Sobre */}
        <Card>
          <CardHeader>
            <CardTitle>Imagem da Seção Sobre</CardTitle>
            <CardDescription>
              Faça upload de uma nova imagem para a seção Sobre
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aboutData.image ? (
              <div className="space-y-4">
                <Image
                  src={aboutData.image}
                  alt="Imagem da seção Sobre"
                  width={400}
                  height={192}
                  className="max-w-full h-48 object-cover rounded-lg mx-auto"
                />
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild disabled={isUploading}>
                      <span>
                        {isUploading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Fazendo upload...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Alterar
                          </>
                        )}
                      </span>
                    </Button>
                  </Label>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
 
                <Label htmlFor="image-upload-initial" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-red-accent transition-colors">
                    {isUploading ? (
                      <div className="space-y-2">
                        <Loader2 className="h-8 w-8 animate-spin text-red-accent mx-auto" />
                        <p className="text-sm font-medium">Fazendo upload...</p>
                        <p className="text-xs text-muted-foreground">
                          Aguarde enquanto processamos sua imagem
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm font-medium">Clique para fazer upload</p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG, GIF ou WebP (máx. 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </Label>
                <input
                  id="image-upload-initial"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Métricas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Métricas da Academia</CardTitle>
            <CardDescription>
              Configure os números que aparecem na seção Sobre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="active-members">Alunos Ativos</Label>
                <Input
                  id="active-members"
                  type="number"
                  placeholder="500"
                  value={aboutData.metrics.activeMembers}
                  onChange={(e) => setAboutData(prev => ({
                    ...prev,
                    metrics: {
                      ...prev.metrics,
                      activeMembers: parseInt(e.target.value) || 0
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personal-trainers">Personal Trainers</Label>
                <Input
                  id="personal-trainers"
                  type="number"
                  placeholder="15"
                  value={aboutData.metrics.personalTrainers}
                  onChange={(e) => setAboutData(prev => ({
                    ...prev,
                    metrics: {
                      ...prev.metrics,
                      personalTrainers: parseInt(e.target.value) || 0
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operating-hours">Funcionamento</Label>
                <Input
                  id="operating-hours"
                  placeholder="24/7"
                  value={aboutData.metrics.operatingHours}
                  onChange={(e) => setAboutData(prev => ({
                    ...prev,
                    metrics: {
                      ...prev.metrics,
                      operatingHours: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="outline"
          onClick={loadAboutData}
          disabled={isSaving}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-accent hover:bg-red-accent/90"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Preview da Seção Sobre</CardTitle>
          <CardDescription>
            Veja como ficará a seção Sobre com as alterações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Sobre a Gym Starter</h3>
            <p className="text-muted-foreground mb-6 line-clamp-3">
              {aboutData.about || "Texto da seção Sobre aparecerá aqui..."}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-accent">
                  {aboutData.metrics.activeMembers || 0}+
                </div>
                <div className="text-sm text-muted-foreground">Alunos Ativos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-accent">
                  {aboutData.metrics.personalTrainers || 0}
                </div>
                <div className="text-sm text-muted-foreground">Personal Trainers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-accent">
                  {aboutData.metrics.operatingHours || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">Funcionamento</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
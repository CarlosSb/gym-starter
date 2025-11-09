"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Building, Clock, Loader2, Upload, Star, Plus, Trash2 } from "lucide-react"
import DataService, { type AcademySettingsData } from "@/lib/data-service"

export default function SettingsPage() {
  const [settings, setSettings] = useState<AcademySettingsData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true)
      try {
        const loadedSettings = await DataService.getSettings()
        setSettings(loadedSettings)
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleSaveInformation = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const updatedSettings = await DataService.updateSettings({
        name: settings.name,
        description: settings.description,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
      })
      setSettings(updatedSettings)
    } catch (error) {
      console.error("Error saving information:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveHours = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const updatedSettings = await DataService.updateSettings({
        hours: settings.hours,
      })
      setSettings(updatedSettings)
    } catch (error) {
      console.error("Error saving hours:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // REMOVIDO: handleSaveAppearance - função não utilizada

  // REMOVIDO: handleSaveNotifications - função não utilizada

  const handleSaveAbout = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const updatedSettings = await DataService.updateSettings({
        about: settings.about,
      })
      setSettings(updatedSettings)
    } catch (error) {
      console.error("Error saving about:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveHero = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const updatedSettings = await DataService.updateSettings({
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        heroImages: settings.heroImages,
      })
      setSettings(updatedSettings)
    } catch (error) {
      console.error("Error saving hero:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveFeatures = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const updatedSettings = await DataService.updateSettings({
        features: settings.features,
      })
      setSettings(updatedSettings)
    } catch (error) {
      console.error("Error saving features:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveMetrics = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const updatedSettings = await DataService.updateSettings({
        metrics: settings.metrics,
      })
      setSettings(updatedSettings)
    } catch (error) {
      console.error("Error saving metrics:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // REMOVIDO: handleSaveAssistant - função não utilizada

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
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
        alert(`Erro ao fazer upload: ${response.status} - ${response.statusText}`)
        return
      }

      const result = await response.json()
      if (result.success) {
        // Atualizar apenas o estado local para preview imediato
        setSettings({ ...settings!, logo: result.url })

        // Auto-salvar no banco automaticamente após upload bem-sucedido
        try {
          await DataService.updateSettings({
            logo: result.url
          })
          alert('Logo atualizado e salvo automaticamente!')
        } catch (saveError) {
          console.error('Auto-save error:', saveError)
          alert('Logo enviado, mas erro ao salvar automaticamente. As alterações serão salvas quando você salvar outras configurações.')
        }
      } else {
        console.error('Upload failed:', result.error)
        alert('Erro ao fazer upload: ' + (result.error || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erro ao fazer upload da imagem. Verifique sua conexão.')
    } finally {
      setIsUploading(false)
      // Limpar o input para permitir novo upload
      event.target.value = ''
    }
  }

  const handleHeroImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const currentImages = settings!.heroImages || []
      const uploadPromises: Promise<{ success: boolean; url?: string; error?: string }>[] = []

      // Criar promises de upload para processamento paralelo
      for (let i = 0; i < Math.min(files.length, 10 - currentImages.length); i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)

        const uploadPromise = fetch('/api/upload', {
          method: 'POST',
          body: formData,
        }).then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text()
            console.error(`Hero image ${i + 1} upload failed - Status:`, response.status, errorText)
            return { success: false, error: errorText }
          }

          const result = await response.json()
          if (result.success) {
            return { success: true, url: result.url }
          } else {
            console.error(`Hero image ${i + 1} upload failed:`, result.error)
            return { success: false, error: result.error }
          }
        }).catch((error) => {
          console.error(`Hero image ${i + 1} upload error:`, error)
          return { success: false, error: error.message }
        })

        uploadPromises.push(uploadPromise)
      }

      // Executar uploads em paralelo
      const uploadResults = await Promise.allSettled(uploadPromises)

      // Processar resultados
      const newImages: string[] = []
      let successCount = 0
      let errorCount = 0

      uploadResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          if (result.value.success && result.value.url) {
            newImages.push(result.value.url)
            successCount++
          } else {
            errorCount++
          }
        } else {
          console.error(`Upload ${index + 1} rejected:`, result.reason)
          errorCount++
        }
      })

      if (newImages.length > 0) {
        const updatedImages = [...currentImages, ...newImages].slice(0, 10) // Máximo 10 imagens

        // Atualizar apenas o estado local para preview imediato
        setSettings({ ...settings!, heroImages: updatedImages })

        // Auto-salvar no banco automaticamente após upload bem-sucedido
        try {
          await DataService.updateSettings({
            heroImages: updatedImages
          })

          const message = errorCount > 0
            ? `${successCount} imagem(ns) enviada(s) com sucesso! ${errorCount} falhou(aram).`
            : `${successCount} imagem(ns) do hero adicionada(s) e salva(s) automaticamente!`

          alert(message)
        } catch (saveError) {
          console.error('Auto-save error:', saveError)
          alert(`${successCount} imagem(ns) enviada(s), mas erro ao salvar automaticamente. As alterações serão salvas quando você clicar em "Salvar Hero".`)
        }
      } else {
        alert(`Nenhuma imagem foi enviada com sucesso. ${errorCount} erro(s) ocorreram.`)
      }
    } catch (error) {
      console.error('Hero images upload error:', error)
      alert('Erro ao fazer upload das imagens. Verifique sua conexão.')
    } finally {
      setIsUploading(false)
      // Limpar o input para permitir novo upload
      event.target.value = ''
    }
  }

  const addFeature = () => {
    if (!settings?.features) return
    
    const newFeature = {
      icon: "Dumbbell",
      title: "Nova Feature",
      description: "Descrição da nova feature"
    }
    
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        items: [...(settings.features.items || []), newFeature]
      }
    })
  }

  const removeFeature = (index: number) => {
    if (!settings?.features?.items) return
    
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        items: settings.features.items.filter((_, i) => i !== index)
      }
    })
  }

  const updateFeature = (index: number, field: string, value: string) => {
    if (!settings?.features?.items) return
    
    const updatedItems = [...settings.features.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        items: updatedItems
      }
    })
  }

  if (isLoading || !settings) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-red-accent" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Configure as informações e preferências da academia</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Logo da Academia
            </CardTitle>
            <CardDescription>Faça upload do logo da academia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {settings.logo && (
                <div className="w-20 h-20 border rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={settings.logo}
                    alt="Logo da academia"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-red-accent transition-colors">
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Fazendo upload...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Upload className="h-4 w-4" />
                        <span>Clique para fazer upload</span>
                      </div>
                    )}
                  </div>
                </Label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Seção Destaque (Hero)
            </CardTitle>
            <CardDescription>Configure o título, subtítulo e imagem da seção principal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtítulo (Badge)</Label>
              <Input
                id="hero-subtitle"
                value={settings.heroSubtitle || ""}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                placeholder="Ex: Nova Academia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-title">Título Principal</Label>
              <Input
                id="hero-title"
                value={settings.heroTitle || ""}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                placeholder="Ex: TRANSFORME SEU CORPO"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-images">Imagens do Slideshow (máx. 5)</Label>
              <div className="space-y-4">
                {/* Preview das imagens atuais */}
                {settings.heroImages && settings.heroImages.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {settings.heroImages.map((image, index) => (
                      <div key={index} className="relative w-16 h-16 border rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={image}
                          alt={`Imagem ${index + 1} do hero`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            const newImages = settings.heroImages?.filter((_, i) => i !== index) || []
                            setSettings({ ...settings!, heroImages: newImages })
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload de novas imagens */}
                {(settings.heroImages?.length || 0) < 5 && (
                  <div className="flex-1">
                    <Label htmlFor="hero-images-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-red-accent transition-colors">
                        {isUploading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Fazendo upload...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Adicionar imagens ({10 - (settings.heroImages?.length || 0)} restantes)</span>
                          </div>
                        )}
                      </div>
                    </Label>
                    <input
                      id="hero-images-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleHeroImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB cada)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleSaveHero}
              className="bg-red-accent hover:bg-red-accent/90"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Hero
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Seção &ldquo;Por que escolher a Gym Starter&rdquo;
            </CardTitle>
            <CardDescription>Configure os itens de destaque da academia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="features-title">Título da Seção</Label>
              <Input
                id="features-title"
                value={settings.features?.title || ""}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  features: { 
                    ...settings.features!, 
                    title: e.target.value 
                  } 
                })}
                placeholder="Ex: Por que escolher a Gym Starter?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features-description">Descrição da Seção</Label>
              <Textarea
                id="features-description"
                value={settings.features?.description || ""}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  features: { 
                    ...settings.features!, 
                    description: e.target.value 
                  } 
                })}
                rows={2}
                placeholder="Ex: Oferecemos tudo que você precisa para alcançar seus objetivos fitness"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Itens de Destaque</Label>
                <Button onClick={addFeature} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>

              {settings.features?.items?.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Item {index + 1}</Label>
                    <Button 
                      onClick={() => removeFeature(index)} 
                      size="sm" 
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label>Ícone</Label>
                      <select
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, "icon", e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Dumbbell">Dumbbell</option>
                        <option value="Users">Users</option>
                        <option value="Clock">Clock</option>
                        <option value="Trophy">Trophy</option>
                        <option value="Star">Star</option>
                        <option value="Heart">Heart</option>
                        <option value="Shield">Shield</option>
                        <option value="Zap">Zap</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label>Título</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(index, "title", e.target.value)}
                        placeholder="Título do item"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Descrição</Label>
                      <Input
                        value={feature.description}
                        onChange={(e) => updateFeature(index, "description", e.target.value)}
                        placeholder="Descrição do item"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSaveFeatures}
              className="bg-red-accent hover:bg-red-accent/90"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Features
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Academy Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Informações da Academia
            </CardTitle>
            <CardDescription>Dados básicos e informações de contato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="academy-name">Nome da Academia</Label>
              <Input
                id="academy-name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (com código do país)</Label>
              <Input
                id="whatsapp"
                placeholder="5511999999999"
                value={settings.whatsapp || ""}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Formato: 55 + DDD + número (ex: 5511999999999)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>

            <Button
              onClick={handleSaveInformation}
              className="bg-red-accent hover:bg-red-accent/90"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Informações
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Academy Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Métricas da Academia
            </CardTitle>
            <CardDescription>Configure as métricas exibidas na página inicial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="active-members">Alunos Ativos</Label>
                <Input
                  id="active-members"
                  type="number"
                  value={settings.metrics?.activeMembers || 500}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    metrics: { 
                      ...settings.metrics!, 
                      activeMembers: parseInt(e.target.value) || 500 
                    } 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personal-trainers">Personal Trainers</Label>
                <Input
                  id="personal-trainers"
                  type="number"
                  value={settings.metrics?.personalTrainers || 15}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    metrics: { 
                      ...settings.metrics!, 
                      personalTrainers: parseInt(e.target.value) || 15 
                    } 
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operating-hours">Horário de Funcionamento</Label>
                <Input
                  id="operating-hours"
                  placeholder="24/7"
                  value={settings.metrics?.operatingHours || "24/7"}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    metrics: { 
                      ...settings.metrics!, 
                      operatingHours: e.target.value || "24/7" 
                    } 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founded-year">Ano de Fundação</Label>
                <Input
                  id="founded-year"
                  type="number"
                  value={settings.metrics?.foundedYear || 2024}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    metrics: { 
                      ...settings.metrics!, 
                      foundedYear: parseInt(e.target.value) || 2024 
                    } 
                  })}
                />
              </div>
            </div>

            <Button
              onClick={handleSaveMetrics}
              className="bg-red-accent hover:bg-red-accent/90"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Métricas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horários de Funcionamento
            </CardTitle>
            <CardDescription>Configure os horários de abertura e fechamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Segunda a Sexta</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-20"
                    value={settings.hours.weekdays.open}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          weekdays: { ...settings.hours.weekdays, open: e.target.value },
                        },
                      })
                    }
                  />
                  <span>às</span>
                  <Input
                    className="w-20"
                    value={settings.hours.weekdays.close}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          weekdays: { ...settings.hours.weekdays, close: e.target.value },
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Sábado</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-20"
                    value={settings.hours.saturday.open}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          saturday: { ...settings.hours.saturday, open: e.target.value },
                        },
                      })
                    }
                  />
                  <span>às</span>
                  <Input
                    className="w-20"
                    value={settings.hours.saturday.close}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          saturday: { ...settings.hours.saturday, close: e.target.value },
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Domingo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-20"
                    value={settings.hours.sunday.open}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          sunday: { ...settings.hours.sunday, open: e.target.value },
                        },
                      })
                    }
                  />
                  <span>às</span>
                  <Input
                    className="w-20"
                    value={settings.hours.sunday.close}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          sunday: { ...settings.hours.sunday, close: e.target.value },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSaveHours} className="bg-red-accent hover:bg-red-accent/90" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Horários
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* REMOVIDO: Configurações de Aparência */}
        {/* Sistema de cores funciona bem com uma cor primária apenas */}

        {/* REMOVIDO: Configurações do Assistente Virtual */}
        {/* Essas configurações não são mais necessárias pois o assistente funciona automaticamente */}

        {/* REMOVIDO: Sistema de Notificações */}
        {/* Sistema de notificações não está implementado e seria complexo de manter */}
      </div>
    </div>
  )
}

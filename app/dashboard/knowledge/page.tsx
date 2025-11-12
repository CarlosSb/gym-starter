"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Plus, Trash2 } from "lucide-react"
import { z } from "zod"

const knowledgeSchema = z.object({
  question: z.string().min(1, "Pergunta é obrigatória"),
  answer: z.string().min(1, "Resposta é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória")
})

type KnowledgeFormData = z.infer<typeof knowledgeSchema>
type KnowledgeItem = {
  id: string
  question: string
  answer: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function KnowledgePage() {
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const form = useForm<KnowledgeFormData>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: ""
    }
  })

  const loadKnowledge = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/knowledge")
      
      if (response.ok) {
        const data = await response.json()
        
        // API retorna { success: true, knowledge: [...], total: X }
        if (data.success && data.knowledge) {
          setKnowledge(data.knowledge)
        } else if (Array.isArray(data)) {
          // Fallback para array direto
          setKnowledge(data)
        } else {
          console.error("Formato inesperado da resposta:", data)
          toast({
            title: "Aviso",
            description: "Formato de dados inesperado",
            variant: "destructive"
          })
        }
      } else {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.error || "Falha ao carregar knowledge base"
        
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Erro ao carregar knowledge:", error)
      toast({
        title: "Erro",
        description: "Erro de conexão. Verifique se você está logado como administrador.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadKnowledge()
  }, [loadKnowledge])

  const onSubmit = async (data: KnowledgeFormData) => {
    try {
      setSaving(true)
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...data, id: editingId } : data

      const response = await fetch("/api/knowledge", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        const result = await response.json()
        
        toast({
          title: "Sucesso",
          description: editingId ? "Knowledge atualizada com sucesso!" : "Nova knowledge adicionada com sucesso!"
        })
        
        setIsDialogOpen(false)
        form.reset()
        setEditingId(null)
        setEditingItem(null)
        loadKnowledge()
      } else {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.error || "Falha ao salvar knowledge"
        
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Erro ao salvar knowledge:", error)
      toast({
        title: "Erro",
        description: "Erro de conexão. Verifique sua internet e tente novamente.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: KnowledgeItem) => {
    setEditingId(item.id)
    setEditingItem(item)
    form.reset({
      question: item.question,
      answer: item.answer,
      category: item.category
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta entrada? Esta ação não pode ser desfeita.")) return

    try {
      setDeletingId(id)
      const response = await fetch("/api/knowledge", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Knowledge deletada com sucesso!"
        })
        loadKnowledge()
      } else {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.error || "Falha ao deletar knowledge"
        
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Erro ao deletar knowledge:", error)
      toast({
        title: "Erro",
        description: "Erro de conexão. Verifique sua internet e tente novamente.",
        variant: "destructive"
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setEditingItem(null)
    form.reset({
      question: "",
      answer: "",
      category: ""
    })
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Knowledge Base</h1>
          <p className="text-muted-foreground">Adicione e edite respostas para o chat AI</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Nova
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entradas de Knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          {knowledge.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhuma entrada de knowledge encontrada. Adicione a primeira!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pergunta</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {knowledge.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-xs truncate">{item.question}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Knowledge" : "Adicionar Nova Knowledge"}</DialogTitle>
            <DialogDescription>Preencha os campos para {editingId ? "editar" : "adicionar"} uma entrada de knowledge.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pergunta</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Digite a pergunta comum que os usuários podem fazer..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resposta</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Digite a resposta detalhada e útil..." rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: planos, horarios, treinos" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button 
                type="submit" 
                className="bg-red-accent hover:bg-red-accent/90"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {editingId ? "Atualizando..." : "Adicionando..."}
                  </>
                ) : (
                  editingId ? "Atualizar" : "Adicionar"
                )}
              </Button>
            </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
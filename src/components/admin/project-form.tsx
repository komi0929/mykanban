"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useRef } from "react"
import { createProject, updateProject } from "@/app/admin/project-actions"
import { useToast } from "@/components/ui/use-toast"
import { Database } from "@/lib/database.types"
import { Loader2, Plus, Upload } from "lucide-react"
import { createClient } from "@/lib/supabase/client" // for storage upload
import Image from "next/image"

type Project = Database['public']['Tables']['projects']['Row']

export function ProjectForm({ project }: { project?: Project }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(project?.image_url || "")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  

  
  // Refine: If it's a new project/empty URL, default to 'custom' (empty) or 'dev'?
  // Let's default to Custom so they see the input.
  const [urlMode, setUrlMode] = useState<'custom' | 'dev' | 'internal'>(project?.site_url === '#internal' ? 'internal' : (project?.site_url ? 'custom' : 'custom'))
  const [siteUrl, setSiteUrl] = useState(project?.site_url === '#internal' ? '' : (project?.site_url || ""))

  const isEdit = !!project

  async function handleImageUpload(file: File) {
     if (!file) return

     setUploading(true)
     try {
       const supabase = createClient()
       const fileExt = file.name.split('.').pop() || 'png'
       const fileName = `${Math.random()}.${fileExt}`
       const filePath = `${fileName}`

       const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(filePath, file)

       if (uploadError) throw uploadError

       const { data } = supabase.storage.from('project-images').getPublicUrl(filePath)
       setImageUrl(data.publicUrl)
       toast({ title: "画像アップロード", description: "画像のアップロードに成功しました" })
     } catch (error) {
        toast({
           title: "アップロードエラー",
           description: error instanceof Error ? error.message : "予期せぬエラーが発生しました",
           variant: "destructive"
        })
     } finally {
        setUploading(false)
     }
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) handleImageUpload(e.target.files[0])
  }

  const handlePaste = (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items
      for (const item of items) {
          if (item.type.startsWith('image/')) {
              const file = item.getAsFile()
              if (file) handleImageUpload(file)
              e.preventDefault()
              return
          }
      }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.append('image_url', imageUrl)
    
    // Handle URL modes explicitly
    if (urlMode === 'dev') {
        formData.set('site_url', '')
    } else if (urlMode === 'internal') {
        formData.set('site_url', '#internal')
    } else {
        // Custom: Input value is already in formData, keep it.
        // But if user cleared it, it's empty.
    }

    if (isEdit) {
        formData.append('id', project.id)
        const res = await updateProject(formData)
        if (res?.error) {
           toast({ title: "エラー", description: res.error, variant: "destructive" })
        } else {
           toast({ title: "更新完了", description: "プロジェクトを更新しました" })
           setOpen(false)
        }
    } else {
        const res = await createProject(formData)
        if (res?.error) {
           toast({ title: "エラー", description: res.error, variant: "destructive" })
        } else {
           toast({ title: "作成完了", description: "新しいプロジェクトを作成しました" })
           setOpen(false)
           setImageUrl("")
           // Reset form implicitly by closing
        }
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
           <Button variant="outline" size="sm" className="rounded-full">編集</Button>
        ) : (
           <Button className="rounded-full shadow-lg gap-2" size="lg">
             <Plus className="h-5 w-5" />
             新規プロジェクト作成
           </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-white rounded-3xl" onPaste={handlePaste}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "プロジェクト編集" : "新規プロジェクト作成"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "以下の内容を編集してください。" : "カンバンに新しいプロジェクトを追加します。"}
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Image & Status */}
              <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label>カバー画像 (Ctrl+Vで貼付可)</Label>
                    <div 
                      className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                       {imageUrl ? (
                          <>
                            <Image src={imageUrl} alt="Cover" fill className="object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                画像を変更
                             </div>
                          </>
                       ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                             {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <Upload className="h-8 w-8" />}
                             <span className="text-xs">{uploading ? "アップロード中..." : "クリック または ペースト"}</span>
                          </div>
                       )}
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         className="hidden" 
                         accept="image/*" 
                         onChange={onFileInputChange}
                         disabled={uploading}
                       />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">ステータス</Label>
                    <Select name="status" defaultValue={project?.status || "ideation"}>
                      <SelectTrigger className="w-full rounded-xl bg-slate-50 border-0 h-12">
                        <SelectValue placeholder="ステータスを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>ステータス</SelectLabel>
                          <SelectItem value="ideation">妄想中 (Ideation)</SelectItem>
                          <SelectItem value="development">開発中 (Development)</SelectItem>
                          <SelectItem value="live">公開中 (Live)</SelectItem>
                          <SelectItem value="done">一旦保留 (On Hold)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sort_order">並び順 (数字)</Label>
                    <Input id="sort_order" name="sort_order" type="number" defaultValue={project?.sort_order || 0} className="rounded-xl bg-slate-50 border-0 h-12" />
                  </div>
              </div>

              {/* Right Column: Text Fields */}
              <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">プロジェクト名</Label>
                    <Input id="title" name="title" defaultValue={project?.title} className="rounded-xl bg-slate-50 border-0 h-12" required placeholder="例: すごいアプリ" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="summary">概要</Label>
                    <Textarea id="summary" name="summary" defaultValue={project?.summary || ""} className="rounded-xl bg-slate-50 border-0 min-h-[100px]" placeholder="プロジェクトの簡単な説明..." />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="site_url">サイトURL</Label>
                    <div className="flex gap-2 mb-1">
                      <Button type="button" variant={urlMode === 'custom' ? 'default' : 'outline'} className="rounded-full h-8 text-xs" onClick={() => { setUrlMode('custom'); setSiteUrl('') }}>
                         URL入力
                      </Button>
                      <Button type="button" variant={urlMode === 'dev' ? 'default' : 'outline'} className="rounded-full h-8 text-xs" onClick={() => { setUrlMode('dev'); setSiteUrl('') }}>
                         なし（開発中）
                      </Button>
                      <Button type="button" variant={urlMode === 'internal' ? 'default' : 'outline'} className="rounded-full h-8 text-xs" onClick={() => { setUrlMode('internal'); setSiteUrl('') }}>
                         なし（社内ツール）
                      </Button>
                    </div>
                    {urlMode === 'custom' ? (
                       <Input 
                         id="site_url" 
                         name="site_url" 
                         value={siteUrl} 
                         onChange={(e) => setSiteUrl(e.target.value)} 
                         className="rounded-xl bg-slate-50 border-0 h-10" 
                         placeholder="https://..." 
                       />
                    ) : (
                       <div className="h-10 px-3 rounded-xl bg-slate-100 flex items-center text-slate-400 text-sm">
                          {urlMode === 'dev' && "開発中として表示されます"}
                          {urlMode === 'internal' && "社内ツールのためURLは表示されません"}
                          <input type="hidden" name="site_url" value={urlMode === 'internal' ? '#internal' : ''} />
                          {/* Note: 'dev' is empty string (default), 'internal' gets a marker if we want, or just empty. 
                              User asked for specific statuses. Let's start with just empty for 'dev'. 
                              BUT if I pass empty for 'dev', how do I distinguish from 'just empty'?
                              The request implies they are specific statuses. 
                              However, standardizing on empty = 'Not Live Yet' covers 'Dev'.
                              'Internal' might need #internal.
                              Let's use '#internal' for Internal.
                              Let's use '' for Dev.
                          */}
                       </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="memo" className="text-slate-600">開発メモ (公開されます)</Label>
                     <Textarea id="memo" name="memo" defaultValue={project?.memo || ""} className="rounded-xl bg-slate-50 border-0 min-h-[60px]" placeholder="技術スタックや苦労した点など..." />
                  </div>
              </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" className="rounded-full w-full h-12 text-base" disabled={loading || uploading}>
               {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               {isEdit ? "変更を保存" : "プロジェクトを作成"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

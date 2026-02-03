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
  
  const isEdit = !!project

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
     const file = e.target.files?.[0]
     if (!file) return

     setUploading(true)
     try {
       const supabase = createClient()
       const fileExt = file.name.split('.').pop()
       const fileName = `${Math.random()}.${fileExt}`
       const filePath = `${fileName}`

       const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(filePath, file)

       if (uploadError) throw uploadError

       const { data } = supabase.storage.from('project-images').getPublicUrl(filePath)
       setImageUrl(data.publicUrl)
     } catch (error) {
        toast({
           title: "Upload Error",
           description: error instanceof Error ? error.message : "An unknown error occurred",
           variant: "destructive"
        })
     } finally {
        setUploading(false)
     }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.append('image_url', imageUrl)
    if (isEdit) {
        formData.append('id', project.id)
        const res = await updateProject(formData)
        if (res?.error) {
           toast({ title: "Error", description: res.error, variant: "destructive" })
        } else {
           toast({ title: "Updated", description: "Project updated successfully" })
           setOpen(false)
        }
    } else {
        const res = await createProject(formData)
        if (res?.error) {
           toast({ title: "Error", description: res.error, variant: "destructive" })
        } else {
           toast({ title: "Created", description: "Project created successfully" })
           setOpen(false)
           // Reset form implicitly by closing or could add reset logic here
        }
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
           <Button variant="outline" size="sm" className="rounded-full">Edit</Button>
        ) : (
           <Button className="rounded-full shadow-lg gap-2" size="lg">
             <Plus className="h-5 w-5" />
             Create New Project
           </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Create New Project"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update project details below." : "Add a new project to your Kanban board."}
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Image & Status */}
              <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label>Cover Image</Label>
                    <div 
                      className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                       {imageUrl ? (
                          <>
                            <Image src={imageUrl} alt="Cover" fill className="object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                Change Image
                             </div>
                          </>
                       ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                             {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <Upload className="h-8 w-8" />}
                             <span className="text-xs">{uploading ? "Uploading..." : "Click to upload"}</span>
                          </div>
                       )}
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         className="hidden" 
                         accept="image/*" 
                         onChange={handleImageUpload}
                         disabled={uploading}
                       />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={project?.status || "ideation"}>
                      <SelectTrigger className="w-full rounded-xl bg-slate-50 border-0 h-12">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="ideation">妄想中 (Ideation)</SelectItem>
                          <SelectItem value="development">開発中 (Development)</SelectItem>
                          <SelectItem value="live">公開中 (Live)</SelectItem>
                          <SelectItem value="done">一旦完了 (Done)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
              </div>

              {/* Right Column: Text Fields */}
              <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Project Name</Label>
                    <Input id="title" name="title" defaultValue={project?.title} className="rounded-xl bg-slate-50 border-0 h-12" required />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea id="summary" name="summary" defaultValue={project?.summary || ""} className="rounded-xl bg-slate-50 border-0 min-h-[100px]" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="site_url">Site URL</Label>
                    <Input id="site_url" name="site_url" defaultValue={project?.site_url || ""} className="rounded-xl bg-slate-50 border-0 h-10" placeholder="https://..." />
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="memo" className="text-slate-400">Admin Memo (Private)</Label>
                     <Textarea id="memo" name="memo" defaultValue={project?.memo || ""} className="rounded-xl bg-slate-50 border-0 min-h-[60px]" placeholder="Secret notes..." />
                  </div>
              </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" className="rounded-full w-full h-12 text-base" disabled={loading || uploading}>
               {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               {isEdit ? "Save Changes" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

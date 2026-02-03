"use client"

import { Database } from "@/lib/database.types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

type Project = Database['public']['Tables']['projects']['Row']

export function ProjectCard({ project }: { project: Project }) {
  // Map status to label
  const statusLabels = {
    ideation: '妄想中',
    development: '開発中',
    live: '公開中',
    done: '一旦完了'
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group cursor-pointer rounded-3xl bg-white p-4 shadow-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1 w-full">
          {/* Card Visual / Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
             {project.image_url ? (
                <Image 
                  src={project.image_url} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
             ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
                    <span className="text-4xl font-bold opacity-30 select-none">?</span>
                </div>
             )}
          </div>
          
          <div className="mt-4 px-1">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{project.title}</h3>
             </div>
             <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
               {project.summary || "No description"}
             </p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl bg-white p-6 sm:p-8">
        <DialogHeader>
          <div className="mb-6 overflow-hidden rounded-2xl bg-slate-100 relative aspect-video w-full shadow-inner">
               {project.image_url ? (
                <Image 
                  src={project.image_url} 
                  alt={project.title}
                  fill
                  className="object-cover"
                />
             ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
                    <span className="text-6xl font-bold opacity-30 select-none">No Image</span>
                </div>
             )}
          </div>
          <div className="flex flex-col gap-2 text-left">
             <div className="flex items-center gap-3">
                <DialogTitle className="text-3xl pt-2">{project.title}</DialogTitle>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 mt-2">
                    {statusLabels[project.status]}
                </div>
             </div>
          </div>
        </DialogHeader>
        
        <DialogDescription className="mt-4 text-base leading-7 text-slate-600">
           {project.summary || "No description provided."}
        </DialogDescription>
        
        <div className="mt-8 flex justify-end gap-3">
             {project.site_url ? (
                 <Button asChild className="rounded-full bg-black text-white px-8 h-12 text-base hover:bg-slate-800 hover:shadow-lg transition-all" size="lg">
                    <a href={project.site_url} target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="mr-2 h-4 w-4" />
                       サイトを見る
                    </a>
                 </Button>
             ) : (
                 <Button disabled className="rounded-full px-8 h-12 text-base opacity-50" size="lg">
                    Not Live Yet
                 </Button>
             )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

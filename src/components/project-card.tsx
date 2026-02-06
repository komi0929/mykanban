"use client"

import { Database } from "@/lib/database.types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { YellButton } from "@/components/feedback/yell-button"
import { AdviceModal } from "@/components/feedback/advice-modal"

type Project = Database['public']['Tables']['projects']['Row'] & { yell_count?: number }

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
        <div className="group cursor-pointer rounded-3xl bg-white p-4 shadow-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1 w-full relative">
          {/* Card Visual / Image */}
          {project.image_url && (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[20px] bg-slate-100 shadow-inner">
              <Image 
                src={project.image_url} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          
          <div className="mt-4 px-1">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{project.title}</h3>
                {project.yell_count !== undefined && project.yell_count > 0 && (
                  <div className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                    <span>🎉</span> {project.yell_count}
                  </div>
                )}
             </div>
             <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
               {project.summary || "No description"}
             </p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl bg-white p-6 sm:p-8">
        <DialogHeader>
          {project.image_url && (
            <div className="mb-6 overflow-hidden rounded-2xl bg-slate-100 relative aspect-video w-full shadow-inner">
                <Image 
                  src={project.image_url} 
                  alt={project.title}
                  fill
                  className="object-cover"
                />
            </div>
          )}
          <div className="flex flex-col gap-2 text-left">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <DialogTitle className="text-3xl pt-2">{project.title}</DialogTitle>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 mt-2">
                        {statusLabels[project.status]}
                    </div>
                </div>
                {/* Yell Button in proper place */}
                <div className="mt-2">
                  <YellButton projectId={project.id} initialCount={project.yell_count || 0} />
                </div>
             </div>
          </div>
        </DialogHeader>
        
         <DialogDescription className="mt-4 text-base leading-7 text-slate-600">
            {project.summary || "No description provided."}
         </DialogDescription>

         {/* Dev Note (Memo) - Visible only in details */}
         {project.memo && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
               <p className="text-sm font-bold text-slate-400 mb-2">開発メモ</p>
               <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{project.memo}</p>
            </div>
         )}
         
         <div className="mt-8 flex justify-between items-center border-t border-slate-100 pt-6">
             {/* Advice Button */}
             <AdviceModal projectId={project.id} projectTitle={project.title} />

             {/* Site Link */}
             {project.site_url ? (
                 <Button asChild className="rounded-full bg-black text-white px-8 h-12 text-base hover:bg-slate-800 hover:shadow-lg transition-all shadow-md" size="lg">
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

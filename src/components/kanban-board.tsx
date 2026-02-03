"use client"

import { Database } from "@/lib/database.types"
import { ProjectCard } from "@/components/project-card"
import Image from "next/image"

type Project = Database['public']['Tables']['projects']['Row']

type KanbanBoardProps = {
  projects: Project[]
}

const COLUMNS = [
  { id: 'ideation', label: '妄想中', color: 'bg-pink-100 text-pink-700 ring-pink-200', icon: '/assets/3d/ideation.png' },
  { id: 'development', label: '開発中', color: 'bg-purple-100 text-purple-700 ring-purple-200', icon: '/assets/3d/development.png' },
  { id: 'live', label: '公開中', color: 'bg-sky-100 text-sky-700 ring-sky-200', icon: '/assets/3d/live.png' },
  { id: 'done', label: '一旦完了', color: 'bg-emerald-100 text-emerald-700 ring-emerald-200', icon: '/assets/3d/done.png' },
] as const

export function KanbanBoard({ projects }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 min-h-[500px]">
      {COLUMNS.map((col) => {
        const colProjects = projects.filter(p => p.status === col.id)
        
        return (
          <div key={col.id} className="flex flex-col gap-4 p-4 rounded-[32px] bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm transition-colors hover:bg-white/60">
            {/* Header with 3D Icon */}
            <div className="flex flex-col items-center justify-center -mt-8 mb-4">
                 <div className="relative w-24 h-24 drop-shadow-xl transition-transform hover:scale-110 duration-300">
                     <Image src={col.icon} alt={col.label} fill className="object-contain" />
                 </div>
                 <div className="flex items-center gap-2 mt-2">
                     <div className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-base font-black ring-2 ring-inset tracking-wide shadow-sm bg-white ${col.color.replace('bg-', 'text-').replace('ring-', 'border-')}`}>
                        {col.label}
                     </div>
                     <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white text-slate-400 text-xs font-bold shadow-sm ring-1 ring-slate-100">{colProjects.length}</span>
                 </div>
            </div>
            
            <div className="flex flex-col gap-4 min-h-[150px]">
              {colProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {colProjects.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full min-h-[150px] rounded-3xl border-2 border-dashed border-slate-200/60 bg-slate-50/30 text-center group">
                    <p className="text-slate-300 text-sm font-bold group-hover:text-slate-400 transition-colors">Empty</p>
                 </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

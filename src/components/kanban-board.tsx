"use client"

import { Database } from "@/lib/database.types"
import { ProjectCard } from "@/components/project-card"

type Project = Database['public']['Tables']['projects']['Row']

type KanbanBoardProps = {
  projects: Project[]
}

const COLUMNS = [
  { id: 'ideation', label: '妄想中', color: 'bg-pink-100 text-pink-700 ring-pink-200' },
  { id: 'development', label: '開発中', color: 'bg-purple-100 text-purple-700 ring-purple-200' },
  { id: 'live', label: '公開中', color: 'bg-sky-100 text-sky-700 ring-sky-200' },
  { id: 'done', label: '一旦完了', color: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
] as const

export function KanbanBoard({ projects }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 min-h-[500px]">
      {COLUMNS.map((col) => {
        const colProjects = projects.filter(p => p.status === col.id)
        
        return (
          <div key={col.id} className="flex flex-col gap-4 p-4 rounded-[32px] bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm transition-colors hover:bg-white/60">
            <div className="flex items-center justify-between pl-2 pr-2 mb-2">
                <div className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-bold ring-2 ring-inset transition-shadow ${col.color} shadow-sm`}>
                  {col.label}
                </div>
               <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-slate-400 text-xs font-bold shadow-sm">{colProjects.length}</span>
            </div>
            
            <div className="flex flex-col gap-4 min-h-[150px]">
              {colProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {colProjects.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full min-h-[150px] rounded-[24px] border-2 border-dashed border-slate-200/60 bg-slate-50/30 text-center group">
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

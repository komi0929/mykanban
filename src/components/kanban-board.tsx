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
          <div key={col.id} className="flex flex-col gap-6">
            <div className="flex items-center justify-between pl-2 pr-4">
                <div className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-bold ring-1 ring-inset ${col.color}`}>
                  {col.label}
                </div>
               <span className="text-slate-400 text-sm font-bold">{colProjects.length}</span>
            </div>
            
            <div className="flex flex-col gap-5">
              {colProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {colProjects.length === 0 && (
                 <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center">
                    <p className="text-slate-400 text-sm font-medium">No projects</p>
                 </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

"use client"

import { Database } from "@/lib/database.types"
import { ProjectCard } from "@/components/project-card"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Project = Database['public']['Tables']['projects']['Row']

type KanbanBoardProps = {
  projects: Project[]
}

const COLUMNS = [
  { id: 'ideation', label: '妄想中', color: 'text-amber-500', icon: '/assets/3d/ideation.png' },
  { id: 'development', label: '開発中', color: 'text-purple-600', icon: '/assets/3d/development.png' },
  { id: 'live', label: '公開中', color: 'text-rose-500', icon: '/assets/3d/live.png' },
  { id: 'done', label: '一旦保留', color: 'text-emerald-600', icon: '/assets/3d/pending.png' },
] as const

import { useState } from "react"
import { cn } from "@/lib/utils"

export function KanbanBoard({ projects }: KanbanBoardProps) {
  const [activeTab, setActiveTab] = useState<typeof COLUMNS[number]['id']>('ideation')

  return (
    <>
      {/* Mobile View (Tabs) */}
      <div className="md:hidden space-y-6">
        {/* Tab Navigation */}
        <div className="flex p-1 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar">
           {COLUMNS.map((col) => (
             <button
               key={col.id}
               onClick={() => setActiveTab(col.id)}
               className={cn(
                 "flex-1 min-w-[80px] py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap",
                 activeTab === col.id 
                   ? "bg-white text-slate-800 shadow-sm" 
                   : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
               )}
             >
               {col.label}
             </button>
           ))}
        </div>

        {/* Active Tab Content */}
        <div className="min-h-[400px]">
          {COLUMNS.map((col) => {
             if (col.id !== activeTab) return null
             
             const colProjects = projects.filter(p => p.status === col.id)
             return (
                <div key={col.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <div className="relative w-24 h-24 mb-2">
                             <Image 
                                src={col.icon} 
                                alt={col.label} 
                                fill 
                                className="object-contain mix-blend-multiply" 
                             />
                        </div>
                        <h2 className={cn("text-lg font-black tracking-widest", col.color)}>
                           {col.label}
                        </h2>
                    </div>
                    
                    <div className="flex flex-col gap-4 pb-12">
                      {colProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                      {colProjects.length === 0 && (
                         <div className="flex flex-col items-center justify-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200/60 bg-slate-50/30 text-center">
                            <p className="text-slate-400 text-sm font-bold">No projects in this stage</p>
                         </div>
                      )}
                    </div>
                </div>
             )
          })}
        </div>
      </div>

      {/* Desktop View (Grid) */}
      <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 min-h-[500px]">
        {COLUMNS.map((col) => {
          const colProjects = projects.filter(p => p.status === col.id)
          
          return (
            <div key={col.id} className="flex flex-col gap-4 p-4 rounded-[32px] bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm transition-colors hover:bg-white/60">
              {/* Header with 3D Icon */}
              <div className="flex flex-col items-center justify-center mb-6 pt-4">
                   <div className="relative w-32 h-32 transition-transform hover:scale-105 duration-500">
                       <Image 
                          src={col.icon} 
                          alt={col.label} 
                          fill 
                          className="object-contain mix-blend-multiply p-2" 
                       />
                   </div>
                   <div className="flex items-center justify-center -mt-4 z-10">
                       <div className={`text-xl font-black tracking-widest ${col.color}`}>
                          {col.label}
                       </div>
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
    </>
  )
}

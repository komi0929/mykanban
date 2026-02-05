import { LucideIcon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type UpdateLogItem = {
  date: string
  content: string
  tag?: string
  icon?: LucideIcon
  iconColor?: string
}

// Initial data
const UPDATE_LOGS: UpdateLogItem[] = [
  {
    date: "2026年2月5日",
    content: "サイト公開しました",
    tag: "Release",
    icon: Sparkles,
    iconColor: "text-amber-400"
  },
]

export function UpdateLog() {
  return (
    <div className="w-full max-w-2xl mx-auto text-left">
        <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            更新情報
        </h2>
        
        <div className="relative pl-4 space-y-8">
            {/* Timeline Line */}
            <div className="absolute top-2 bottom-2 left-[19px] w-px border-l-2 border-dashed border-slate-200" />
            
            {UPDATE_LOGS.map((item, index) => (
                <div key={index} className="relative pl-10">
                    {/* Icon Bubble */}
                    <div className="absolute left-0 top-0.5 w-10 h-10 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center z-10">
                        {item.icon ? (
                            <item.icon className={cn("w-5 h-5", item.iconColor)} />
                        ) : (
                            <Sparkles className="w-5 h-5 text-slate-400" />
                        )}
                    </div>

                    {/* Content Header */}
                    <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                        <span className="font-bold text-slate-500 text-sm">
                            {item.date}
                        </span>
                        {item.tag && (
                            <span className="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">
                                {item.tag}
                            </span>
                        )}
                    </div>
                    
                    {/* Content Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="font-bold text-slate-700">
                            {item.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

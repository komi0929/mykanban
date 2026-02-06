"use client"

import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MessageSquareText, Loader2 } from "lucide-react"
import { getAdvice } from "@/app/actions/feedback"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FeedbackSheetProps {
  projectId: string
  projectTitle: string
  adviceCount: number
}

interface Advice {
  id: string
  sender_name: string | null
  message: string
  created_at: string
  project_id: string
}

export function FeedbackSheet({ projectId, projectTitle, adviceCount }: FeedbackSheetProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [adviceList, setAdviceList] = useState<Advice[]>([])

  useEffect(() => {
    if (open) {
      setLoading(true)
      getAdvice(projectId).then((result) => {
        if (result.success && result.data) {
          setAdviceList(result.data as Advice[])
        }
        setLoading(false)
      })
    }
  }, [open, projectId])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-full relative">
           <MessageSquareText className="h-4 w-4" />
           {adviceCount > 0 && (
             <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
               {adviceCount}
             </span>
           )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Feedback for {projectTitle}</SheetTitle>
          <SheetDescription>
            Received advice and messages.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 h-[calc(100vh-150px)]">
           {loading ? (
             <div className="flex h-full items-center justify-center text-slate-400 gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading feedback...</span>
             </div>
           ) : adviceList.length === 0 ? (
             <div className="flex h-full items-center justify-center text-slate-400 flex-col gap-2">
                <MessageSquareText className="h-12 w-12 opacity-20" />
                <p>No advice received yet.</p>
             </div>
           ) : (
             <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {adviceList.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                       <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-slate-700">
                            {item.sender_name || "Anonymous"}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(item.created_at).toLocaleString('ja-JP')}
                          </span>
                       </div>
                       <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                         {item.message}
                       </p>
                    </div>
                  ))}
                </div>
             </ScrollArea>
           )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

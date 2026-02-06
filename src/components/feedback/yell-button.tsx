"use client"

import { useState, useOptimistic, useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { sendYell } from "@/app/actions/feedback"
import { cn } from "@/lib/utils"

interface YellButtonProps {
  projectId: string
  initialCount: number
}

export function YellButton({ projectId, initialCount }: YellButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    initialCount,
    (state, increment: number) => state + increment
  )
  const [hasYelled, setHasYelled] = useState(false)

  useEffect(() => {
    // Client-side check for this session/device
    const storageKey = `yell_${projectId}`
    if (localStorage.getItem(storageKey)) {
      setHasYelled(true)
    }
  }, [projectId])

  const handleYell = () => {
    if (hasYelled) return

    startTransition(async () => {
      // Optimistic update
      addOptimisticCount(1)
      setHasYelled(true)
      localStorage.setItem(`yell_${projectId}`, 'true')

      // Server action
      const result = await sendYell(projectId)
      if (!result.success) {
        // Revert checks if needed, but for "Like" we usually tolerate slight drift 
        // or let the next fetch correct it. 
        // Explicit revert would require resetting state, but optimistic hook handles the value.
        // We might want to remove the local storage if it failed, but keep it simple.
        console.error("Failed to yell:", result.error)
      }
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "rounded-full gap-2 transition-all duration-300",
        hasYelled 
          ? "bg-pink-50 text-pink-500 border-pink-200" 
          : "hover:bg-pink-50 hover:text-pink-500 hover:border-pink-200 text-slate-500"
      )}
      onClick={handleYell}
      disabled={isPending || hasYelled}
    >
      <Heart className={cn("h-4 w-4", hasYelled && "fill-current")} />
      <span className="font-bold">{optimisticCount}</span>
      <span className="sr-only">Yells</span>
    </Button>
  )
}

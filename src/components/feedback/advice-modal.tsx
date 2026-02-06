"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Lightbulb, Send } from "lucide-react"
import { sendAdvice } from "@/app/actions/feedback"
import { useToast } from "@/components/ui/use-toast"

interface AdviceModalProps {
  projectId: string
  projectTitle: string
}

export function AdviceModal({ projectId, projectTitle }: AdviceModalProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendAdvice(projectId, formData)

      if (result.success) {
        toast({
          title: "アドバイスを送信しました！",
          description: "貴重なご意見ありがとうございます。",
        })
        setOpen(false)
      } else {
        toast({
          title: "送信に失敗しました",
          description: result.error || "エラーが発生しました。",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full gap-2 text-slate-600 hover:text-slate-900 border-slate-200">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span>アドバイス</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>アドバイスを送る</DialogTitle>
          <DialogDescription>
            {projectTitle}への応援やアドバイスをお願いします！<br />
            <span className="text-xs text-slate-400">※名前は省略可能です（匿名になります）</span>
          </DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">お名前 (任意)</Label>
            <Input id="name" name="name" placeholder="匿名希望" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">メッセージ (必須)</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="ここが良かった、もっとこうして欲しい、など..." 
              required
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="rounded-full w-full sm:w-auto">
              {isPending ? (
                "送信中..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> 送信
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

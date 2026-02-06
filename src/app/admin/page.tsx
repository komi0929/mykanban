import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/database.types'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProjectForm } from '@/components/admin/project-form'
import { logout } from './actions'
import { Trash2, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { deleteProject } from './project-actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FeedbackSheet } from '@/components/admin/feedback-sheet'

export const revalidate = 0

export default async function AdminPage() {
  const supabase = await createClient()

  // Verify auth again
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  const { data: projectsData } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  
  const projectsRaw = projectsData as Database['public']['Tables']['projects']['Row'][] | null

  // Fetch stats (Parallelized)
  const projects = await Promise.all(
    (projectsRaw || []).map(async (p) => {
      // Get Yell Count
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { count: yellCount } = await (supabase as any)
        .from('yells')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', p.id)

      // Get Advice Count
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { count: adviceCount } = await (supabase as any)
        .from('advice')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', p.id)

      return { 
        ...p, 
        yell_count: yellCount || 0,
        advice_count: adviceCount || 0
      }
    })
  )

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
             <Button asChild variant="outline" className="rounded-full gap-2">
                <a href="/" target="_blank" rel="noopener noreferrer">
                   <ExternalLink className="h-4 w-4" />
                   ホームを開く
                </a>
             </Button>
             <form action={async () => {
                'use server'
                await logout()
             }}>
                <Button variant="ghost" className="text-slate-500 hover:text-slate-900">ログアウト</Button>
             </form>
          </div>
        </header>

        <Card className="rounded-[32px] border-none shadow-sm bg-transparent">
           <CardHeader className="flex flex-row items-center justify-between px-0 py-6">
              <CardTitle className="text-2xl font-bold text-slate-800">Projects</CardTitle>
              <ProjectForm />
           </CardHeader>
           <CardContent className="px-0 pb-0">
              <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead className="w-[50px] text-center">Ord</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-[100px] text-center">Feedback</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[120px]">URL</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects?.map((project) => (
                      <TableRow key={project.id} className="hover:bg-slate-50/50 border-slate-100">
                        <TableCell className="py-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                            {project.image_url ? (
                               <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                            ) : (
                               <div className="flex h-full w-full items-center justify-center text-slate-300 text-lg">📦</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono text-slate-400">
                            {project.sort_order}
                        </TableCell>
                        <TableCell className="font-bold text-slate-700">
                           {project.title}
                        </TableCell>
                        <TableCell className="text-center">
                           <div className="flex items-center justify-center gap-3">
                              <div className="flex items-center gap-1 text-xs font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-full" title="Yells">
                                 <span>♥</span> {project.yell_count}
                              </div>
                              <FeedbackSheet 
                                projectId={project.id} 
                                projectTitle={project.title}
                                adviceCount={project.advice_count}
                              />
                           </div>
                        </TableCell>
                        <TableCell>
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap
                             ${project.status === 'ideation' ? 'bg-pink-100 text-pink-600' : ''}
                             ${project.status === 'development' ? 'bg-purple-100 text-purple-600' : ''}
                             ${project.status === 'live' ? 'bg-sky-100 text-sky-600' : ''}
                             ${project.status === 'done' ? 'bg-emerald-100 text-emerald-600' : ''}
                           `}>
                             {project.status}
                           </span>
                        </TableCell>
                        <TableCell>
                           {project.site_url ? (
                             <a href={project.site_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-sky-600 hover:underline">
                               <ExternalLink className="h-3 w-3" />
                               Link
                             </a>
                           ) : (
                             <span className="text-xs text-slate-400">None</span>
                           )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <ProjectForm project={project} />
                            <form action={async () => {
                               'use server'
                               await deleteProject(project.id)
                            }}>
                               <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full">
                                  <Trash2 className="h-4 w-4" />
                               </Button>
                            </form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!projects || projects.length === 0) && (
                       <TableRow>
                          <TableCell colSpan={7} className="h-48 text-center text-slate-400">
                             No projects found. Create one to get started.
                          </TableCell>
                       </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

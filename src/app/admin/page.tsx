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
  
  const projects = projectsData as Database['public']['Tables']['projects']['Row'][] | null

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects?.map((project) => (
                    <div key={project.id} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 rounded-[24px] p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100/50">
                        {/* Image / Cover */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-slate-100 mb-4">
                          {project.image_url ? (
                             <Image src={project.image_url} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                             <div className="flex h-full w-full items-center justify-center text-slate-300">
                                <span className="text-4xl">📦</span>
                             </div>
                          )}
                          {/* Floating Status Badge */}
                          <div className="absolute top-3 left-3">
                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border border-white/20
                               ${project.status === 'ideation' ? 'bg-pink-100/90 text-pink-600' : ''}
                               ${project.status === 'development' ? 'bg-purple-100/90 text-purple-600' : ''}
                               ${project.status === 'live' ? 'bg-sky-100/90 text-sky-600' : ''}
                               ${project.status === 'done' ? 'bg-emerald-100/90 text-emerald-600' : ''}
                             `}>
                               {project.status}
                             </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                           <div className="flex items-start justify-between">
                              <h3 className="font-bold text-lg text-slate-700 line-clamp-1">{project.title}</h3>
                           </div>
                           
                           {/* Actions Footer */}
                           <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-4">
                               <div className="flex gap-2">
                                  {project.site_url && (
                                     <a href={project.site_url} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-sky-50 hover:text-sky-500 transition-colors">
                                        <ExternalLink className="h-4 w-4" />
                                     </a>
                                  )}
                               </div>
                               <div className="flex items-center gap-1">
                                    <ProjectForm project={project} />
                                    <form action={async () => {
                                       'use server'
                                       await deleteProject(project.id)
                                    }}>
                                       <Button size="icon" variant="ghost" className="h-9 w-9 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full">
                                          <Trash2 className="h-4 w-4" />
                                       </Button>
                                    </form>
                               </div>
                           </div>
                        </div>
                    </div>
                  ))}
                  
                  {/* Empty State / Add New Placeholder */}
                  {(!projects || projects.length === 0) && (
                     <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/50 rounded-[32px] border-2 border-dashed border-slate-200">
                        <div className="text-6xl mb-4">✨</div>
                        <h3 className="text-xl font-bold text-slate-400">No projects yet</h3>
                        <p className="text-slate-400 mb-6">Create your first bento box!</p>
                        <ProjectForm />
                     </div>
                  )}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

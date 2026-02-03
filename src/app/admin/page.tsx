import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/database.types'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
    .order('created_at', { ascending: false })
  
  const projects = projectsData as Database['public']['Tables']['projects']['Row'][] | null

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
             <form action={async () => {
                'use server'
                await logout()
             }}>
                <Button variant="ghost" className="text-slate-500 hover:text-slate-900">Log out</Button>
             </form>
          </div>
        </header>

        <Card className="rounded-[32px] border-none shadow-sm">
           <CardHeader className="flex flex-row items-center justify-between px-8 py-6">
              <CardTitle>Projects</CardTitle>
              <ProjectForm />
           </CardHeader>
           <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent px-8">
                    <TableHead className="w-[100px] pl-8">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">URL</TableHead>
                    <TableHead className="text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects?.map((project) => (
                    <TableRow key={project.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium pl-8">
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-100">
                          {project.image_url && (
                             <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-700">{project.title}</TableCell>
                      <TableCell>
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           ${project.status === 'ideation' ? 'bg-pink-100 text-pink-800' : ''}
                           ${project.status === 'development' ? 'bg-purple-100 text-purple-800' : ''}
                           ${project.status === 'live' ? 'bg-sky-100 text-sky-800' : ''}
                           ${project.status === 'done' ? 'bg-emerald-100 text-emerald-800' : ''}
                         `}>
                           {project.status}
                         </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-[200px]">
                         {project.site_url ? (
                            <a href={project.site_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                               {project.site_url} <ExternalLink className="h-3 w-3" />
                            </a>
                         ) : '-'}
                      </TableCell>
                      <TableCell className="text-right pr-8">
                         <div className="flex items-center justify-end gap-2">
                             <ProjectForm project={project} />
                             <form action={async () => {
                                'use server'
                                await deleteProject(project.id)
                             }}>
                                <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                                   <Trash2 className="h-4 w-4" />
                                </Button>
                             </form>
                         </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!projects || projects.length === 0) && (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                            No projects found. Create one to get started.
                        </TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

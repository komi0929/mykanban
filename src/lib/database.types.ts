export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          status: 'ideation' | 'development' | 'live' | 'done'
          summary: string | null
          memo: string | null
          image_url: string | null
          site_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          status?: 'ideation' | 'development' | 'live' | 'done'
          summary?: string | null
          memo?: string | null
          image_url?: string | null
          site_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          status?: 'ideation' | 'development' | 'live' | 'done'
          summary?: string | null
          memo?: string | null
          image_url?: string | null
          site_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

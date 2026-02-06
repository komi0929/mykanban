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
          sort_order: number | null
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
          sort_order?: number | null
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
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      yells: {
        Row: {
          id: string
          project_id: string
          session_id: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          session_id: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          session_id?: string
          created_at?: string
        }
      }
      advice: {
        Row: {
          id: string
          project_id: string
          sender_name: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          sender_name?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          sender_name?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}

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
      // ── Gallery: series / publication ────────────────────────────────────────
      publications: {
        Row: {
          id: string
          num: string              // display label: '01', '02', ...
          title: string            // 'Series I', 'Summer 2024', etc.
          year: string             // '2024'
          essay: string | null     // prose for the series
          display_order: number
          visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          num: string
          title: string
          year: string
          essay?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          num?: string
          title?: string
          year?: string
          essay?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
        }
      }

      // ── Gallery: individual photos ────────────────────────────────────────────
      photos: {
        Row: {
          id: string
          publication_id: string
          image_url: string        // full public URL from Supabase Storage
          alt: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          publication_id: string
          image_url: string
          alt?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          publication_id?: string
          image_url?: string
          alt?: string | null
          display_order?: number
          created_at?: string
        }
      }

      // ── Projects ──────────────────────────────────────────────────────────────
      projects: {
        Row: {
          id: string
          title: string
          year: string             // '2024', '2023', etc.
          description: string
          technologies: string[]
          github_url: string | null
          live_url: string | null
          display_order: number
          visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          year: string
          description: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          year?: string
          description?: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          display_order?: number
          visible?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// ── Convenience row types ─────────────────────────────────────────────────────
export type Publication = Database['public']['Tables']['publications']['Row']
export type Photo = Database['public']['Tables']['photos']['Row']
export type Project = Database['public']['Tables']['projects']['Row']

// Publication with its photos nested (returned by Supabase select with join)
export type PublicationWithPhotos = Publication & {
  photos: Photo[]
}

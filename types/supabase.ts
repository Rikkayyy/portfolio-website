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
          description: string
          technologies: string[]
          github_url: string | null
          live_url: string | null
          image_url: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      photography: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          location: string | null
          camera: string | null
          lens: string | null
          settings: string | null
          image_url: string
          thumbnail_url: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          location?: string | null
          camera?: string | null
          lens?: string | null
          settings?: string | null
          image_url: string
          thumbnail_url?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          location?: string | null
          camera?: string | null
          lens?: string | null
          settings?: string | null
          image_url?: string
          thumbnail_url?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
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

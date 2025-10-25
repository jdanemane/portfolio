export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          tagline: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tagline: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tagline?: string
          created_at?: string
          updated_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          profile_id: string
          title: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          title?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_items: {
        Row: {
          id: string
          section_id: string
          title: string
          type: 'project' | 'role' | 'skill' | 'info'
          year?: string
          company?: string
          location?: string
          description: string
          details?: string
          content?: string
          url?: string
          tech?: string[]
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_id: string
          title: string
          type: 'project' | 'role' | 'skill' | 'info'
          year?: string
          company?: string
          location?: string
          description: string
          details?: string
          content?: string
          url?: string
          tech?: string[]
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_id?: string
          title?: string
          type?: 'project' | 'role' | 'skill' | 'info'
          year?: string
          company?: string
          location?: string
          description?: string
          details?: string
          content?: string
          url?: string
          tech?: string[]
          order_index?: number
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

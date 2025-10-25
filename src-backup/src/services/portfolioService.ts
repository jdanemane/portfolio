import { supabase } from '../lib/supabase'
import { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Section = Database['public']['Tables']['sections']['Row']
type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']

export interface PortfolioProfile {
  id: string
  name: string
  tagline: string
  sections: Array<Section & {
    items: PortfolioItem[]
  }>
}

export class SupabasePortfolioService {
  // Profile methods
  async getProfile(): Promise<PortfolioProfile | null> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return null
      }

      const { data: sections, error: sectionsError } = await supabase
        .from('sections')
        .select(`
          *,
          portfolio_items (*)
        `)
        .eq('profile_id', profile.id)
        .order('order_index')

      if (sectionsError) {
        console.error('Error fetching sections:', sectionsError)
        return null
      }

      return {
        id: profile.id,
        name: profile.name,
        tagline: profile.tagline,
        sections: sections.map(section => ({
          ...section,
          items: section.portfolio_items.sort((a, b) => a.order_index - b.order_index)
        }))
      }
    } catch (error) {
      console.error('Error in getProfile:', error)
      return null
    }
  }

  async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error updating profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateProfile:', error)
      return null
    }
  }

  // Section methods
  async createSection(section: Omit<Section, 'id' | 'created_at' | 'updated_at'>): Promise<Section | null> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .insert(section)
        .select()
        .single()

      if (error) {
        console.error('Error creating section:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createSection:', error)
      return null
    }
  }

  async updateSection(id: string, section: Partial<Section>): Promise<Section | null> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .update({
          ...section,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating section:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateSection:', error)
      return null
    }
  }

  async deleteSection(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting section:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in deleteSection:', error)
      return false
    }
  }

  // Portfolio item methods
  async createPortfolioItem(item: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioItem | null> {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert(item)
        .select()
        .single()

      if (error) {
        console.error('Error creating portfolio item:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createPortfolioItem:', error)
      return null
    }
  }

  async updatePortfolioItem(id: string, item: Partial<PortfolioItem>): Promise<PortfolioItem | null> {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .update({
          ...item,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating portfolio item:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updatePortfolioItem:', error)
      return null
    }
  }

  async deletePortfolioItem(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting portfolio item:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in deletePortfolioItem:', error)
      return false
    }
  }

  // Initialize default data
  async initializeDefaultData(): Promise<boolean> {
    try {
      // Check if profile already exists
      const existingProfile = await this.getProfile()
      if (existingProfile) {
        return true
      }

      // Create default profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          name: 'Alex Chen',
          tagline: 'Full-Stack Developer & Designer'
        })
        .select()
        .single()

      if (profileError) {
        console.error('Error creating default profile:', profileError)
        return false
      }

      // Create default sections
      const sections = [
        {
          profile_id: profile.id,
          title: 'About',
          order_index: 0
        },
        {
          profile_id: profile.id,
          title: 'Experience',
          order_index: 1
        },
        {
          profile_id: profile.id,
          title: 'Projects',
          order_index: 2
        },
        {
          profile_id: profile.id,
          title: 'Skills',
          order_index: 3
        }
      ]

      const { data: createdSections, error: sectionsError } = await supabase
        .from('sections')
        .insert(sections)
        .select()

      if (sectionsError) {
        console.error('Error creating default sections:', sectionsError)
        return false
      }

      // Create default portfolio items
      const defaultItems = [
        {
          section_id: createdSections[0].id,
          title: 'Introduction',
          type: 'info' as const,
          description: 'Full-stack developer passionate about creating intuitive user experiences',
          details: 'I specialize in building scalable web applications that bridge the gap between beautiful design and robust functionality.',
          content: 'Currently based in San Francisco, I work with startups and established companies to bring their digital visions to life.',
          order_index: 0
        },
        {
          section_id: createdSections[1].id,
          title: 'Senior Developer',
          type: 'role' as const,
          year: '2022 - Present',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          description: 'Leading development of customer-facing applications',
          details: 'Built and maintained multiple React applications serving 100k+ users',
          tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
          order_index: 0
        }
      ]

      const { error: itemsError } = await supabase
        .from('portfolio_items')
        .insert(defaultItems)

      if (itemsError) {
        console.error('Error creating default items:', itemsError)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in initializeDefaultData:', error)
      return false
    }
  }
}

export const portfolioService = new SupabasePortfolioService()

export interface PortfolioItem {
  id: string;
  title: string;
  type: 'project' | 'role' | 'skill' | 'info';
  year?: string;
  company?: string;
  location?: string;
  description: string;
  details?: string;
  tech?: string[];
  url?: string;
  content?: string;
}

export interface Section {
  id: string;
  title: string;
  items: PortfolioItem[];
}

export interface PortfolioProfile {
  name: string;
  tagline: string;
  sections: Section[];
}

const defaultPortfolioData: PortfolioProfile = {
  name: 'Alex Chen',
  tagline: 'Full-Stack Developer & Designer',
  sections: [
    {
      id: 'about',
      title: 'About',
      items: [
        {
          id: 'intro',
          title: 'Introduction',
          type: 'info',
          description: 'Full-stack developer passionate about creating intuitive user experiences',
          details: 'I specialize in building scalable web applications that bridge the gap between beautiful design and robust functionality. With a background in both development and design, I bring a unique perspective to every project.',
          content: 'Currently based in San Francisco, I work with startups and established companies to bring their digital visions to life. I believe in writing clean, maintainable code and creating experiences that users genuinely enjoy.'
        },
        {
          id: 'philosophy',
          title: 'Design Philosophy',
          type: 'info',
          description: 'Approaching problems with simplicity and user-centered thinking',
          details: 'I believe the best solutions are often the simplest ones. My approach combines strategic thinking with hands-on execution, always keeping the end user at the center of every decision.',
          content: 'Good design is invisible—it solves problems without creating new ones. I strive to create interfaces that feel natural and content that serves a clear purpose.'
        }
      ]
    },
    {
      id: 'projects',
      title: 'Selected Work',
      items: [
        {
          id: 'task-manager',
          title: 'Collaborative Task Manager',
          type: 'project',
          year: '2024',
          description: 'Real-time collaboration platform for distributed teams',
          details: 'Built a comprehensive task management application that handles real-time updates, team collaboration, and project analytics. The platform supports multiple workspaces and integrates with popular productivity tools.',
          tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io'],
          url: '#'
        },
        {
          id: 'weather-dashboard',
          title: 'Weather Analytics Dashboard',
          type: 'project',
          year: '2024',
          description: 'Interactive weather visualization with predictive analytics',
          details: 'Developed a comprehensive weather dashboard that combines real-time data with historical analysis. Features include interactive maps, trend visualization, and location-based forecasting.',
          tech: ['Vue.js', 'D3.js', 'Python', 'Weather API', 'AWS'],
          url: '#'
        },
        {
          id: 'ecommerce-platform',
          title: 'E-commerce Platform',
          type: 'project',
          year: '2023',
          description: 'Full-stack e-commerce solution with advanced inventory management',
          details: 'Created a complete e-commerce platform from the ground up, including payment processing, inventory management, and customer analytics. The system handles high traffic and complex product configurations.',
          tech: ['Next.js', 'Stripe', 'MongoDB', 'Redis', 'Vercel'],
          url: '#'
        },
        {
          id: 'design-system',
          title: 'Component Design System',
          type: 'project',
          year: '2024',
          description: 'Comprehensive design system for rapid prototyping',
          details: 'Built a complete design system that serves as the foundation for multiple products. Includes component library, design tokens, and extensive documentation.',
          tech: ['Storybook', 'React', 'Tailwind CSS', 'Figma'],
          url: '#'
        }
      ]
    },
    {
      id: 'experience',
      title: 'Experience',
      items: [
        {
          id: 'senior-dev',
          title: 'Senior Frontend Developer',
          type: 'role',
          year: '2023—Present',
          company: 'TechCorp Inc.',
          location: 'Remote',
          description: 'Leading frontend architecture and mentoring development teams',
          details: 'Responsible for architecting scalable frontend solutions and leading a team of 6 developers. Focus on performance optimization, code quality, and establishing development best practices.',
          content: 'Key achievements include reducing bundle size by 40%, implementing automated testing that caught 95% of regressions, and establishing a component library used across 12 products.'
        },
        {
          id: 'fullstack-dev',
          title: 'Full-Stack Developer',
          type: 'role',
          year: '2021—2023',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          description: 'Built core product features and established development processes',
          details: 'Developed the main product from MVP to Series A stage, working across the entire stack. Collaborated closely with design and product teams to ship features that drove user growth.',
          content: 'Helped grow the engineering team from 3 to 15 people while maintaining code quality and shipping velocity. Implemented CI/CD processes that reduced deployment time by 80%.'
        },
        {
          id: 'frontend-dev',
          title: 'Frontend Developer',
          type: 'role',
          year: '2019—2021',
          company: 'DesignStudio',
          location: 'New York, NY',
          description: 'Specialized in translating designs into responsive web applications',
          details: 'Worked with a talented design team to bring complex interfaces to life. Focused on creating pixel-perfect implementations while ensuring excellent performance and accessibility.',
          content: 'Collaborated on projects for Fortune 500 clients, consistently delivering ahead of schedule. Developed internal tools that improved designer-developer handoff efficiency by 60%.'
        }
      ]
    },
    {
      id: 'skills',
      title: 'Capabilities',
      items: [
        {
          id: 'frontend-skills',
          title: 'Frontend Development',
          type: 'skill',
          description: 'Modern JavaScript frameworks and responsive design',
          content: 'React, Vue.js, TypeScript, Next.js, Tailwind CSS, SASS, JavaScript (ES6+), HTML5, CSS3, Responsive Design, Performance Optimization',
          details: 'Specialized in creating performant, accessible user interfaces using modern frameworks and tools. Strong focus on component architecture and design systems.'
        },
        {
          id: 'backend-skills',
          title: 'Backend Development',
          type: 'skill',
          description: 'Server-side technologies and database management',
          content: 'Node.js, Python, PostgreSQL, MongoDB, REST APIs, GraphQL, Docker, AWS, Vercel, Redis',
          details: 'Experience building scalable backend services and APIs. Comfortable with both SQL and NoSQL databases, cloud infrastructure, and containerization.'
        },
        {
          id: 'design-skills',
          title: 'Design & Tools',
          type: 'skill',
          description: 'Design thinking and development workflow optimization',
          content: 'Figma, Adobe Creative Suite, Git, VS Code, Storybook, Jest, Cypress, Webpack, User Experience Design',
          details: 'Strong design sensibilities combined with technical implementation skills. Experienced in design systems, prototyping, and user research methodologies.'
        }
      ]
    },
    {
      id: 'contact',
      title: 'Connect',
      items: [
        {
          id: 'email',
          title: 'Email',
          type: 'info',
          description: 'hello@alexchen.dev',
          content: 'Feel free to reach out for collaboration opportunities or just to say hello.',
          url: 'mailto:hello@alexchen.dev'
        },
        {
          id: 'linkedin',
          title: 'LinkedIn',
          type: 'info',
          description: 'Professional network and career updates',
          content: 'Connect with me on LinkedIn to stay updated on my professional journey.',
          url: 'https://linkedin.com/in/alexchen-dev'
        },
        {
          id: 'github',
          title: 'GitHub',
          type: 'info',
          description: 'Open source contributions and personal projects',
          content: 'Check out my repositories and contributions to the developer community.',
          url: 'https://github.com/alexchen-dev'
        }
      ]
    }
  ]
};

const STORAGE_KEY = 'portfolio-cms-data';

export const portfolioStorage = {
  getData: (): PortfolioProfile => {
    if (typeof window === 'undefined') return defaultPortfolioData;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required properties exist
        return {
          name: parsed.name || defaultPortfolioData.name,
          tagline: parsed.tagline || defaultPortfolioData.tagline,
          sections: parsed.sections || defaultPortfolioData.sections
        };
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
    
    return defaultPortfolioData;
  },

  saveData: (data: PortfolioProfile): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  },

  exportData: (): string => {
    const data = portfolioStorage.getData();
    return JSON.stringify(data, null, 2);
  },

  importData: (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.sections && Array.isArray(data.sections)) {
        portfolioStorage.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing portfolio data:', error);
      return false;
    }
  },

  resetToDefault: (): void => {
    portfolioStorage.saveData(defaultPortfolioData);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
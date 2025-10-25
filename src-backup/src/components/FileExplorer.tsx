import { useState, useEffect } from 'react';
import { FileItem, FileSystemItem } from './FileItem';

// Mock portfolio data
const portfolioData: FileSystemItem[] = [
  {
    id: 'root',
    name: 'portfolio/',
    type: 'folder',
    children: [
      {
        id: 'about',
        name: 'about.txt',
        type: 'file',
        content: 'Full-stack developer passionate about creating intuitive user experiences and robust web applications.',
        description: 'Learn more about my background and interests'
      },
      {
        id: 'projects',
        name: 'projects/',
        type: 'folder',
        children: [
          {
            id: 'web-apps',
            name: 'web-apps/',
            type: 'folder',
            children: [
              {
                id: 'task-manager',
                name: 'task-manager.app',
                type: 'file',
                year: '2024',
                description: 'A collaborative task management application with real-time updates and team features.',
                tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
                url: '#'
              },
              {
                id: 'weather-dashboard',
                name: 'weather-dashboard.app',
                type: 'file',
                year: '2024',
                description: 'Interactive weather dashboard with data visualization and location-based forecasts.',
                tech: ['Vue.js', 'D3.js', 'Weather API'],
                url: '#'
              },
              {
                id: 'ecommerce-platform',
                name: 'ecommerce-platform.app',
                type: 'file',
                year: '2023',
                description: 'Full-stack e-commerce platform with payment integration and inventory management.',
                tech: ['Next.js', 'Stripe', 'MongoDB', 'Vercel'],
                url: '#'
              }
            ]
          },
          {
            id: 'mobile-apps',
            name: 'mobile-apps/',
            type: 'folder',
            children: [
              {
                id: 'fitness-tracker',
                name: 'fitness-tracker.app',
                type: 'file',
                year: '2024',
                description: 'Cross-platform fitness tracking app with workout planning and progress analytics.',
                tech: ['React Native', 'Firebase', 'Chart.js'],
                url: '#'
              },
              {
                id: 'recipe-finder',
                name: 'recipe-finder.app',
                type: 'file',
                year: '2023',
                description: 'Recipe discovery app with ingredient-based search and meal planning features.',
                tech: ['Flutter', 'Dart', 'Recipe API'],
                url: '#'
              }
            ]
          },
          {
            id: 'design-systems',
            name: 'design-systems/',
            type: 'folder',
            children: [
              {
                id: 'component-library',
                name: 'component-library.design',
                type: 'file',
                year: '2024',
                description: 'Comprehensive design system and component library for rapid prototyping.',
                tech: ['Storybook', 'React', 'Tailwind CSS'],
                url: '#'
              },
              {
                id: 'brand-guidelines',
                name: 'brand-guidelines.pdf',
                type: 'file',
                year: '2023',
                description: 'Complete brand identity and visual guidelines for a fintech startup.',
                tech: ['Figma', 'Adobe Creative Suite'],
                url: '#'
              }
            ]
          }
        ]
      },
      {
        id: 'experience',
        name: 'experience/',
        type: 'folder',
        children: [
          {
            id: 'senior-dev',
            name: 'senior-developer.role',
            type: 'file',
            year: '2023-Present',
            description: 'Leading frontend development team, architecting scalable solutions, and mentoring junior developers.',
            content: 'TechCorp Inc. • Remote'
          },
          {
            id: 'fullstack-dev',
            name: 'fullstack-developer.role',
            type: 'file',
            year: '2021-2023',
            description: 'Built and maintained web applications using modern JavaScript frameworks and cloud services.',
            content: 'StartupXYZ • San Francisco, CA'
          },
          {
            id: 'frontend-dev',
            name: 'frontend-developer.role',
            type: 'file',
            year: '2019-2021',
            description: 'Developed responsive user interfaces and collaborated with design teams on user experience.',
            content: 'DesignStudio • New York, NY'
          }
        ]
      },
      {
        id: 'skills',
        name: 'skills/',
        type: 'folder',
        children: [
          {
            id: 'frontend',
            name: 'frontend.txt',
            type: 'file',
            content: 'React, Vue.js, TypeScript, Next.js, Tailwind CSS, SASS, JavaScript (ES6+), HTML5, CSS3'
          },
          {
            id: 'backend',
            name: 'backend.txt',
            type: 'file',
            content: 'Node.js, Python, PostgreSQL, MongoDB, REST APIs, GraphQL, Docker, AWS, Vercel'
          },
          {
            id: 'tools',
            name: 'tools.txt',
            type: 'file',
            content: 'Git, Figma, Adobe Creative Suite, VS Code, Storybook, Jest, Cypress, Webpack'
          }
        ]
      },
      {
        id: 'contact',
        name: 'contact.txt',
        type: 'file',
        content: 'email: hello@portfolio.dev\nlinkedin: /in/portfolio-dev\ngithub: @portfolio-dev',
        description: 'Get in touch for collaboration opportunities'
      }
    ]
  }
];

export function FileExplorer() {
  const [selectedItem, setSelectedItem] = useState<string>('about');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['root']));
  const [flatItems, setFlatItems] = useState<string[]>([]);

  // Flatten the tree structure for keyboard navigation
  useEffect(() => {
    const flattenItems = (items: FileSystemItem[], result: string[] = []): string[] => {
      for (const item of items) {
        result.push(item.id);
        if (item.type === 'folder' && item.children && expandedItems.has(item.id)) {
          flattenItems(item.children, result);
        }
      }
      return result;
    };

    setFlatItems(flattenItems(portfolioData));
  }, [expandedItems]);

  const handleToggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = flatItems.indexOf(selectedItem);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < flatItems.length - 1) {
          setSelectedItem(flatItems[currentIndex + 1]);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          setSelectedItem(flatItems[currentIndex - 1]);
        }
        break;
    }
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto bg-card border border-border rounded-lg overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-3 text-sm text-muted-foreground">~/portfolio</span>
        </div>
      </div>

      {/* File tree */}
      <div className="min-h-[500px] max-h-[70vh] overflow-y-auto">
        {portfolioData.map((item) => (
          <FileItem
            key={item.id}
            item={item}
            level={0}
            isSelected={selectedItem === item.id}
            onSelect={setSelectedItem}
            expandedItems={expandedItems}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-2">
        <p className="text-xs text-muted-foreground">
          Use ↑↓ arrows to navigate • → to expand • ← to collapse • Enter to select
        </p>
      </div>
    </div>
  );
}
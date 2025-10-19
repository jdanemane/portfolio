import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Calendar, MapPin, Maximize2, X } from 'lucide-react';
import { portfolioService, PortfolioProfile } from '../services/portfolioService';
import svgPaths from '../imports/svg-h24saejzqe';
import { motion, AnimatePresence } from 'motion/react';

interface ColumnNavigationProps {
  refreshTrigger?: number;
}

export function ColumnNavigation({ refreshTrigger }: ColumnNavigationProps) {
  const [portfolioData, setPortfolioData] = useState<PortfolioProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const portfolioSections = portfolioData?.sections || [];
  const [selectedSection, setSelectedSection] = useState('about');
  const [selectedItem, setSelectedItem] = useState('intro');
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sectionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const detailsRef = useRef<HTMLElement | null>(null);
  const expandedRef = useRef<HTMLElement | null>(null);
  const announcementRef = useRef<HTMLDivElement | null>(null);

  const currentSection = portfolioSections.find(section => section.id === selectedSection);
  const currentItem = currentSection?.items.find(item => item.id === selectedItem);

  const loadPortfolioData = async () => {
    try {
      setIsLoading(true);
      const data = await portfolioService.getProfile();
      if (data) {
        setPortfolioData(data);
        // Set default selections if they exist
        if (data.sections.length > 0) {
          const firstSection = data.sections[0];
          setSelectedSection(firstSection.id);
          if (firstSection.items.length > 0) {
            setSelectedItem(firstSection.items[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, [refreshTrigger]);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    const section = portfolioSections.find(s => s.id === sectionId);
    if (section && section.items.length > 0) {
      setSelectedItem(section.items[0].id);
      announceChange(`${section.title} section selected. ${section.items.length} items available.`);
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
    const item = currentSection?.items.find(i => i.id === itemId);
    if (item) {
      announceChange(`${item.title} selected. ${item.type === 'project' ? 'Project' : item.type === 'role' ? 'Experience' : 'Information'} details loaded.`);
    }
  };

  const announceChange = (message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
    }
  };

  const getItemIcon = (_type: string) => {
    return (
      <div className="w-4 h-4 relative" aria-hidden="true">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g>
            <path d={svgPaths.p14890d00} stroke="rgba(10,10,10,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p28db2b80} stroke="rgba(10,10,10,0.4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </g>
        </svg>
      </div>
    );
  };

  const handleSectionKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    const sectionIndex = portfolioSections.findIndex(s => s.id === sectionId);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (sectionIndex < portfolioSections.length - 1) {
          const nextSection = portfolioSections[sectionIndex + 1];
          setFocusedSection(nextSection.id);
          sectionRefs.current[nextSection.id]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (sectionIndex > 0) {
          const prevSection = portfolioSections[sectionIndex - 1];
          setFocusedSection(prevSection.id);
          sectionRefs.current[prevSection.id]?.focus();
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (selectedSection === sectionId && currentSection?.items.length) {
          setFocusedItem(selectedItem);
          itemRefs.current[selectedItem]?.focus();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSectionSelect(sectionId);
        break;
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    if (!currentSection) return;
    
    const itemIndex = currentSection.items.findIndex(i => i.id === itemId);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (itemIndex < currentSection.items.length - 1) {
          const nextItem = currentSection.items[itemIndex + 1];
          setFocusedItem(nextItem.id);
          itemRefs.current[nextItem.id]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (itemIndex > 0) {
          const prevItem = currentSection.items[itemIndex - 1];
          setFocusedItem(prevItem.id);
          itemRefs.current[prevItem.id]?.focus();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedSection(selectedSection);
        sectionRefs.current[selectedSection]?.focus();
        break;
      case 'ArrowRight':
        e.preventDefault();
        // If item is not selected, select it (Finder-like behavior)
        if (selectedItem !== itemId) {
          handleItemSelect(itemId);
        } else if (detailsRef.current) {
          // If already selected, move focus to details panel
          detailsRef.current.focus();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleItemSelect(itemId);
        break;
    }
  };

  const handleDetailsKeyDown = (e: React.KeyboardEvent) => {
    if (!currentSection) return;
    
    const itemIndex = currentSection.items.findIndex(i => i.id === selectedItem);
    
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        setIsExpanded(true);
        announceChange('Expanded view opened. Press Escape to close.');
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (itemIndex < currentSection.items.length - 1) {
          const nextItem = currentSection.items[itemIndex + 1];
          handleItemSelect(nextItem.id);
          announceChange(`${nextItem.title} selected. Details updated.`);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (itemIndex > 0) {
          const prevItem = currentSection.items[itemIndex - 1];
          handleItemSelect(prevItem.id);
          announceChange(`${prevItem.title} selected. Details updated.`);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedItem(selectedItem);
        itemRefs.current[selectedItem]?.focus();
        announceChange('Returned to items list.');
        break;
    }
  };

  // Handle expanded view escape key
  const handleExpandedKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      announceChange('Expanded view closed.');
      // Return focus to details panel
      setTimeout(() => {
        detailsRef.current?.focus();
      }, 0);
    } else {
      // Allow same navigation as normal details panel
      handleDetailsKeyDown(e);
    }
  };

  // Refresh data when trigger changes
  useEffect(() => {
    setPortfolioData(portfolioStorage.getData());
  }, [refreshTrigger]);

  // Focus management effects
  useEffect(() => {
    if (focusedSection && sectionRefs.current[focusedSection]) {
      sectionRefs.current[focusedSection]?.focus();
    }
  }, [focusedSection]);

  useEffect(() => {
    if (focusedItem && itemRefs.current[focusedItem]) {
      itemRefs.current[focusedItem]?.focus();
    }
  }, [focusedItem]);

  // Focus expanded view when opened
  useEffect(() => {
    if (isExpanded && expandedRef.current) {
      expandedRef.current.focus();
    }
  }, [isExpanded]);

  // Prevent body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load portfolio data</p>
          <button 
            onClick={loadPortfolioData}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Skip Navigation Links */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      {/* Screen Reader Announcements */}
      <div 
        ref={announcementRef}
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />

      <div className="max-w-[1135px] mx-auto grid grid-cols-12 gap-12 px-10 py-8">
        
        {/* Left Column - Section Navigation */}
        <aside className="col-span-3" role="navigation" aria-label="Portfolio sections">
          <div className="sticky top-8">
            <header className="mb-12">
              <h1 className="mb-2 text-neutral-950">{portfolioData.name}</h1>
              <p className="text-neutral-950/60 leading-6">{portfolioData.tagline}</p>
            </header>
            
            <nav aria-label="Main sections">
              <ul className="space-y-1" role="list">
                {portfolioSections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      ref={(el) => { sectionRefs.current[section.id] = el; }}
                      onClick={() => handleSectionSelect(section.id)}
                      onKeyDown={(e) => handleSectionKeyDown(e, section.id)}
                      onFocus={() => setFocusedSection(section.id)}
                      aria-current={selectedSection === section.id ? 'page' : undefined}
                      aria-describedby={`section-${section.id}-desc`}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
                        selectedSection === section.id 
                          ? 'shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] bg-white/50 text-neutral-950 translate-x-1' 
                          : 'hover:shadow-sm hover:bg-white/30 hover:translate-x-0.5 text-neutral-950/70 focus:bg-white/40'
                      }`}
                    >
                      <span className="font-medium">{section.title}</span>
                      <span id={`section-${section.id}-desc`} className="sr-only">
                        Section {index + 1} of {portfolioSections.length}. 
                        {selectedSection === section.id ? 'Currently selected.' : 'Press Enter to select.'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Middle Column - Items List */}
        <section className="col-span-4" role="region" aria-label="Portfolio items">
          <div className="sticky top-8">
            {currentSection && (
              <>
                <header className="mb-8">
                  <h2 className="mb-2 text-neutral-950" id="items-heading">{currentSection.title}</h2>
                  <p className="text-[rgba(10,10,10,0.5)] text-sm" aria-describedby="items-heading">
                    {currentSection.items.length} {currentSection.items.length === 1 ? 'item' : 'items'}
                  </p>
                </header>
                
                <nav aria-label={`${currentSection.title} items`}>
                  <ul className="space-y-4" role="list">
                    {currentSection.items.map((item, index) => (
                      <li key={item.id}>
                        <button
                          ref={(el) => { itemRefs.current[item.id] = el; }}
                          onClick={() => handleItemSelect(item.id)}
                          onKeyDown={(e) => handleItemKeyDown(e, item.id)}
                          onFocus={() => setFocusedItem(item.id)}
                          aria-current={selectedItem === item.id ? 'true' : undefined}
                          aria-describedby={`item-${item.id}-desc`}
                          className={`w-full text-left p-5 rounded-[10px] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
                            selectedItem === item.id 
                              ? 'shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.7)] scale-[1.01] translate-y-[-2px]' 
                              : 'shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.4)] hover:shadow-md hover:bg-[rgba(255,255,255,0.6)] hover:translate-y-[-1px] focus:bg-[rgba(255,255,255,0.6)]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getItemIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm mb-1 text-neutral-950 leading-5">{item.title}</h3>
                              <p className="text-xs text-[rgba(10,10,10,0.6)] leading-4">{item.description}</p>
                              {(item.year || item.company) && (
                                <div className="flex items-center gap-2 text-xs text-[rgba(10,10,10,0.5)] mt-2">
                                  {item.year && <span>{item.year}</span>}
                                  {item.company && (
                                    <>
                                      <span>•</span>
                                      <span>{item.company}</span>
                                    </>
                                  )}
                                </div>
                              )}
                              <span id={`item-${item.id}-desc`} className="sr-only">
                                {item.type === 'project' ? 'Project' : item.type === 'role' ? 'Work experience' : 'Information'} item {index + 1} of {currentSection.items.length}. 
                                {selectedItem === item.id ? 'Currently selected.' : 'Press Enter to view details.'}
                              </span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}
          </div>
        </section>

        {/* Right Column - Item Details */}
        <main className="col-span-5" id="main-content" role="main" aria-label="Portfolio details">
          {currentItem && (
            <motion.article 
              ref={detailsRef}
              layout
              layoutId="detail-panel"
              className={isExpanded 
                ? "fixed inset-8 z-50 w-auto max-w-4xl mx-auto max-h-[90vh] overflow-y-auto space-y-8 p-8 rounded-[10px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_10px_10px_-5px_rgba(0,0,0,0.04)] bg-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                : "space-y-8 p-6 rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              }
              tabIndex={-1}
              aria-labelledby="detail-title"
              aria-describedby="detail-description"
              onKeyDown={isExpanded ? handleExpandedKeyDown : handleDetailsKeyDown}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className={`pb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[rgba(10,10,10,0.1)] after:to-transparent ${isExpanded ? 'pr-12' : ''}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 id="detail-title" className="text-neutral-950">{currentItem.title}</h1>
                  {isExpanded ? (
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        announceChange('Expanded view closed.');
                      }}
                      className="flex-shrink-0 p-2 rounded-md text-[rgba(10,10,10,0.6)] hover:text-neutral-950 hover:bg-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label="Close expanded view"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsExpanded(true);
                        announceChange('Expanded view opened. Press Escape to close.');
                      }}
                      className="flex-shrink-0 p-2 rounded-md text-[rgba(10,10,10,0.6)] hover:text-neutral-950 hover:bg-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      aria-label="Expand details view"
                      title="Expand view"
                    >
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
                
                {(currentItem.year || currentItem.company || currentItem.location) && (
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[rgba(10,10,10,0.6)] mb-4" role="list">
                    {currentItem.year && (
                      <div className="flex items-center gap-1" role="listitem">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span>
                          <span className="sr-only">Year: </span>
                          {currentItem.year}
                        </span>
                      </div>
                    )}
                    {currentItem.company && (
                      <div className="flex items-center gap-1" role="listitem">
                        <span>
                          <span className="sr-only">Company: </span>
                          {currentItem.company}
                        </span>
                      </div>
                    )}
                    {currentItem.location && (
                      <div className="flex items-center gap-1" role="listitem">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>
                          <span className="sr-only">Location: </span>
                          {currentItem.location}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <p id="detail-description" className="text-[rgba(10,10,10,0.7)] leading-[1.625]">{currentItem.description}</p>
              </header>

              {currentItem.details && (
                <section aria-labelledby="details-heading">
                  <h2 id="details-heading" className="sr-only">Additional Details</h2>
                  <p className="leading-[1.625] text-[rgba(10,10,10,0.8)]">{currentItem.details}</p>
                </section>
              )}

              {currentItem.content && (
                <section aria-labelledby="content-heading">
                  <h2 id="content-heading" className="sr-only">Content</h2>
                  <p className="leading-[1.625] text-[rgba(10,10,10,0.8)]">{currentItem.content}</p>
                </section>
              )}

              {currentItem.tech && currentItem.tech.length > 0 && (
                <section aria-labelledby="tech-heading">
                  <h3 id="tech-heading" className="mb-4 text-neutral-950">Technologies</h3>
                  <ul className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {currentItem.tech.map((tech) => (
                      <li key={tech} role="listitem">
                        <span className="px-3 py-1 rounded-full text-sm text-[rgba(10,10,10,0.6)] shadow-sm bg-white/50">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {currentItem.url && (
                <section aria-labelledby="link-heading">
                  <h3 id="link-heading" className="sr-only">External Link</h3>
                  <a
                    href={currentItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[rgba(10,10,10,0.8)] hover:text-neutral-950 transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                    aria-describedby="link-description"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    {currentItem.type === 'project' ? 'View Project' : 'Visit Link'}
                    <span id="link-description" className="sr-only">
                      Opens in new tab
                    </span>
                  </a>
                </section>
              )}
            </motion.article>
          )}
        </main>
      </div>

      {/* Backdrop for Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setIsExpanded(false);
              announceChange('Expanded view closed.');
            }}
            role="dialog"
            aria-modal="true"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
import { ChevronRight, ChevronDown, File, Image, ExternalLink } from 'lucide-react';

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'image' | 'link';
  children?: FileSystemItem[];
  content?: string;
  url?: string;
  description?: string;
  tech?: string[];
  year?: string;
}

interface FileItemProps {
  item: FileSystemItem;
  level: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  expandedItems: Set<string>;
  onToggleExpand: (id: string) => void;
}

export function FileItem({ 
  item, 
  level, 
  isSelected, 
  onSelect, 
  expandedItems, 
  onToggleExpand 
}: FileItemProps) {
  const isExpanded = expandedItems.has(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const indent = level * 20;

  const getIcon = () => {
    switch (item.type) {
      case 'folder':
        return hasChildren && isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />;
      case 'file':
        return <File className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'link':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const handleClick = () => {
    onSelect(item.id);
    if (item.type === 'folder' && hasChildren) {
      onToggleExpand(item.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    } else if (e.key === 'ArrowRight' && item.type === 'folder' && hasChildren && !isExpanded) {
      e.preventDefault();
      onToggleExpand(item.id);
    } else if (e.key === 'ArrowLeft' && item.type === 'folder' && hasChildren && isExpanded) {
      e.preventDefault();
      onToggleExpand(item.id);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-muted/50 transition-colors duration-150 ease-in-out ${
          isSelected ? 'bg-accent' : ''
        }`}
        style={{ paddingLeft: `${8 + indent}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={item.type === 'folder' ? isExpanded : undefined}
      >
        <span className="mr-2 text-muted-foreground flex-shrink-0">
          {getIcon()}
        </span>
        <span className="text-sm truncate">
          {item.name}
        </span>
        {item.year && (
          <span className="ml-auto text-xs text-muted-foreground">
            {item.year}
          </span>
        )}
      </div>

      {/* Expanded content for folders */}
      {item.type === 'folder' && hasChildren && isExpanded && (
        <div>
          {item.children?.map((child) => (
            <FileItem
              key={child.id}
              item={child}
              level={level + 1}
              isSelected={isSelected}
              onSelect={onSelect}
              expandedItems={expandedItems}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}

      {/* Inline details for non-folder items when selected */}
      {item.type !== 'folder' && isSelected && (
        <div 
          className="bg-muted/30 border-l-2 border-border ml-4 pl-4 py-3"
          style={{ marginLeft: `${24 + indent}px` }}
        >
          {item.description && (
            <p className="text-sm text-muted-foreground mb-2">
              {item.description}
            </p>
          )}
          
          {item.tech && item.tech.length > 0 && (
            <div className="mb-2">
              <span className="text-xs text-muted-foreground">Tech: </span>
              <span className="text-xs">
                {item.tech.join(', ')}
              </span>
            </div>
          )}

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              View Project
            </a>
          )}

          {item.content && (
            <div className="mt-2 text-xs text-muted-foreground">
              {item.content}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
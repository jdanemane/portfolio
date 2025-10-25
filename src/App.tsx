import { useState, useEffect } from 'react';
import { ColumnNavigation } from './components/ColumnNavigation';
import { ContentManager } from './components/ContentManager';
import { Button } from './components/ui/button';
import { Settings, Eye, Loader2 } from 'lucide-react';
import { portfolioService } from './services/portfolioService';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await portfolioService.initializeDefaultData();
      } catch (error) {
        console.error('Failed to initialize data:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeData();
  }, []);

  const handleDataUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Initializing portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white border-[rgba(0,0,0,0.1)]"
        >
          {isAdminMode ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              View Portfolio
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Edit Content
            </>
          )}
        </Button>
      </div>

      {/* Content */}
      {isAdminMode ? (
        <ContentManager onDataUpdate={handleDataUpdate} />
      ) : (
        <ColumnNavigation refreshTrigger={refreshTrigger} />
      )}
    </div>
  );
}
import { useState } from 'react';
import { ColumnNavigation } from './components/ColumnNavigation';
import { ContentManager } from './components/ContentManager';
import { Button } from './components/ui/button';
import { Settings, Eye } from 'lucide-react';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

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
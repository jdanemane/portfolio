import { useState, useEffect } from 'react';
import { ColumnNavigation } from './components/ColumnNavigation';
import { Loader2 } from 'lucide-react';
import { portfolioService } from './services/portfolioService';

export default function App() {
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
      <ColumnNavigation />
    </div>
  );
}
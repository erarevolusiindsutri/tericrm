import { ThreeScene } from './components/Globe';
import LiveAI from './components/LiveAI';
import AILocations from './components/AILocations';
import LeadSummary from './components/LeadSummary';
import { createContext, useRef } from 'react';

// Create a context for the globe focus
export const GlobeFocusContext = createContext<React.MutableRefObject<[number, number]> | null>(null);

export default function App() {
  const globeFocusRef = useRef<[number, number]>([0, 0]);

  return (
    <GlobeFocusContext.Provider value={globeFocusRef}>
      <div className="h-screen bg-black text-white flex flex-col overflow-hidden relative font-mono">
        <main className="flex-1 relative">
          {/* Globe container */}
          <div className="absolute inset-0 z-0">
            <ThreeScene />
          </div>

          {/* Lead Summary */}
          <LeadSummary />

          {/* AI Locations */}
          <div className="relative z-20">
            <AILocations />
          </div>

          {/* Live AI */}
          <div className="relative z-20">
            <LiveAI />
          </div>
        </main>
      </div>
    </GlobeFocusContext.Provider>
  );
}
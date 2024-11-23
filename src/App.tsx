import { ThreeScene } from './components/Globe';
import LiveAI from './components/LiveAI';
import AILocations from './components/AILocations';
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

          {/* Floating UI container */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="max-w-[1200px] w-full mx-auto px-4">
              {/* Customer Message */}
              <div className="absolute top-8 right-8 pointer-events-auto">
                <div className="text-right">
                  <p className="text-sm font-light opacity-80">Most customer need</p>
                  <p className="text-sm font-light opacity-80">help with jhony</p>
                </div>
              </div>
            </div>
          </div>

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
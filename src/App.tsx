import { ThreeScene } from './components/Globe';
import Stats from './components/Stats';
import CustomerBehavior from './components/CustomerBehavior';
import PageViews from './components/PageViews';

function App() {
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden relative">
      <main className="flex-1 relative">
        {/* Globe container */}
        <ThreeScene />

        {/* Floating UI container */}
        <div className="absolute bottom-2 w-full px-4 z-10">
          <div className="max-w-[1000px] mx-auto space-y-2">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              <Stats />
            </div>
            
            {/* Charts row */}
            <div className="grid grid-cols-2 gap-2">
              <PageViews />
              <CustomerBehavior />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-0.5 left-4 z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
              <span className="text-[9px] text-gray-400">Visitor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-purple-500"></div>
              <span className="text-[9px] text-gray-400">Order</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
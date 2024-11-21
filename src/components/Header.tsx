import { Search, Maximize2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Live view</h1>
          <span className="text-xs text-gray-400">Nov 27, 2023 at 3:45 am EST</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search"
              className="w-[240px] bg-gray-900 border border-gray-800 rounded-md py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>
          <button className="p-1.5 hover:bg-gray-800 rounded-md transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
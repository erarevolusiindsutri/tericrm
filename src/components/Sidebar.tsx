import { Users, Building2, BarChart3, Settings, Mail } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-gray-900 flex flex-col items-center py-8 space-y-8">
      <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
        <Building2 className="w-8 h-8 text-white" />
      </div>
      
      <nav className="flex-1 flex flex-col items-center space-y-6">
        <button className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <Users className="w-6 h-6" />
        </button>
        <button className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <BarChart3 className="w-6 h-6" />
        </button>
        <button className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <Mail className="w-6 h-6" />
        </button>
      </nav>

      <button className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}
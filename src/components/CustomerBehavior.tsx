import { Card, CardContent, CardHeader } from "./ui/card"

export default function CustomerBehavior() {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10">
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[9px] font-medium text-gray-300">Customer behavior</h3>
          <span className="text-[8px] text-gray-400 px-1 py-0.5 bg-black/40 rounded">10 min</span>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="flex justify-between items-center px-2">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border border-white/20 mb-1"></div>
            <span className="text-xs font-bold">155</span>
            <span className="text-[8px] text-gray-400">Active carts</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border border-white/20 mb-1"></div>
            <span className="text-xs font-bold">85</span>
            <span className="text-[8px] text-gray-400">Checking out</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border border-cyan-500 mb-1"></div>
            <span className="text-xs font-bold">22</span>
            <span className="text-[8px] text-gray-400">Purchased</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
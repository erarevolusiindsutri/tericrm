import { Card, CardContent, CardHeader } from "./ui/card"

export default function PageViews() {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10">
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[9px] font-medium text-gray-300">Page views</h3>
          <span className="text-[8px] text-gray-400 px-1 py-0.5 bg-black/40 rounded">10 min</span>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="h-[40px] flex items-end gap-0.5">
          {[40, 60, 45, 70, 65, 55, 45, 60, 40].map((height, i) => (
            <div key={i} className="flex-1">
              <div 
                className="bg-white/20 rounded-sm transition-all duration-300 hover:bg-white/30"
                style={{ height: `${height}%` }}
              ></div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-gray-400">10 min ago</span>
          <span className="text-[8px] text-gray-400">Now</span>
        </div>
      </CardContent>
    </Card>
  );
}
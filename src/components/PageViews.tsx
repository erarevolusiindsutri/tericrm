import { Card, CardContent, CardHeader } from "./ui/card"
import { motion } from 'framer-motion';

export default function PageViews() {
  const data = [40, 45, 50, 55, 65, 70, 75, 85, 90];

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors h-full">
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[9px] font-light text-gray-300">Customer Growth</h3>
          <span className="text-[8px] font-light text-gray-400 px-1 py-0.5 bg-black/40 rounded">Last 30 days</span>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="h-[80px] flex items-end gap-0.5">
          {data.map((height, i) => (
            <motion.div 
              key={i} 
              className="flex-1"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div 
                className="bg-white/20 rounded-sm transition-all duration-300 hover:bg-white/30 h-full"
              ></div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-[8px] font-light text-gray-400">30 days ago</span>
          <span className="text-[8px] font-light text-gray-400">Today</span>
        </div>
      </CardContent>
    </Card>
  );
}
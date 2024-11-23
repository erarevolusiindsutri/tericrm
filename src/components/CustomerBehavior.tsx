import { Card, CardContent, CardHeader } from "./ui/card"
import { Users, UserCheck, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

export default function CustomerBehavior() {
  const stats = [
    {
      icon: Users,
      value: "1,255",
      label: "Active Users",
      color: "text-gray-400"
    },
    {
      icon: UserCheck,
      value: "845",
      label: "Retained",
      color: "text-purple-500"
    },
    {
      icon: UserPlus,
      value: "122",
      label: "New Today",
      color: "text-cyan-500"
    }
  ];

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors">
      <CardHeader className="p-2 pb-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[9px] font-light text-gray-300">Customer Status</h3>
          <span className="text-[8px] font-light text-gray-400 px-1 py-0.5 bg-black/40 rounded">Real-time</span>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex justify-between items-center px-2"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={item}
                className="flex flex-col items-center"
              >
                <div className={`w-6 h-6 rounded-full border border-white/20 mb-1 flex items-center justify-center ${index === 2 ? 'border-cyan-500' : ''}`}>
                  <Icon className={`w-3 h-3 ${stat.color}`} />
                </div>
                <span className="text-xs font-mono font-bold">{stat.value}</span>
                <span className="text-[8px] font-light text-gray-400">{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from "./ui/card"
import { Users, Target, DollarSign, Star } from 'lucide-react';
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Stats() {
  const stats = [
    {
      label: "Total Customers",
      value: "24,781",
      icon: Users
    },
    {
      label: "Lead Conversion",
      value: "68.5%",
      icon: Target
    },
    {
      label: "Revenue MRR",
      value: "$148,229",
      icon: DollarSign
    },
    {
      label: "Avg. Satisfaction",
      value: "4.8/5",
      icon: Star
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-4 gap-2 w-full"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={index} variants={item}>
            <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-2 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/5">
                  <Icon className="w-3 h-3 text-white/70" />
                </div>
                <div>
                  <p className="text-[9px] font-light text-gray-400">{stat.label}</p>
                  <p className="text-sm font-mono text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
import { Card, CardContent } from "./ui/card"
import { Users, ShoppingCart, DollarSign, Store } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      label: "Visitors right now",
      value: "781",
      icon: Users
    },
    {
      label: "Total sessions",
      value: "46,268",
      icon: Store
    },
    {
      label: "Total sales",
      value: "$148,229",
      icon: DollarSign
    },
    {
      label: "Total orders",
      value: "1,912",
      icon: ShoppingCart
    }
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-2 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/5">
                <Icon className="w-3 h-3 text-white/70" />
              </div>
              <div>
                <p className="text-[9px] font-medium text-gray-400">{stat.label}</p>
                <p className="text-sm font-bold text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
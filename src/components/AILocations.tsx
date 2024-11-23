import { Card, CardContent } from "./ui/card"
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { locationToAngles } from './Globe';

export default function AILocations() {
  const locations = [
    { city: "Jakarta", country: "Indonesia", count: 124, coords: [-6.2088, 106.8456] },
    { city: "Surabaya", country: "Indonesia", count: 86, coords: [-7.2575, 112.7521] },
    { city: "Bandung", country: "Indonesia", count: 52, coords: [-6.9175, 107.6191] },
    { city: "Makassar", country: "Indonesia", count: 28, coords: [-5.1477, 119.4327] },
    { city: "Padang", country: "Indonesia", count: 12, coords: [-0.9433, 100.3714] }
  ];

  const handleLocationClick = (lat: number, long: number) => {
    if ((window as any).globeFocusRef) {
      (window as any).globeFocusRef.current = locationToAngles(lat, long);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-8 left-0 flex items-center gap-2"
        >
          <span className="text-lg font-light text-white/50">{locations.length}</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white/50" />
            <span className="text-[10px] font-light text-white/50 uppercase tracking-wider">AI Location</span>
          </div>
        </motion.div>

        <div className="flex gap-2">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-black/60 transition-all duration-300">
                <CardContent className="p-3">
                  <motion.button
                    className="group relative flex items-center gap-2 h-[60px] px-2"
                    onClick={() => handleLocationClick(location.coords[0], location.coords[1])}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400/80 animate-pulse shadow-lg shadow-cyan-400/20" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-light text-white/90 group-hover:text-white transition-colors">
                        {location.city}
                      </span>
                      <span className="text-[10px] font-light text-white/40">
                        {location.count} active
                      </span>
                    </div>
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
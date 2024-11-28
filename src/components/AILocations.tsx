import { Card, CardContent } from "./ui/card"
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { locationToAngles } from './Globe';
import { useState, useEffect } from 'react';

export default function AILocations() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      className={`fixed ${isMobile ? 'bottom-32 right-4' : 'bottom-8 right-8'} z-40`}
    >
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-6 right-0 flex items-center gap-2"
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-white/50" />
            <span className="text-[9px] font-light text-white/50 uppercase tracking-wider">AI Location</span>
          </div>
          <span className="text-xs font-light text-white/50">{locations.length}</span>
        </motion.div>

        <div className={`flex gap-1 ${isMobile ? 'flex-wrap justify-end' : ''}`}>
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={isMobile ? 'w-[70px]' : ''}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-black/60 transition-all duration-300">
                <CardContent className="p-1">
                  <motion.button
                    className="group relative flex flex-col items-center justify-center w-full h-[36px]"
                    onClick={() => handleLocationClick(location.coords[0], location.coords[1])}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-cyan-400/80 animate-pulse shadow-lg shadow-cyan-400/20" />
                      <span className="text-[9px] font-light text-white/90 group-hover:text-white transition-colors">
                        {location.city}
                      </span>
                    </div>
                    <span className="text-[8px] font-light text-white/40 mt-0.5">
                      {location.count} active
                    </span>
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
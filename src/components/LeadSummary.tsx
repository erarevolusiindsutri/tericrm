import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { SmilePlus, DollarSign, Car, Calendar, TrendingUp, Maximize2, X, PieChart, BarChart3, Clock, MessageSquare } from 'lucide-react';
import LeadFullscreen from './LeadFullscreen';

interface Lead {
  id: string;
  customer: string;
  status: 'interested' | 'uninterested' | 'abandoned';
  time: string;
  satisfaction: number;
  topic: 'pricing' | 'vehicle' | 'schedule';
  progress: number;
}

export default function LeadSummary() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const summaryText = "We processed 45 leads today. 30 showed interest, mostly asking about new car promotions and test drives. 10 weren't interested, citing budget concerns or no immediate plans. 5 didn't respond.";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= summaryText.length) {
          setDisplayText(summaryText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const leads: Lead[] = [
    {
      id: '1',
      customer: 'John Smith',
      status: 'interested',
      time: '2h ago',
      satisfaction: 84,
      topic: 'pricing',
      progress: 84
    },
    {
      id: '2',
      customer: 'Sarah Johnson',
      status: 'interested',
      time: '4h ago',
      satisfaction: 92,
      topic: 'vehicle',
      progress: 76
    },
    {
      id: '3',
      customer: 'Mike Williams',
      status: 'abandoned',
      time: '30m ago',
      satisfaction: 45,
      topic: 'schedule',
      progress: 32
    },
    {
      id: '4',
      customer: 'Emma Davis',
      status: 'interested',
      time: '1h ago',
      satisfaction: 88,
      topic: 'vehicle',
      progress: 90
    },
    {
      id: '5',
      customer: 'Alex Turner',
      status: 'uninterested',
      time: '3h ago',
      satisfaction: 23,
      topic: 'pricing',
      progress: 15
    },
    {
      id: '6',
      customer: 'Linda Chen',
      status: 'interested',
      time: '5h ago',
      satisfaction: 95,
      topic: 'schedule',
      progress: 88
    },
    {
      id: '7',
      customer: 'David Park',
      status: 'abandoned',
      time: '1h ago',
      satisfaction: 40,
      topic: 'vehicle',
      progress: 28
    }
  ];

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'interested':
        return 'bg-green-500/20 text-green-300';
      case 'uninterested':
        return 'bg-red-500/20 text-red-300';
      case 'abandoned':
        return 'bg-yellow-500/20 text-yellow-300';
    }
  };

  const getTopicIcon = (topic: Lead['topic']) => {
    switch (topic) {
      case 'pricing':
        return <DollarSign className="w-3 h-3" />;
      case 'vehicle':
        return <Car className="w-3 h-3" />;
      case 'schedule':
        return <Calendar className="w-3 h-3" />;
    }
  };

  const getTopicText = (topic: Lead['topic']) => {
    switch (topic) {
      case 'pricing':
        return 'Price Discussion';
      case 'vehicle':
        return 'Vehicle Features';
      case 'schedule':
        return 'Test Drive';
    }
  };

  return (
    <>
      <div 
        className={`fixed ${isMobile ? 'top-4 right-4' : 'top-8 right-8'} z-50 flex items-start gap-2`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="flex items-center absolute right-0"
          animate={{ 
            opacity: isHovered ? 0 : 1,
            x: isHovered ? 20 : 0,
            zIndex: isHovered ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <p 
            style={{ maxWidth: '280px', minWidth: '280px' }}
            className="text-[11px] font-light text-white/70 text-right leading-relaxed"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-3 bg-white/70 ml-0.5 align-middle"
            />
          </p>
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden relative z-10"
              style={{ maxHeight: isMobile ? 'calc(100vh - 250px)' : '70vh' }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                <CardContent className="p-3 w-[320px]">
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto hide-scrollbar pr-1">
                    {leads.map((lead, index) => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 rounded-xl p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </span>
                            <span className="text-[10px] text-white/30">{lead.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <SmilePlus className="w-3 h-3 text-white/50" />
                            <span className="text-[10px] text-white/70">{lead.satisfaction}%</span>
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          </div>
                        </div>

                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${lead.progress}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`h-full rounded-full ${
                              lead.progress > 70 ? 'bg-green-500' : 
                              lead.progress > 40 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="p-1 rounded bg-white/10">
                              {getTopicIcon(lead.topic)}
                            </div>
                            <span className="text-[10px] text-white/70">{getTopicText(lead.topic)}</span>
                          </div>
                          <span className="text-[10px] text-white/50">{lead.customer}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <LeadFullscreen onClose={() => setIsFullscreen(false)} leads={leads} />
        )}
      </AnimatePresence>
    </>
  );
}
import { motion } from 'framer-motion';
import { X, MessageSquare, Clock, BarChart3, PieChart, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface Lead {
  id: string;
  customer: string;
  status: 'interested' | 'uninterested' | 'abandoned';
  time: string;
  satisfaction: number;
  topic: 'pricing' | 'vehicle' | 'schedule';
  progress: number;
}

interface Props {
  onClose: () => void;
  leads: Lead[];
}

export default function LeadFullscreen({ onClose, leads }: Props) {
  const stats = [
    {
      label: 'Total Conversations',
      value: '45',
      icon: MessageSquare,
      change: '+12%'
    },
    {
      label: 'Avg. Response Time',
      value: '50s',
      icon: Clock,
      change: '-8%'
    },
    {
      label: 'Conversion Rate',
      value: '67%',
      icon: BarChart3,
      change: '+5%'
    },
    {
      label: 'Customer Satisfaction',
      value: '4.8',
      icon: PieChart,
      change: '+2%'
    }
  ];

  const mockConversation = [
    { sender: 'customer', message: "Hi, I'm interested in the new Model X", time: '14:30' },
    { sender: 'ai', message: "Hello! I'd be happy to help you with information about the Model X. What specific aspects would you like to know about?", time: '14:30' },
    { sender: 'customer', message: "What's the price range and available financing options?", time: '14:31' },
    { sender: 'ai', message: "The Model X starts at $89,990. We offer various financing options with rates as low as 2.99% APR. Would you like me to break down the payment plans?", time: '14:31' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full h-full bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/10 backdrop-blur-sm bg-black/40">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light">Lead Analytics Dashboard</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-full pt-16 p-6 overflow-y-auto hide-scrollbar">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/50">{stat.label}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-light">{stat.value}</span>
                          <span className={`text-xs ${
                            stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                          }`}>{stat.change}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Conversation List */}
            <div className="col-span-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{lead.customer}</span>
                      <span className="text-xs text-white/50">{lead.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        lead.status === 'interested' ? 'bg-green-500/20 text-green-300' :
                        lead.status === 'uninterested' ? 'bg-red-500/20 text-red-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                      <ArrowRight className="w-3 h-3 text-white/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation View */}
            <div className="col-span-2 bg-white/5 rounded-lg p-4">
              <div className="mb-4 pb-4 border-b border-white/10">
                <h3 className="text-lg mb-1">Conversation with John Smith</h3>
                <p className="text-sm text-white/50">Started 2 hours ago • 84% Satisfaction Rate</p>
              </div>

              <div className="space-y-4">
                {mockConversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'customer' ? 'bg-white/10' : 'bg-blue-500/20'
                    }`}>
                      <p className="text-sm mb-1">{msg.message}</p>
                      <span className="text-xs text-white/30">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
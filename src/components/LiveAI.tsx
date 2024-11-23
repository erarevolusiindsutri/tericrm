import { Card, CardContent } from "./ui/card"
import { UserCircle2 } from 'lucide-react';
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ChatInterface from './ChatInterface';

export default function LiveAI() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const activeAI = 302;
  const activeChats = [
    {
      id: 3,
      type: "Customer Service",
      message: "Can you analyze this market trend?",
      aiResponse: null,
      time: "just now",
      status: "waiting"
    },
    {
      id: 2,
      type: "Sales",
      message: "What's the best pricing strategy for my product?",
      aiResponse: null,
      time: "1m ago",
      status: "typing"
    },
    {
      id: 1,
      type: "Customer Service",
      message: "How can I improve customer retention?",
      aiResponse: "Based on your data, implementing a loyalty program could increase retention by 24%",
      time: "2m ago",
      status: "completed"
    }
  ];

  const TypingIndicator = () => (
    <div className="flex gap-0.5 items-center h-1.5">
      <motion.div
        className="w-0.5 h-0.5 bg-white/50 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="w-0.5 h-0.5 bg-white/50 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }}
      />
      <motion.div
        className="w-0.5 h-0.5 bg-white/50 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }}
      />
    </div>
  );

  const handleClose = () => {
    setSelectedChat(null);
    setIsHovered(false);
  };

  const listVariants = {
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    collapsed: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-8 flex items-end gap-4 z-50">
      <motion.div
        onHoverStart={() => !selectedChat && setIsHovered(true)}
        onHoverEnd={() => !selectedChat && setIsHovered(false)}
        initial={false}
        animate={{ 
          width: selectedChat ? '25vw' : (isHovered ? '30vw' : '300px'),
          height: isHovered || selectedChat ? '50vh' : '100px'
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 1,
          duration: 0.5
        }}
        className="origin-bottom-left"
      >
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-full overflow-hidden rounded-xl">
          <CardContent className="p-3 relative h-full flex flex-col">
            <motion.div 
              animate={{ 
                scale: isHovered || selectedChat ? 1 : 0.95,
                opacity: isHovered || selectedChat ? 1 : 0.9
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="flex items-baseline gap-3 justify-between"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-white">{activeAI}</span>
                <span className="text-xs font-light text-white/50 uppercase tracking-wider">active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
                <span className="text-xs font-light text-white/50 uppercase tracking-wider whitespace-nowrap">Real-time</span>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {isHovered || selectedChat ? (
                <motion.div
                  key="expanded"
                  variants={listVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="flex-1 overflow-y-auto hide-scrollbar mt-3 space-y-1"
                >
                  {activeChats.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      variants={itemVariants}
                      custom={index}
                    >
                      <div 
                        className={`py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                          selectedChat === chat.id ? 'bg-white/10' : ''
                        }`}
                        onClick={() => setSelectedChat(chat.id)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <UserCircle2 className="w-3.5 h-3.5 text-white/50" />
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                            chat.type === "Sales" ? "bg-blue-500/20 text-blue-200" : "bg-green-500/20 text-green-200"
                          }`}>
                            {chat.type}
                          </span>
                          <span className="text-[9px] font-light text-white/30 ml-auto">{chat.time}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-start">
                            <p className="text-[11px] leading-relaxed font-light text-white/60 bg-white/5 rounded-lg px-2 py-1 max-w-[85%]">
                              {chat.message}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-white/10 rounded-lg px-2 py-1 max-w-[85%]">
                              {chat.status === 'completed' && (
                                <p className="text-[11px] leading-relaxed font-light text-white/40">
                                  {chat.aiResponse}
                                </p>
                              )}
                              {chat.status === 'typing' && (
                                <div className="h-2 flex items-center">
                                  <TypingIndicator />
                                </div>
                              )}
                              {chat.status === 'waiting' && (
                                <p className="text-[9px] italic text-white/20">Waiting for response...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < activeChats.length - 1 && (
                        <Separator className="my-1 bg-white/5" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  className="mt-2"
                >
                  <div className="relative h-8 overflow-hidden">
                    {activeChats.slice(0, 2).map((chat, index) => (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ 
                          opacity: 1 - (index * 0.4), 
                          y: 0 
                        }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="absolute w-full"
                        style={{ top: index * 12 }}
                      >
                        <div className="text-[11px] font-light text-white/40 truncate">
                          {chat.message}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedChat && (
          <ChatInterface 
            chat={activeChats.find(chat => chat.id === selectedChat)!}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
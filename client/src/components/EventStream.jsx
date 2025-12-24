import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import { getSeverityColor, getCategoryIcon } from '../utils/helpers.jsx';

const EventStream = ({ events }) => {
    return (
        <div className="lg:col-span-2 bg-chaos-card border border-gray-800 rounded-lg overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
            <div className="p-4 border-b border-gray-800 bg-black/20 flex justify-between items-center">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-neon-green" />
                    LIVE_EVENT_STREAM
                </h2>
                <span className="text-xs text-gray-500 font-mono">
                    {events.length} EVENTS LOGGED
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`bg-black/40 border-l-4 p-3 rounded hover:bg-black/60 transition-colors group ${getSeverityColor(event.severity).split(' ')[1]}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${getSeverityColor(event.severity).split(' ')[0]}`}>
                                    {getCategoryIcon(event.category)}
                                    {event.category}
                                </span>
                                <span className="text-xs font-mono text-gray-600">
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="text-gray-200 font-medium mb-2">
                                {event.raw_content}
                            </div>
                            <div className="flex gap-2">
                                {event.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] uppercase font-mono text-gray-600 group-hover:text-gray-500 transition-colors">
                                        //{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {events.length === 0 && (
                    <div className="text-center text-gray-600 mt-20 font-mono text-sm">
                        SYSTEM_IDLE. WAITING_FOR_INPUT...
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventStream;

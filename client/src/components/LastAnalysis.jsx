import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSeverityColor } from '../utils/helpers.jsx';

const LastAnalysis = ({ analysis }) => {
    if (!analysis) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-chaos-card border border-gray-800 rounded-lg p-4"
            >
                <h3 className="text-xs font-mono text-gray-500 mb-3">
                    LATEST_ANALYSIS_RESULT
                </h3>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <div className="text-xs text-gray-500">CATEGORY</div>
                        <div className="text-xl text-white font-bold">
                            {analysis.category}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-500">SEVERITY</div>
                        <div className={`text-xl font-bold ${getSeverityColor(analysis.severity).split(' ')[0]}`}>
                            {analysis.severity}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {analysis.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                            #{tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LastAnalysis;

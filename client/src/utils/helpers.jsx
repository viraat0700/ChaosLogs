import React from 'react';
import { Zap, Truck, Server, Shield, Activity } from 'lucide-react';

export const getSeverityColor = (severity) => {
    if (severity === 'Critical') return 'text-neon-red border-neon-red';
    if (severity === 'Medium') return 'text-neon-amber border-neon-amber';
    return 'text-neon-green border-neon-green';
};

export const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
        case 'maintenance':
            return <Zap className="w-4 h-4" />;
        case 'logistics':
            return <Truck className="w-4 h-4" />;
        case 'network':
            return <Server className="w-4 h-4" />;
        case 'security':
            return <Shield className="w-4 h-4" />;
        default:
            return <Activity className="w-4 h-4" />;
    }
};

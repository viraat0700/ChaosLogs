import React from 'react';
import { Terminal } from 'lucide-react';

const Header = () => {
    return (
        <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tighter flex items-center gap-3">
                    <Terminal className="text-neon-blue" />
                    CHAOS_LOG_v1.0
                </h1>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">
                    Industrial Incident Intelligence Hub
                </p>
            </div>
            <div className="text-right">
                <div className="text-xs text-neon-green animate-pulse">● SYSTEM ONLINE</div>
            </div>
        </header>
    );
};

export default Header;

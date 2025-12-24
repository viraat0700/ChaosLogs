import React from 'react';

const ChaosInput = ({ input, setInput, onSubmit, loading }) => {
    return (
        <div className="bg-chaos-card p-1 rounded-lg border border-gray-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-transparent opacity-50"></div>
            <form onSubmit={onSubmit} className="p-4">
                <label className="block text-xs font-mono text-neon-blue mb-2">
                    {'>>'} INPUT_STREAM
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter unstructured log... (e.g., 'Motor A overheating')"
                    className="w-full bg-black/30 border border-gray-700 rounded p-3 text-white font-mono h-32 focus:outline-none focus:border-neon-blue transition-colors resize-none"
                    autoFocus
                />
                <button
                    disabled={loading}
                    className="mt-3 w-full bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/50 py-2 rounded font-mono text-sm transition-all flex justify-center items-center gap-2"
                >
                    {loading ? 'PROCESSING...' : 'PROCESS_INGEST >'}
                </button>
            </form>
        </div>
    );
};

export default ChaosInput;

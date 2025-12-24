import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PatternChart = ({ stats }) => {
    const hasData = stats?.categories && stats.categories.length > 0;

    return (
        <div className="bg-chaos-card border border-gray-800 rounded-lg p-4" style={{ minHeight: '256px' }}>
            <h3 className="text-xs font-mono text-gray-500 mb-2">
                PATTERN_RECOGNITION
            </h3>
            {hasData ? (
                <div style={{ width: '100%', height: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.categories}>
                            <XAxis
                                dataKey="category"
                                stroke="#4b5563"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#13131f', border: '1px solid #374151' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {stats.categories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2de2e6' : '#2d8ae6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex items-center justify-center h-[200px] text-gray-600 text-sm font-mono">
                    NO_DATA_AVAILABLE
                </div>
            )}
        </div>
    );
};

export default PatternChart;

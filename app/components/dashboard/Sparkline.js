'use client'
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const Sparkline = ({ title, value, percentage, icon: Icon, data, color = "#7C5CFC" }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <div 
    style={{ backgroundColor: `${color}15`}} 
    className="border border-slate-100 rounded-2xl p-6 shadow-sm w-full max-w-[320px] flex flex-col justify-between">
      
      {/* Upper Layout: Icon & Metadata */}
      <div className="flex gap-4 items-start">
        {/* Soft Glassmorphism Icon Container */}
        <div 
          style={{ backgroundColor: `${color}15`, color: color }} 
          className="p-3 rounded-full flex justify-center items-center shadow-inner"
         

        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Labels Block */}
        <div className="flex flex-col text-black">
          <span className="text-xl font-semibold text-slate-500">{title}</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{value}</h2>

          <h4 className="text-3xl text-center text-gray-500 font-bold py-3">{total}</h4>
          
          {/* Trend Indicator */}
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-emerald-500">
            <span>↑ {percentage}%</span>
            <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </div>
      </div>

      {/* Lower Layout: Sparkline Chart with Area Fill & Dots */}
      <div className="w-full h-14 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <defs>
              {/* Linear gradient mapping definition */}
              <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={color} stopOpacity={0.00} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
              // 🔴 Crucial fix: Enables the visual node dot tracking seen in your photo
              dot={{ r: 2, fill: color, stroke: color, strokeWidth: 1 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Sparkline;
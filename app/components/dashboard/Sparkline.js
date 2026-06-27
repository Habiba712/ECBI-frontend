'use client'
import React from 'react';
// Imported Tooltip directly into your charting module configuration
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const Sparkline = ({ title, value, percentage, icon: Icon, data, color }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div 
      style={{ backgroundColor: `${color}15`}} 
      className="border border-slate-100 rounded-2xl p-6 shadow-sm w-full max-w-[320px] flex flex-col justify-between font-sans"
    >
      
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
          <span className=" font-semibold  min-h-[50px] flex items-center">{title}</span>
          {/* <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{value}</h2> */}

          <h4 className="text-3xl text-center 
           font-bold py-3 ">{total}</h4>
          
          {/* Trend Indicator */}
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-emerald-500">
            <span>↑ {percentage}%</span>
            <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </div>
      </div>

      {/* Lower Layout: Sparkline Chart with Area Fill & Clean Tooltip */}
      <div className="w-full h-14">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id={`gradient-${title?.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={color} stopOpacity={0.00} />
              </linearGradient>
            </defs>

            {/* 🌟 PREMIUM INTERACTION LAYER */}
            <Tooltip 
              cursor={false} // Prevents annoying vertical background track bars on minimal charts
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl border border-slate-800 flex flex-col gap-0.5">
                      {/* Uses the main card title prop directly as the label context */}
                      <p className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider">
                        {title}
                      </p>
                      <p className="font-bold text-sm" style={{ color: color }}>
                        {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="value" // Links directly to your flat value key schema
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
              dot={{ r: 2, fill: color, stroke: color, strokeWidth: 1 }}
              activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }} // Expands cleanly with a white border focus ring on hover
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Sparkline;
import React from 'react';
import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AverageRatingSparkline = ({
  title, 
  value, 
  percentage, 
  isRatingCard = false, 
  icon: Icon, 
  data, 
  color 
}) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    console.log('total', data);
    const posWithMaxRating = data.find(pos => pos.value === Math.max(...data.map(pos => pos.value)));
    console.log('posWithMaxRating', posWithMaxRating);
    const posWithMinRating = data.find(pos => pos.value === Math.min(...data.map(pos => pos.value)));
    console.log('posWithMinRating', posWithMinRating);
    const difference = posWithMaxRating?.value - posWithMinRating?.value;
    console.log('difference', difference);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm w-full max-w-[320px] flex flex-col justify-between"style={{ backgroundColor: `${color}15`, color: color }}>
      
      {/* Upper Layout: Icon & Dynamic Metadata */}
      <div className="flex gap-4 items-start">
        {/* Soft Glassmorphism Icon Container - Opaque Tint driven by color prop */}
        <div 
          className="p-3 rounded-full flex justify-center items-center shadow-inner animate-fade-in"
          style={{ backgroundColor: `${color}15` }}
          
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Labels Content Block */}
        <div className="flex flex-col">
          <span className=" font-semibold  text-black min-h-[50px] flex items-center">{title}</span>
          {/* <h2 className="text-3xl font-bold text-slate-900  tracking-tight border">{value}ff</h2> */}
            <h4 className="text-3xl text-center text-black  font-bold py-3  w-full">{title === "Points Redeemed" ? total +" $" : total}</h4>
          
          {/* Contextual Subtitle Sub-rendering flow */}
          <div className="mt-1 text-xs font-medium">
            {isRatingCard ? (
              <span className="text-slate-400">Out of 5.0</span>
            ) : (
              <div className="flex items-center gap-1 text-emerald-500 text-">
                <span>↑ {difference} </span>
                <span className="text-slate-400 font-normal">points diffrence</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lower Layout: Sparkline Chart with Dynamic Scale Domain Mapping */}
      <div className="w-full h-14">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.15} />
                <stop offset="100%" stopColor={color} stopOpacity={0.00} />
              </linearGradient>
            </defs>

            {/* 🔴 Conditional scale clamping based on prop configurations */}
            {isRatingCard && <YAxis domain={[0, 5]} hide={true} />}
            <XAxis dataKey="name" hide={true} />

            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-md border border-slate-800">
                      <p className="font-semibold">{payload[0].payload.name}</p>
                      <p className="text-blue-400 font-medium">
                        {payload[0].value} 
                        {/* {isRatingCard ? '/ 5.0' : 'visits'} */}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
              dot={{ r: 3, fill: color, stroke: color, strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AverageRatingSparkline;
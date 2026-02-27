import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, YAxis } from 'recharts';

const INITIAL_HABITS = [
  { id: 1, name: 'GYM', goal: 25, days: Array(28).fill(false) },
  { id: 2, name: 'WASH CLOTHS', goal: 6, days: Array(28).fill(false) },
  { id: 3, name: 'STUDY', goal: 28, days: Array(28).fill(false) },
  { id: 4, name: 'CALL TO PARENTS', goal: 28, days: Array(28).fill(false) },
  { id: 5, name: 'REVISION', goal: 15, days: Array(28).fill(false) },
  { id: 6, name: 'LEARN NEW SKILL', goal: 20, days: Array(28).fill(false) },
  { id: 7, name: 'EVENING WALK', goal: 23, days: Array(28).fill(false) },
];

// Pre-fill some data to match the image roughly
const PREFILLED_DATA = [
  [true, true, false, true, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, false, true, false],
  Array(28).fill(true),
  Array(28).fill(true),
  [true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, true, false, false],
  [true, false, false, false, false, false, false, true, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, false],
];

INITIAL_HABITS.forEach((h, i) => {
  h.days = [...PREFILLED_DATA[i]];
});

export default function InteractiveDemo() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggleDay = (habitId: number, dayIndex: number) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const newDays = [...h.days];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...h, days: newDays };
      }
      return h;
    }));
  };

  // Calculations
  const totalGoal = habits.reduce((sum, h) => sum + h.goal, 0);
  const totalCompleted = habits.reduce((sum, h) => sum + h.days.filter(Boolean).length, 0);
  const totalLeft = totalGoal - totalCompleted;
  const completionPercent = Math.round((totalCompleted / totalGoal) * 100) || 0;

  const dailyCompletion = Array(28).fill(0).map((_, dayIdx) => {
    return habits.filter(h => h.days[dayIdx]).length;
  });

  const chartData = dailyCompletion.map((val, idx) => ({ day: idx + 1, value: val }));

  const pieData = [
    { name: 'Completed', value: totalCompleted, color: '#f3b07c' },
    { name: 'Left', value: totalLeft > 0 ? totalLeft : 0, color: '#e6e6e6' }
  ];

  // Week calculations
  const weeks = [
    { start: 0, end: 7, color: '#70a4b2', bg: '#e2ecef' },
    { start: 7, end: 14, color: '#c8e6c9', bg: '#f4fbf4' },
    { start: 14, end: 21, color: '#d1c4e9', bg: '#f6f3fc' },
    { start: 21, end: 28, color: '#f8bbd0', bg: '#fdf1f5' },
  ];

  const weeklyStats = weeks.map(w => {
    const days = dailyCompletion.slice(w.start, w.end);
    const completed = days.reduce((a, b) => a + b, 0);
    const goal = habits.length * 7;
    return { completed, goal, left: goal - completed, percent: Math.round((completed / goal) * 100) };
  });

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-black p-2 font-sans text-xs shadow-2xl overflow-x-auto">
      <div className="min-w-[1000px] flex flex-col gap-2">
        
        {/* ROW 1 */}
        <div className="flex gap-2 h-40">
          <div className="w-64 flex flex-col gap-2">
            <div className="border border-black flex flex-col text-center bg-[#fcf3d9]">
              <div className="text-xl font-bold py-2 border-b border-black">HABIT TRACKER</div>
              <div className="py-1 font-bold bg-white">-February-</div>
            </div>
            <div className="border border-black flex flex-col text-center bg-white flex-1">
              <div className="py-1 font-bold bg-[#fcf3d9] border-b border-black">CALENDAR SETTINGS</div>
              <div className="flex border-b border-black">
                <div className="w-1/2 py-1 font-bold border-r border-black">YEAR</div>
                <div className="w-1/2 py-1 font-bold">2026</div>
              </div>
              <div className="flex flex-1 items-center">
                <div className="w-1/2 py-1 font-bold border-r border-black h-full flex items-center justify-center">MONTH</div>
                <div className="w-1/2 py-1 px-2 h-full flex items-center justify-center">
                  <div className="bg-gray-200 w-full rounded px-2 py-0.5 text-left flex justify-between items-center">
                    <span>February</span>
                    <span className="text-[8px]">▼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 border border-black bg-white relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f3b07c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f3b07c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis domain={[0, 12]} tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="value" stroke="#f3b07c" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="w-48 border border-black bg-white flex flex-col items-center justify-center relative">
            <div className="absolute top-2 flex gap-4 text-[8px] font-bold text-gray-500">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f3b07c]"></div> COMPLETED</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#e6e6e6]"></div> LEFT</div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={pieData} innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex gap-2 h-32">
           <div className="w-64 flex border border-black">
              <div className="w-1/2 flex flex-col border-r border-black">
                <div className="h-1/2 bg-[#fcf3d9] border-b border-black flex items-center justify-center font-bold text-center px-2">COMPLETION %</div>
                <div className="h-1/2 bg-white flex items-center justify-center font-bold text-3xl">{completionPercent}%</div>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 bg-[#fcf3d9] border-b border-black flex items-center justify-center font-bold">OVERVIEW</div>
                <div className="h-1/2 bg-white flex flex-col text-[9px]">
                  <div className="flex border-b border-black flex-1"><div className="w-full text-center border-r border-black flex items-center justify-center font-bold">COMPLETED</div></div>
                  <div className="flex border-b border-black flex-1"><div className="w-full text-center border-r border-black flex items-center justify-center font-bold">GOAL</div></div>
                  <div className="flex border-b border-black flex-1"><div className="w-full text-center border-r border-black flex items-center justify-center font-bold">LEFT</div></div>
                  <div className="flex flex-1"><div className="w-full text-center border-r border-black flex items-center justify-center font-bold">WEEKLY</div></div>
                </div>
              </div>
           </div>

           <div className="flex-1 border border-black bg-white flex">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex-1 border-r border-black last:border-r-0 flex flex-col">
                  <div className="flex-1 flex items-end justify-around px-1 pb-1 pt-2 gap-1 border-b border-black">
                    {dailyCompletion.slice(week.start, week.end).map((val, dIdx) => (
                      <div key={dIdx} className="w-full flex flex-col items-center justify-end h-full">
                        <div className="w-full" style={{ height: `${(val / 12) * 100}%`, backgroundColor: week.color }}></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-16 flex flex-col text-[9px] text-center">
                    <div className="flex border-b border-black flex-1">
                      {dailyCompletion.slice(week.start, week.end).map((val, dIdx) => (
                        <div key={dIdx} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center">{val}</div>
                      ))}
                    </div>
                    <div className="flex border-b border-black flex-1">
                      {Array(7).fill(habits.length).map((val, dIdx) => (
                        <div key={dIdx} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center">{val}</div>
                      ))}
                    </div>
                    <div className="flex border-b border-black flex-1">
                      {dailyCompletion.slice(week.start, week.end).map((val, dIdx) => (
                        <div key={dIdx} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center">{habits.length - val}</div>
                      ))}
                    </div>
                    <div className="flex flex-1">
                      <div className="flex-1 flex items-center justify-center font-bold">{weeklyStats[wIdx].completed}/{weeklyStats[wIdx].goal}</div>
                    </div>
                    <div className="flex flex-1 border-t border-black">
                      <div className="flex-1 flex items-center justify-center">{weeklyStats[wIdx].percent}%</div>
                    </div>
                    <div className="h-2 w-full" style={{ backgroundColor: week.bg }}></div>
                  </div>
                </div>
              ))}
              <div className="w-12 flex flex-col">
                 <div className="flex-1 border-b border-black"></div>
                 <div className="h-16 flex flex-col text-[9px] text-center">
                    <div className="flex border-b border-black flex-1"></div>
                    <div className="flex border-b border-black flex-1"></div>
                    <div className="flex border-b border-black flex-1"></div>
                    <div className="flex flex-1 items-center justify-center">0/0</div>
                    <div className="flex flex-1 border-t border-black"></div>
                    <div className="h-2 w-full bg-gray-200"></div>
                 </div>
              </div>
           </div>

           <div className="w-48 border border-black bg-white flex flex-col">
              <div className="bg-[#fcf3d9] border-b border-black py-2 text-center font-bold">TOP HABITS</div>
              <div className="flex-1 flex flex-col p-2 gap-1 justify-center">
                <div className="flex text-[10px] font-bold"><span className="w-6">1</span> <span className="text-center flex-1">STUDY</span></div>
                <div className="flex text-[10px] font-bold"><span className="w-6">2</span> <span className="text-center flex-1">CALL TO PARENTS</span></div>
                <div className="flex text-[10px] font-bold"><span className="w-6">3</span> <span className="text-center flex-1">TRY TO COOK</span></div>
                <div className="flex text-[10px] font-bold"><span className="w-6">4</span> <span className="text-center flex-1">REVISION</span></div>
                <div className="flex text-[10px] font-bold"><span className="w-6">5</span> <span className="text-center flex-1">WASH CLOTHS</span></div>
              </div>
           </div>
        </div>

        {/* ROW 3 */}
        <div className="flex gap-2">
          <div className="w-64 flex flex-col border border-black bg-white">
            <div className="h-16 bg-[#fcf3d9] border-b border-black flex items-center justify-center font-bold text-lg">DAILY HABITS</div>
            {habits.map(h => (
              <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex items-center justify-end px-2 font-bold text-[10px]">
                {h.name}
              </div>
            ))}
          </div>

          <div className="w-10 flex flex-col border border-black bg-white">
            <div className="h-16 bg-[#fcf3d9] border-b border-black flex items-center justify-center font-bold text-[10px]">GOAL</div>
            {habits.map(h => (
              <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex items-center justify-center font-bold text-[10px]">
                {h.goal}
              </div>
            ))}
          </div>

          <div className="flex-1 flex border border-black bg-white">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex-1 flex flex-col border-r border-black">
                <div className="h-8 border-b border-black flex items-center justify-center font-bold" style={{ backgroundColor: week.bg }}>WEEK {wIdx + 1}</div>
                <div className="h-4 border-b border-black flex">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <div key={d} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center text-[8px] font-bold">{d}</div>
                  ))}
                </div>
                <div className="h-4 border-b border-black flex">
                  {Array(7).fill(0).map((_, i) => (
                    <div key={i} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center text-[9px] font-bold">{week.start + i + 1}</div>
                  ))}
                </div>
                {habits.map(h => (
                  <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex">
                    {Array(7).fill(0).map((_, i) => {
                      const dayIdx = week.start + i;
                      const isChecked = h.days[dayIdx];
                      return (
                        <div key={i} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={() => toggleDay(h.id, dayIdx)}>
                          <div className={`w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center ${isChecked ? 'bg-gray-200' : 'bg-white'}`}>
                            {isChecked && <span className="text-[8px] text-gray-600 font-bold">✓</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ))}
            <div className="w-16 flex flex-col">
                <div className="h-8 border-b border-black flex items-center justify-center font-bold bg-[#bbdefb] opacity-50">WEEK 5</div>
                <div className="h-4 border-b border-black flex">
                  <div className="flex-1 border-r border-black flex items-center justify-center text-[8px] font-bold">Sun</div>
                  <div className="flex-1 border-r border-black flex items-center justify-center text-[8px] font-bold">Mon</div>
                  <div className="flex-1 flex items-center justify-center text-[8px] font-bold">Tue</div>
                </div>
                <div className="h-4 border-b border-black flex">
                  <div className="flex-1 border-r border-black flex items-center justify-center text-[9px] font-bold">29</div>
                  <div className="flex-1 border-r border-black flex items-center justify-center text-[9px] font-bold">30</div>
                  <div className="flex-1 flex items-center justify-center text-[9px] font-bold">31</div>
                </div>
                {habits.map(h => (
                  <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex">
                    <div className="flex-1 border-r border-black flex items-center justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm"></div></div>
                    <div className="flex-1 border-r border-black flex items-center justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm"></div></div>
                    <div className="flex-1 flex items-center justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm"></div></div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-48 flex border border-black bg-white">
            <div className="w-6 flex flex-col border-r border-black">
              <div className="h-16 bg-[#fcf3d9] border-b border-black flex items-center justify-center">
                <span className="transform -rotate-90 text-[8px] font-bold whitespace-nowrap">COMPLETED</span>
              </div>
              {habits.map(h => {
                const completed = h.days.filter(Boolean).length;
                return (
                  <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex items-center justify-center text-[10px] font-bold">
                    {completed}
                  </div>
                )
              })}
            </div>
            <div className="w-6 flex flex-col border-r border-black">
              <div className="h-16 bg-[#fcf3d9] border-b border-black flex items-center justify-center">
                <span className="transform -rotate-90 text-[8px] font-bold whitespace-nowrap">LEFT</span>
              </div>
              {habits.map(h => {
                const completed = h.days.filter(Boolean).length;
                const left = h.goal - completed;
                return (
                  <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex items-center justify-center text-[10px] font-bold">
                    {left > 0 ? left : 0}
                  </div>
                )
              })}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-16 bg-[#fcf3d9] border-b border-black flex items-center justify-center font-bold">
                PROGRESS
              </div>
              {habits.map(h => {
                const completed = h.days.filter(Boolean).length;
                const percent = Math.min(100, Math.round((completed / h.goal) * 100)) || 0;
                return (
                  <div key={h.id} className="h-6 border-b border-black last:border-b-0 flex items-center px-1 gap-1">
                    <span className="text-[8px] font-bold w-6 text-right">{percent}%</span>
                    <div className="flex-1 h-3 bg-gray-100">
                      <div className="h-full bg-[#f3b07c]" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

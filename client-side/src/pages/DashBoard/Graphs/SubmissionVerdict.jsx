import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

export default function VerdictGraph({ verdictdata }) {
  const verdictData = [
    { name: 'Challenged', value: verdictdata.CHALLENGED, fill: '#845EC2' },
    { name: 'Compilation Error', value: verdictdata.COMPILATION_ERROR, fill: '#FF6F91' },
    { name: 'Crashed', value: verdictdata.CRASHED, fill: '#FFC75F' },
    { name: 'Failed', value: verdictdata.FAILED, fill: '#D65DB1' },
    { name: 'Idleness Limit Exceeded [ILE]', value: verdictdata.IDLENESS_LIMIT_EXCEEDED, fill: '#FF9671' },
    { name: 'Input Preparation Crashed', value: verdictdata.INPUT_PREPARATION_CRASHED, fill: '#FFC75F' },
    { name: 'Memory Limit Exceeded [MLE]', value: verdictdata.MEMORY_LIMIT_EXCEEDED, fill: '#F9F871' },
    { name: 'Accepted [AC]', value: verdictdata.OK, fill: '#00C9A7' },
    { name: 'Partial', value: verdictdata.PARTIAL, fill: '#008E9B' },
    { name: 'Presentation Error', value: verdictdata.PRESENTATION_ERROR, fill: '#008F7A' },
    { name: 'Rejected', value: verdictdata.REJECTED, fill: '#B39CD0' },
    { name: 'Runtime Error [RE]', value: verdictdata.RUNTIME_ERROR, fill: '#6A0572' },
    { name: 'Security Violated', value: verdictdata.SECURITY_VIOLATED, fill: '#FF5E78' },
    { name: 'Skipped', value: verdictdata.SKIPPED, fill: '#6A1B4D' },
    { name: 'Testing', value: verdictdata.TESTING, fill: '#FFC75F' },
    { name: 'Time Limit Exceeded [TLE]', value: verdictdata.TIME_LIMIT_EXCEEDED, fill: '#FF9671' },
    { name: 'Wrong Answer [WA]', value: verdictdata.WRONG_ANSWER, fill: '#FF4B5C' },
  ];

  const totalValue = verdictData.reduce((sum, verdict) => sum + (verdict.value || 0), 0);

  return (
    <div className="mb-12 p-6 rounded-xl">
      {/* Title */}
      <h4 className="text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-[#05CBDC] mb-8">
        Submission Verdicts
      </h4>

      {/* Container */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Legend */}
        <div className="bg-[#1E2230] p-4 rounded-lg backdrop-blur-md">
          <h5 className="text-lg font-semibold text-[#05CBDC] text-center mb-4">Verdict Summary</h5>
          {verdictData.map(
            (verdict, index) =>
              verdict.value > 0 && (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 transition-transform transform hover:scale-105 hover:text-white group"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-[rgba(0,255,255,0.6)]"
                      style={{ backgroundColor: verdict.fill }}
                    ></span>
                    <span className="text-sm text-white">{verdict.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#05CBDC]">
                    {verdict.value}
                  </span>
                </div>
              )
          )}
        </div>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={verdictData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              // label={({ name, value }) => `${""}: ${(value / totalValue * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {verdictData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${((value / totalValue) * 100).toFixed(1)}%`}
              contentStyle={{
                backgroundColor: '#1E40AF', // Bright blue background (Tailwind `blue-800`)
                borderRadius: '8px',
                color: '#E0F2FE', // Off-white text (Tailwind `cyan-100`)
                border: '1px solid #60A5FA', // Soft blue border (Tailwind `blue-400`)
                padding: '8px', // Add some padding for a cleaner look
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
              }}
              cursor={{ fill: 'rgba(96, 165, 250, 0.15)' }} // Light blue hover effect (Tailwind `blue-400`)
            />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

export default function ContestRankGraph({ ratingdata }) {
  const RatingChangeData = ratingdata.map((elt) => ({
    name: elt.contestName,
    uv: Math.max((10001 - elt.rank) / 10000, 0),
    amt: elt.newRating,
  }));

  return (
    <div className="w-full h-[400px] mt-4 mb-20 rounded-2xl p-6 lg:h-[400px] md:h-[300px] sm:h-[250px] xs:h-[200px] xxs:h-[150px]">
      <h4 className="text-3xl md:text-5xl font-bold text-[#05CBDC] text-center mb-6">
        Contest Performance Index
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={RatingChangeData}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
          <XAxis
            dataKey="name"
            tick={{
              fill: '#05CBDC',
              fontWeight: 'bold',
            }}
          />
          <YAxis
            tick={{
              fill: '#EA7BB0',
              fontWeight: 'bold',
            }}
            domain={[0, 1]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(32, 0, 66, 0.9)',
              borderRadius: '8px',
              color: 'white',
              border: '1px solid #05CBDC',
            }}
            labelStyle={{
              color: '#EA7BB0',
              fontWeight: 'bold',
            }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ color: '#05CBDC', fontWeight: 'bold' }}
          />
          <Line
            name="Performance Index (PI for first rank is 1)"
            type="monotone"
            dataKey="uv"
            stroke="#05CBDC" // Cyan
            strokeWidth={3}
            dot={{
              stroke: '#EA7BB0',
              strokeWidth: 2,
              fill: 'white',
            }} // Pink dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

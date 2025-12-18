import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Data {
  day: string;
  steps: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ minWidth: "120px" }}>
        <div className="tooltip-value" style={{ color: "#334155", fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>
          {label}
        </div>
        <div className="tooltip-value" style={{ color: "#10b981", fontWeight: 600, fontSize: "14px" }}>
          {payload[0].value} Steps
        </div>
      </div>
    );
  }
  return null;
};

const WeeklyLineChart = ({ data }: { data: Data[] }) => {
  const formattedData = data.map(item => ({
    ...item,
    formattedSteps: `+${(item.steps / 1000).toFixed(1)}k Steps`
  }));

  return (
    <div className="glass-card chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Weekly Progress</h3>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 13 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickCount={5}
            domain={[0, 'auto']}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          <Line
            type="monotone"
            dataKey="steps"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5, fill: "#fff", stroke: "#10b981", strokeWidth: 3 }}
            activeDot={{ r: 7, fill: "#fff", stroke: "#059669", strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyLineChart;

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


interface Data {
  name: string;
  value: number;
}

const CustomTooltip = ({
  active,
  payload,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="tooltip-row">
          <span className="tooltip-indicator"></span>
          {payload[0].payload.name}
        </div>
        <div className="tooltip-value">
          {payload[0].value}{" "}
          {payload[0].payload.name === "Water"
            ? "L"
            : payload[0].payload.name === "Sleep"
              ? "hrs"
              : ""}
        </div>
      </div>
    );
  }

  return null;
};

const SummaryBarChart = ({ data }: { data: Data[] }) => {
  return (
    <div className="chart-card glass-card">
      <div className="chart-header">
        <h3 className="chart-title">Today's Summary</h3>
        <div className="chart-controls">
          <button className="chart-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            radius={[12, 12, 0, 0]}
            fill="#93c5fd"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryBarChart;

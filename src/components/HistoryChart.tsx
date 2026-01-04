import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface HistoryItem {
    _id: string;
    date: string;
    steps: number;
    water: number;
    sleep: number;
    stress: number;
    mood: number;
}

interface Props {
    data: HistoryItem[];
    dataKey: keyof HistoryItem;
    color: string;
    unit?: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{
                background: "rgba(255, 255, 255, 0.9)",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0"
            }}>
                <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "4px" }}>
                    {new Date(label).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
                <div style={{ color: payload[0].stroke, fontWeight: "bold", fontSize: "16px" }}>
                    {payload[0].value} {unit}
                </div>
            </div>
        );
    }
    return null;
};

const HistoryChart = ({ data, dataKey, color, unit = "" }: Props) => {
    // Sort data by date ascending for the chart
    const chartData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="glass-card chart-card" style={{ marginBottom: "2rem", padding: "1.5rem", width: "100%" }}>
            <div className="chart-header" style={{ marginBottom: "1rem" }}>
                <h3 className="chart-title" style={{ textTransform: "capitalize" }}>
                    {dataKey} Trends
                </h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                        minTickGap={30}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickCount={5}
                        domain={[0, 'auto']}
                    />
                    <Tooltip
                        content={<CustomTooltip unit={unit} />}
                        cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#color${dataKey})`}
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistoryChart;

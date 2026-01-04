import "../App.css";

interface Props {
    title: string;
    value: number;
    max: number;
    unit?: string;
    color: string;
    icon: string; // Passed from Dashboard
}

const StatCard = ({ title, value, max, unit, color, icon }: Props) => {
    const percent = Math.min((value / max) * 100, 100);

    return (
        <div className="glass-card stat-card-linear" style={{ borderLeft: `5px solid ${color}` }}>
            <div className="linear-header">
                <div className="icon-box" style={{ background: `${color}20`, color: color }}>
                    {icon}
                </div>
                <div className="linear-title">{title}</div>
            </div>

            <div className="linear-value-row">
                <span className="linear-value" style={{ color: color }}>
                    {value.toLocaleString()}
                </span>
                <span className="linear-unit">{unit}</span>
            </div>

            <div className="linear-progress-bg">
                <div
                    className="linear-progress-fill"
                    style={{
                        width: `${percent}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}60`
                    }}
                ></div>
            </div>

            <div className="linear-footer">
                <span>Goal: {max.toLocaleString()} {unit}</span>
                <span style={{ fontWeight: 600 }}>{Math.round(percent)}%</span>
            </div>
        </div>
    );
};

export default StatCard;

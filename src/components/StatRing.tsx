interface Props {
  title: string;
  value: number;
  subLabel?: string;
  max: number;
  unit?: string;
  color: string;
}

const getStressEmoji = (percent: number) => {
  if (percent <= 30) return "😌";
  if (percent <= 60) return "😐";
  if (percent <= 80) return "😣";
  return "😫";
};

const StatRing = ({ title, value, subLabel, max, unit, color }: Props) => {
  const percent = Math.round((value / max) * 100);
  const r = 62;
  const c = 2 * Math.PI * r;

  const emoji = title.toLowerCase() === "stress"
    ? getStressEmoji(percent)
    : null;

  return (
    <div className="glass-card ring-card">
      <div className="ring-header">
        <div className="ring-title">{title}</div>
        {emoji && <div className="ring-emoji">{emoji}</div>}
      </div>

      <svg className="ring-svg" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} className="ring-track-outer" />
        <circle cx="80" cy="80" r={r} className="ring-track-inner" />
        <circle
          cx="80"
          cy="80"
          r={r}
          className="ring-progress"
          style={{
            stroke: color,
            strokeDasharray: c,
            strokeDashoffset: c - (percent / 100) * c
          }}
        />
        <text x="50%" y="50%" className="ring-percent">{percent}%</text>
      </svg>

      <div className="ring-main-value">
        {value} {unit}
      </div>
      {subLabel && <div className="ring-sub-value">{subLabel}</div>}
    </div>
  );
};

export default StatRing;

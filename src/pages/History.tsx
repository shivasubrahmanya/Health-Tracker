import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import { API_BASE_URL } from "../config";
import "../App.css";

interface HistoryItem {
    _id: string;
    date: string;
    steps: number;
    water: number;
    sleep: number;
    stress: number;
    mood: number;
    meals: string;
    exercise: string;
    notes: string;
}

const moodMap: Record<number, string> = {
    3: "😊 Happy",
    2: "😐 Neutral",
    1: "😔 Sad"
};

type MetricType = "steps" | "water" | "sleep" | "stress" | "mood";

const History = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMetric, setSelectedMetric] = useState<MetricType>("steps");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await fetch(`${API_BASE_URL}/api/v1/daily-input/all-history`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                }
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const getMetricColor = (metric: MetricType) => {
        switch (metric) {
            case "steps": return "#10b981";
            case "water": return "#3b82f6";
            case "sleep": return "#8b5cf6";
            case "stress": return "#ef4444";
            case "mood": return "#f59e0b";
            default: return "#10b981";
        }
    };

    const getMetricUnit = (metric: MetricType) => {
        switch (metric) {
            case "steps": return "steps";
            case "water": return "L";
            case "sleep": return "hrs";
            case "stress": return "/10";
            case "mood": return "/3";
            default: return "";
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <h2 style={{ textAlign: "center", color: "white" }}>Loading history...</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Report History 📜</h1>
            <p className="dashboard-subtitle">Your entire health journey at a glance</p>

            {history.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                    <p style={{ color: "#ccc", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                        No reports found. Start tracking or generate data to test!
                    </p>
                    <button
                        onClick={async () => {
                            const token = localStorage.getItem("token");
                            if (!token) return;
                            setLoading(true);
                            try {
                                await fetch(`${API_BASE_URL}/api/v1/daily-input/seed`, {
                                    method: "POST",
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                window.location.reload();
                            } catch (err) {
                                console.error(err);
                                setLoading(false);
                            }
                        }}
                        style={{
                            padding: "1rem 2rem",
                            fontSize: "1rem",
                            background: "#10b981",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        Generate Sample Data
                    </button>
                </div>
            ) : (
                <>
                    {/* Controls for Chart */}
                    <div className="metric-selector">
                        {(["steps", "water", "sleep", "stress", "mood"] as MetricType[]).map((metric) => (
                            <button
                                key={metric}
                                className={`metric-btn ${selectedMetric === metric ? "active" : ""}`}
                                onClick={() => setSelectedMetric(metric)}
                                style={{
                                    backgroundColor: selectedMetric === metric ? getMetricColor(metric) : "rgba(255,255,255,0.1)",
                                    borderColor: selectedMetric === metric ? "transparent" : "rgba(255,255,255,0.2)"
                                }}
                            >
                                {metric.charAt(0).toUpperCase() + metric.slice(1)}
                            </button>
                        ))}
                    </div>

                    <HistoryChart
                        data={history}
                        dataKey={selectedMetric}
                        color={getMetricColor(selectedMetric)}
                        unit={getMetricUnit(selectedMetric)}
                    />

                    <div className="history-grid">
                        {history.map((item) => (
                            <div key={item._id} className="glass-card history-card">
                                <div className="history-header">
                                    <h3>{new Date(item.date).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</h3>
                                    <span className="mood-badge">{moodMap[item.mood] || "Unknown"}</span>
                                </div>

                                <div className="history-details-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Steps</span>
                                        <span className="detail-value">{item.steps?.toLocaleString() || 0}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Water</span>
                                        <span className="detail-value">{item.water || 0} L</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Sleep</span>
                                        <span className="detail-value">{item.sleep || 0} hrs</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Stress</span>
                                        <span className="detail-value">{item.stress || 0}/10</span>
                                    </div>
                                </div>

                                {(item.meals || item.exercise || item.notes) && (
                                    <div className="history-extra">
                                        {item.meals && (
                                            <div className="extra-section">
                                                <strong>Meals:</strong> <br /> {item.meals}
                                            </div>
                                        )}
                                        {item.exercise && (
                                            <div className="extra-section">
                                                <strong>Exercise:</strong> <br /> {item.exercise}
                                            </div>
                                        )}
                                        {item.notes && (
                                            <div className="extra-section">
                                                <strong>Notes:</strong> <br /> {item.notes}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default History;

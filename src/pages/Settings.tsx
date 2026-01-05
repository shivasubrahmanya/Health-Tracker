import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import "../App.css";

interface SettingsState {
    goals: {
        steps: number;
        water: number;
        sleep: number;
    };
    preferences: {
        theme: string;
        notifications: boolean;
    };
}

export default function Settings() {
    const [loading, setLoading] = useState(true);
    const [savingGoals, setSavingGoals] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [settings, setSettings] = useState<SettingsState>({
        goals: { steps: 10000, water: 3, sleep: 8 },
        preferences: { theme: "dark", notifications: true }
    });

    const [originalGoals, setOriginalGoals] = useState<SettingsState["goals"] | null>(null);

    // Load existing profile settings
    useEffect(() => {
        const loadSettings = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/profile/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    const loadedGoals = {
                        steps: data.goals?.steps || 10000,
                        water: data.goals?.water || 3,
                        sleep: data.goals?.sleep || 8
                    };

                    setSettings({
                        goals: loadedGoals,
                        preferences: {
                            theme: data.preferences?.theme || "dark",
                            notifications: data.preferences?.notifications ?? true
                        }
                    });
                    setOriginalGoals(loadedGoals);
                }
            } catch (err) {
                console.error("Failed to load settings", err);
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    const persistSettings = async (newSettings: SettingsState, silent = false) => {
        const token = localStorage.getItem("token");
        if (!silent) setSavingGoals(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/profile/setup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newSettings)
            });

            if (!res.ok) throw new Error("Failed to save");

            if (!silent) {
                alert("Goals Updated Successfully! 🎯");
                setOriginalGoals(newSettings.goals);
                setIsEditing(false);
            }

        } catch (err) {
            console.error(err);
            if (!silent) alert("Error saving settings.");
        } finally {
            if (!silent) setSavingGoals(false);
        }
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            goals: { ...prev.goals, [name]: Number(value) }
        }));
    };

    const handleSaveGoals = () => {
        persistSettings(settings, false);
    };

    // Check if goals have changed
    const isGoalsDirty = originalGoals && JSON.stringify(settings.goals) !== JSON.stringify(originalGoals);

    // Auto-save wrapper for preferences
    const updatePreference = (key: keyof SettingsState["preferences"], value: any) => {
        setSettings(prev => {
            const updated = {
                ...prev,
                preferences: { ...prev.preferences, [key]: value }
            };
            persistSettings(updated, true);
            return updated;
        });
    };


    const handleExport = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/user/export`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Failed to export data");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `health-tracker-data-${new Date().toISOString().split("T")[0]}.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error("Export failed:", err);
            alert("Failed to export data. Please try again.");
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/user/delete`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Failed to delete account");

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/"; // Redirect to home/login
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete account. Please try again.");
        }
    };

    if (loading) return <div className="loading-screen">Loading Settings...</div>;

    return (
        <div className="settings-container fade-in">

            <header className="settings-header">
                <h1 className="settings-title">⚙️ Preference Center</h1>
                <p className="settings-subtitle">Customize your daily targets and application experience.</p>
            </header>

            <div className="settings-grid-layout">

                {/* LEFT COL: GOALS */}
                <section className="premium-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header-row" style={{ justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div className="card-icon-wrapper">
                                <span>🎯</span>
                            </div>
                            <div>
                                <h2 className="card-title-text">Daily Targets</h2>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Set your personal fitness goals</p>
                            </div>
                        </div>
                        {/* EDIT BUTTON */}
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #e2e8f0',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    color: '#64748b',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: '0.2s'
                                }}
                            >
                                ✏️ Edit
                            </button>
                        )}
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Daily Steps 🏃</label>
                        <input
                            className="modern-input"
                            type="number"
                            name="steps"
                            value={settings.goals.steps}
                            onChange={handleGoalChange}
                            disabled={!isEditing}
                            style={{ opacity: isEditing ? 1 : 0.7, cursor: isEditing ? 'text' : 'not-allowed' }}
                        />
                        <span className="input-hint">Recommended: 10,000 steps</span>
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Daily Water Intake (L) 💧</label>
                        <input
                            className="modern-input"
                            type="number"
                            name="water"
                            step="0.5"
                            value={settings.goals.water}
                            onChange={handleGoalChange}
                            disabled={!isEditing}
                            style={{ opacity: isEditing ? 1 : 0.7, cursor: isEditing ? 'text' : 'not-allowed' }}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Sleep Target (Hours) 😴</label>
                        <input
                            className="modern-input"
                            type="number"
                            name="sleep"
                            step="0.5"
                            value={settings.goals.sleep}
                            onChange={handleGoalChange}
                            disabled={!isEditing}
                            style={{ opacity: isEditing ? 1 : 0.7, cursor: isEditing ? 'text' : 'not-allowed' }}
                        />
                    </div>

                    {/* Buttons: Show Update or Cancel depending on state */}
                    {isEditing && (
                        <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', gap: '12px' }}>
                            <button
                                className="save-btn-primary"
                                style={{ flex: 1, borderRadius: '12px', opacity: isGoalsDirty ? 1 : 0.5, cursor: isGoalsDirty ? 'pointer' : 'not-allowed' }}
                                onClick={handleSaveGoals}
                                disabled={savingGoals || !isGoalsDirty}
                            >
                                {savingGoals ? "Saving..." : "Update Daily Goals"}
                            </button>

                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    if (originalGoals) {
                                        setSettings(prev => ({ ...prev, goals: originalGoals })); // Revert
                                    }
                                }}
                                style={{
                                    padding: '0 20px',
                                    background: 'transparent',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '12px',
                                    color: '#64748b',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </section>

                {/* RIGHT COL: PREFERENCES & DATA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* PREFERENCES */}
                    <section className="premium-card">
                        <div className="card-header-row">
                            <div className="card-icon-wrapper" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                                <span>🎨</span>
                            </div>
                            <div>
                                <h2 className="card-title-text">App Experience</h2>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Changes save automatically</p>
                            </div>
                        </div>

                        <div className="toggle-row">
                            <div>
                                <span className="toggle-label-main">Dark Mode 🌙</span>
                                <span className="toggle-label-sub">Easier on the eyes at night</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={settings.preferences.theme === 'dark'}
                                    onChange={() => updatePreference('theme', settings.preferences.theme === 'dark' ? 'light' : 'dark')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle-row">
                            <div>
                                <span className="toggle-label-main">Daily Reminders 🔔</span>
                                <span className="toggle-label-sub">Get notified to log meals</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={settings.preferences.notifications}
                                    onChange={() => updatePreference('notifications', !settings.preferences.notifications)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </section>

                    {/* DANGER ZONE */}
                    <section className="premium-card danger-zone">
                        <div className="card-header-row" style={{ marginBottom: '20px', borderBottom: 'none' }}>
                            <div className="card-icon-wrapper" style={{ background: '#fef2f2', color: '#ef4444' }}>
                                <span>⚠️</span>
                            </div>
                            <h2 className="card-title-text danger-title">Data Control</h2>
                        </div>
                        <p style={{ color: '#7f1d1d', marginBottom: '24px', lineHeight: '1.5' }}>
                            Need a copy of your health data? You can export it as a CSV file or delete your account permanently.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="danger-btn-outline" onClick={handleExport}>Export Data</button>
                            <button className="danger-btn-outline" onClick={handleDeleteAccount}>Delete Account</button>
                            <button
                                className="danger-btn-outline"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    window.location.href = "/login";
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </section>

                </div>
            </div>

        </div>
    );

}


// Use environment variable if available (Production), otherwise fallback to localhost (Development)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

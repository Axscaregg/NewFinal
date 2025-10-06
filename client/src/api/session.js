// src/api/sessionHelpers.js
import api, { setAccessToken } from "./axios";
export function setAccessTokenAfterRefresh(newToken) {
}
export async function handleAuthExpired() {
    try {
        await api.post("/api/logout");
    } catch {
    }
    setAccessToken(null);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged")); // ให้ Navbar อัปเดตทันที
}
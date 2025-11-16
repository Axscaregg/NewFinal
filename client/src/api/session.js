import api, { setAccessToken } from "./axios";
export function setAccessTokenAfterRefresh(newToken) {
    localStorage.setItem("accessToken",newToken)
    window.dispatchEvent(new Event("authChange"))
}
export async function handleAuthExpired() {
    try {
        await api.post("/api/logout");
    } catch {
    }
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
}
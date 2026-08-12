//#region node_modules/.nitro/vite/services/ssr/assets/authService-Bom7X-RI.js
var API_URL = "http://localhost:5000/api";
var authService = {
	async login(email, password) {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		});
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Login failed");
		if (typeof window !== "undefined") {
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
		}
		return data;
	},
	logout() {
		if (typeof window === "undefined") return;
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	},
	getToken() {
		if (typeof window === "undefined") return null;
		return localStorage.getItem("token");
	},
	getUser() {
		if (typeof window === "undefined") return null;
		const user = localStorage.getItem("user");
		if (!user) return null;
		try {
			return JSON.parse(user);
		} catch {
			return null;
		}
	},
	isLoggedIn() {
		if (typeof window === "undefined") return false;
		return !!localStorage.getItem("token");
	}
};
//#endregion
export { authService as t };

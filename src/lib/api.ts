export const API = {
  get token() {
    return localStorage.getItem("token") || "";
  },
  set token(value: string) {
    localStorage.setItem("token", value);
  },
  async request(path: string, options: RequestInit = {}) {
    const headers: any = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (API.token) headers["Authorization"] = `Bearer ${API.token}`;
    const res = await fetch(`/api${path}`, { ...options, headers });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  },
  auth: {
    signup(data: { accountName: string; accountNumber: string; ifsc: string; password: string }) {
      return API.request("/auth/signup", { method: "POST", body: JSON.stringify(data) });
    },
    login(data: { accountNumber: string; password: string }) {
      return API.request("/auth/login", { method: "POST", body: JSON.stringify(data) });
    },
  },
  budgets: {
    create(data: any) {
      return API.request("/budgets", { method: "POST", body: JSON.stringify(data) });
    },
    update(budgetId: string, data: any) {
      return API.request(`/budgets/${budgetId}`, { method: "PATCH", body: JSON.stringify(data) });
    },
  },
};


